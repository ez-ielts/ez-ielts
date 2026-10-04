import { getAuthToken } from '../features/auth/authToken'

// The one place that talks to the backend (design/backend-contract.md). Services call `apiRequest` and map `ApiError.kind`
// to their own states: 'unauthorized' (401), 'rate_limit' (429, with `retryAfter` seconds when sent) and 'network' (anything else).
export class ApiError extends Error {
  constructor(kind, message, { status, retryAfter } = {}) {
    super(message)
    this.kind = kind
    this.status = status
    this.retryAfter = retryAfter
  }
}

const DEFAULT_TIMEOUT_MS = 30000

// `getToken` supplies the bearer token; `fetchImpl` and `timeoutMs` exist so the client can be checked against a stub server.
export function createApiClient({ baseUrl, getToken = getAuthToken, fetchImpl = (...args) => fetch(...args), timeoutMs = DEFAULT_TIMEOUT_MS } = {}) {
  const root = baseUrl?.replace(/\/+$/, '')

  async function request(path, { method = 'GET', body, idempotencyKey } = {}) {
    const headers = { Accept: 'application/json' }
    const token = await getToken()
    if (token) headers.Authorization = `Bearer ${token}`
    if (body !== undefined) headers['Content-Type'] = 'application/json'
    if (idempotencyKey) headers['Idempotency-Key'] = idempotencyKey

    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeoutMs)
    let response
    try {
      response = await fetchImpl(`${root}${path}`, { method, headers, body: body === undefined ? undefined : JSON.stringify(body), signal: controller.signal })
    } catch {
      throw new ApiError('network', 'Network request failed')
    } finally {
      clearTimeout(timer)
    }

    if (response.status === 401) throw new ApiError('unauthorized', 'Not signed in', { status: 401 })
    if (response.status === 429) {
      const retryAfter = Number(response.headers.get('Retry-After'))
      throw new ApiError('rate_limit', 'Rate limited', { status: 429, retryAfter: Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter : undefined })
    }
    if (!response.ok) throw new ApiError('network', `Request failed with ${response.status}`, { status: response.status })
    if (response.status === 204) return null
    try {
      return await response.json()
    } catch {
      throw new ApiError('network', 'Malformed response', { status: response.status })
    }
  }

  return { request, enabled: Boolean(root) }
}

const defaultClient = createApiClient({ baseUrl: import.meta.env.VITE_API_BASE_URL })

export const apiEnabled = defaultClient.enabled
export const apiRequest = defaultClient.request

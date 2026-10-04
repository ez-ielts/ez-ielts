// The Clerk session token for API calls. Clerk exposes the active session on `window.Clerk` once it has loaded, which lets plain
// service code (no React hooks) authenticate. Returns null when auth is not configured or nobody is signed in.
export async function getAuthToken() {
  try {
    return (await window.Clerk?.session?.getToken()) ?? null
  } catch {
    return null
  }
}

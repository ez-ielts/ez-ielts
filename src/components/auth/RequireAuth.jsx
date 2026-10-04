import { useAuth } from '@clerk/clerk-react'
import { Navigate, Outlet } from 'react-router-dom'
import { authEnabled } from '../../features/auth/authConfig'

function ClerkGuard() {
  const { isLoaded, isSignedIn } = useAuth()
  if (!isLoaded) return <p role="status" className="p-6 text-sm">Loading…</p>
  return isSignedIn ? <Outlet /> : <Navigate to="/" replace />
}

// Route guard for study screens: signed-out visitors go back to the start of the journey.
export function RequireAuth() {
  return authEnabled ? <ClerkGuard /> : <Outlet />
}

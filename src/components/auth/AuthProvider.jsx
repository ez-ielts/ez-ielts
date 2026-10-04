import { ClerkProvider } from '@clerk/clerk-react'
import { authEnabled, clerkPublishableKey } from '../../features/auth/authConfig'

export function AuthProvider({ children }) {
  if (!authEnabled) return children
  return <ClerkProvider publishableKey={clerkPublishableKey} afterSignOutUrl="/">{children}</ClerkProvider>
}

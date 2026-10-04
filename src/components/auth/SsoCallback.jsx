import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react'

// Finishes the Google/Apple OAuth redirect, then returns to the journey.
export function SsoCallback() {
  return <AuthenticateWithRedirectCallback signInFallbackRedirectUrl="/" signUpFallbackRedirectUrl="/" />
}

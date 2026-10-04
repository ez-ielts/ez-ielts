// Clerk publishable keys are public by design. With no key, auth is disabled and the app
// falls back to the local placeholder flow (development only).
export const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
export const authEnabled = Boolean(clerkPublishableKey)

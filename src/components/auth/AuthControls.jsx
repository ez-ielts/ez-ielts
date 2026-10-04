import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react'
import { Settings } from 'lucide-react'
import { authEnabled } from '../../features/auth/authConfig'
import { Button } from '../ui/Button'

// Sign in / Sign up when signed out, the Clerk user menu (with a Settings link) when signed in.
function ClerkAuthControls() {
  return (
    <>
      <SignedOut>
        <SignInButton mode="modal"><Button variant="secondary" size="xs">Sign in</Button></SignInButton>
        <SignUpButton mode="modal"><Button variant="primary" size="xs">Sign up</Button></SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton>
          <UserButton.MenuItems>
            <UserButton.Link label="Settings" labelIcon={<Settings size={14} aria-hidden="true" />} href="/settings" />
          </UserButton.MenuItems>
        </UserButton>
      </SignedIn>
    </>
  )
}

export function AuthControls() {
  return authEnabled ? <ClerkAuthControls /> : null
}

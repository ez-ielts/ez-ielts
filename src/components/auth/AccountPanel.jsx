import { SignedIn, SignedOut, SignIn, SignUp, useClerk, useUser } from '@clerk/clerk-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authEnabled } from '../../features/auth/authConfig'
import { clerkAppearance } from '../../features/auth/authAppearance'
import { AlertBand } from '../ui/AlertBand'
import { Button } from '../ui/Button'

function SignedInPanel() {
  const navigate = useNavigate()
  const { user, isLoaded } = useUser()
  const { signOut } = useClerk()
  const who = user?.primaryEmailAddress?.emailAddress ?? user?.fullName ?? 'your account'

  return (
    <div className="flex flex-col gap-4 border-2 border-ink p-4">
      <p className="m-0 text-sm">Signed in as <strong>{isLoaded ? who : '…'}</strong>.</p>
      <Button variant="primary" size="xl" arrow onClick={() => navigate('/interview')}>Continue to your questionnaire</Button>
      <div className="flex flex-wrap gap-x-4">
        <Link to="/today" className="inline-flex min-h-11 items-center text-sm font-bold text-accent-700">Go to Today</Link>
        <Button variant="ghost" onClick={() => signOut({ redirectUrl: '/' })}>Sign out</Button>
      </div>
    </div>
  )
}

function SignedOutPanel() {
  const [mode, setMode] = useState('sign-up')
  const signingUp = mode === 'sign-up'
  const Form = signingUp ? SignUp : SignIn

  return (
    <div className="flex flex-col gap-3">
      <Form routing="hash" appearance={clerkAppearance} />
      <Button variant="ghost" onClick={() => setMode(signingUp ? 'sign-in' : 'sign-up')} className="self-start">
        {signingUp ? 'Already have an account? Sign in' : 'New here? Create an account'}
      </Button>
    </div>
  )
}

function ClerkAccountPanel() {
  return (
    <>
      <SignedOut><SignedOutPanel /></SignedOut>
      <SignedIn><SignedInPanel /></SignedIn>
    </>
  )
}

// Development only: with no Clerk key the app cannot sign anyone in.
function AuthNotConfigured() {
  return (
    <AlertBand kicker="Sign-in is not configured" action={<Link to="/interview" className="inline-flex min-h-11 items-center text-sm font-bold text-accent-900">Continue</Link>}>
      Set VITE_CLERK_PUBLISHABLE_KEY to enable accounts.
    </AlertBand>
  )
}

export function AccountPanel() {
  return authEnabled ? <ClerkAccountPanel /> : <AuthNotConfigured />
}

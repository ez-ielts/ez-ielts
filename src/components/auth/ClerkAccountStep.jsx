import { SignedIn, SignedOut, SignIn, SignUp, useUser } from '@clerk/clerk-react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { nextStep } from '../../features/journey/journeySlice'
import { Button } from '../ui/Button'

// Registration step backed by Clerk (email, phone, Google, Apple are enabled in the Clerk dashboard).
export function ClerkAccountStep() {
  const dispatch = useDispatch()
  const { user } = useUser()
  const [mode, setMode] = useState('sign-up')
  const signingUp = mode === 'sign-up'
  const Form = signingUp ? SignUp : SignIn

  return (
    <section className="max-w-[600px]">
      <div className="mb-[21px] text-[9px] font-bold tracking-[1.55px] text-[#a7ada6]">01 / START HERE</div>
      <h2 className="m-0 mb-[18px] font-serif text-[45px] leading-[.96] tracking-[-1.9px] sm:text-[55px]">Let’s build your<br /><em className="text-[#527b61]">starting point.</em></h2>
      <p className="mb-6 max-w-[430px] text-xs leading-[1.65] text-[#7f867f]">Create your free account. We’ll save your assessment, course progress, and exam readiness in one place.</p>
      <SignedOut>
        <Form routing="hash" />
        <Button variant="ghost" size="md" className="mt-3" onClick={() => setMode(signingUp ? 'sign-in' : 'sign-up')}>
          {signingUp ? 'Already have an account? Sign in' : 'New here? Create an account'}
        </Button>
      </SignedOut>
      <SignedIn>
        <p className="mb-4 text-sm">Signed in as <strong>{user?.primaryEmailAddress?.emailAddress ?? user?.fullName ?? 'your account'}</strong>.</p>
        <Button variant="primary" size="lg" arrow onClick={() => dispatch(nextStep())}>Continue to your assessment</Button>
      </SignedIn>
    </section>
  )
}

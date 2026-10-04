import { useClerk, useUser } from '@clerk/clerk-react'
import { authEnabled } from '../../features/auth/authConfig'
import { Button } from '../ui/Button'
import { SummaryTable } from '../ui/SummaryTable'

function ClerkAccount() {
  const { user, isLoaded } = useUser()
  const { signOut, openUserProfile } = useClerk()
  const rows = [
    { label: 'Name', value: isLoaded ? user?.fullName ?? '—' : '…' },
    { label: 'Email', value: isLoaded ? user?.primaryEmailAddress?.emailAddress ?? '—' : '…' },
  ]

  return (
    <div className="flex flex-col gap-3">
      <SummaryTable rows={rows} />
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => openUserProfile()}>Manage account</Button>
        <Button variant="ghost" onClick={() => signOut({ redirectUrl: '/' })}>Sign out</Button>
      </div>
    </div>
  )
}

export function AccountSection() {
  return authEnabled ? <ClerkAccount /> : <p className="m-0 text-sm text-neutral-800">Sign-in is not configured in this build.</p>
}

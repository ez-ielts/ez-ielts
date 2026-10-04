export const appTabs = [
  { to: '/today', label: 'Today' },
  { to: '/plan', label: 'Plan' },
  { to: '/homework', label: 'Homework' },
  { to: '/tutor', label: 'Tutor' },
]

// Screens that live under a tab without being the tab's own route.
const tabOwners = [
  { prefix: '/speaking', tab: '/today' },
  { prefix: '/mock', tab: '/plan' },
  { prefix: '/homework', tab: '/homework' },
]

export function activeTabFor(pathname) {
  const owner = tabOwners.find(({ prefix }) => pathname.startsWith(prefix))
  if (owner) return owner.tab
  return appTabs.find(({ to }) => pathname.startsWith(to))?.to ?? null
}

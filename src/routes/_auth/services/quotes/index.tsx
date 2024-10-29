import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/services/quotes/')({
  component: () => <div>Hello /_auth/services/quotes/!</div>
})
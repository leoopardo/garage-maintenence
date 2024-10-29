import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/dashboard/reports-mechanicals/')({
  component: () => <div>Hello /_auth/dashboard/mechanicals/!</div>
})
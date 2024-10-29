import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/dashboard/reports-operation/')({
  component: () => <div>Hello /_auth/dashboard/operation/!</div>
})
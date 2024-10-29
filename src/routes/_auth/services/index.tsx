import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/services/')({
  component: () => <div>Hello /_auth/services/!</div>
})
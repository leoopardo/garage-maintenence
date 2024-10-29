import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/mechanicals/')({
  component: () => <div>Hello /_auth/mechanicals/!</div>
})
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/clients/')({
  component: () => <div>Hello /_auth/clients/!</div>
})
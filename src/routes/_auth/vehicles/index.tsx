import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/vehicles/')({
  component: () => <div>Hello /_auth/vehicles/!</div>
})
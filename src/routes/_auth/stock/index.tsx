import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/stock/')({
  component: () => <div>Hello /_auth/stock/!</div>
})
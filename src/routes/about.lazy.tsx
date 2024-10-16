import { createLazyFileRoute } from '@tanstack/react-router'
import { Typography } from 'antd'

export const Route = createLazyFileRoute('/about')({
  component: () => <Typography>Hello /about!</Typography>
})


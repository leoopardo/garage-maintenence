import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/dashboard/reports-services/")({
  component: () => <div>Hello /_auth/dashboard/services/!</div>,
});

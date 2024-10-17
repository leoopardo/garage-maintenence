import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div
      style={{
        justifyContent: "flex-start",
        alignItems: "start",
      }}
    >
      <Outlet />
    </div>
  ),
});

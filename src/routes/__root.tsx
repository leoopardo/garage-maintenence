import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Layout } from "antd";

export const Route = createRootRoute({
  component: () => (
    <Layout
      style={{
        justifyContent: "flex-start",
        alignItems: "start",
      }}
    >
      <Outlet />
    </Layout>
  ),
});

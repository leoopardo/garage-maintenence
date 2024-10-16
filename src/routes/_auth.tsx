import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Layout } from "antd";
import secureLocalStorage from "react-secure-storage";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async () => {
    const token = secureLocalStorage.getItem("token");
    if (!token) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: () => (
    <Layout
      style={{
        height: "100vh",
        width: "100vw",
        justifyContent: "flex-start",
        alignItems: "start",
      }}
    >
      <Outlet />
    </Layout>
  ),
});

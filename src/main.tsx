import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

// Import the generated route tree
import { ConfigProvider } from "antd";
import ptbr from "antd/locale/pt_BR";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider } from "react-query";
import { AuthProvider } from "./contexts/useAuth";
import "./index.css";
import { routeTree } from "./routeTree.gen";
import { queryClient } from "./services/queryClient";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <AuthProvider>
      <ConfigProvider locale={ptbr}>
        <QueryClientProvider client={queryClient}>
          <StrictMode>
            <Toaster />
            <RouterProvider router={router} />
          </StrictMode>
        </QueryClientProvider>
      </ConfigProvider>
    </AuthProvider>,
  );
}

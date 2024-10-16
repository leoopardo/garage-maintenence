import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

// Import the generated route tree
import { QueryClientProvider } from "react-query";
import { ConfigProvider } from "antd";
import ptbr from "antd/locale/pt_BR";
import { routeTree } from "./routeTree.gen";
import { queryClient } from "./services/queryClient";
import Dark from "./themes/dark";
import "./index.css";
import { AuthProvider } from "./contexts/useAuth";

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
      <ConfigProvider locale={ptbr} theme={Dark}>
        <QueryClientProvider client={queryClient}>
          <StrictMode>
            <RouterProvider router={router} />
          </StrictMode>
        </QueryClientProvider>
      </ConfigProvider>
    </AuthProvider>
  );
}

import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { registerSW } from "virtual:pwa-register";
import { AuthProvider } from "./contexts/UserContext";
import "./index.css";
import Root from "./Root";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={client}>
        <Root />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);

registerSW({
  onOfflineReady() {},
  immediate: true,
});

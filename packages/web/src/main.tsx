import React from "react";
import ReactDOM from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import { AuthProvider } from "./contexts/UserContext";
import "./index.css";
import Root from "./Root";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <Root />
    </AuthProvider>
  </React.StrictMode>
);

registerSW({
  onOfflineReady() {},
  immediate: true,
});

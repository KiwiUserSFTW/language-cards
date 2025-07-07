// react
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// components
import App from "@components/App.tsx";
import "./i18n";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

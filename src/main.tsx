// styles
import "./main.scss";

// react
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// components
import App from "@components/App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  resolve: {
    alias: {
      "@styles": path.resolve(__dirname, "src/styles"),
      "@components": path.resolve(__dirname, "src/components"),
      "@cutomHooks": path.resolve(__dirname, "src/customHooks"),
      "@data": path.resolve(__dirname, "src/data"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@styles/variables" as *;`,
      },
    },
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "dashboardMf",
      filename: "remoteEntry.js",
      exposes: {
        "./LoginPage": "./src/pages/LoginPage.tsx",
        "./RegisterPage": "./src/pages/RegisterPage.tsx",
        "./DashboardLayout": "./src/layouts/DashboardLayout.tsx",
      },
      shared: ["react", "react-dom", "react-router-dom", "zustand"],
    }),
  ],
  server: {
    port: 5002,
    cors: true,
  },
  preview: {
    port: 5002,
    cors: true,
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});

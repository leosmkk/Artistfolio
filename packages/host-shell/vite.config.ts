import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const FEED_URL =
    env.VITE_FEED_MF_URL || "http://localhost:5001";
  const DASHBOARD_URL =
    env.VITE_DASHBOARD_MF_URL || "http://localhost:5002";

  return {
    plugins: [
      react(),
      federation({
        name: "host",
        remotes: {
          feedMf: `${FEED_URL}/assets/remoteEntry.js`,
          dashboardMf: `${DASHBOARD_URL}/assets/remoteEntry.js`,
        },
        shared: ["react", "react-dom", "react-router-dom", "zustand"],
      }),
    ],
    server: {
      port: 5000,
    },
    preview: {
      port: 5000,
    },
    build: {
      modulePreload: false,
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
    },
  };
});

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      federation({
        name: "feedMf",
        filename: "remoteEntry.js",
        exposes: {
          "./FeedPage": "./src/pages/FeedPage.tsx",
          "./ArtistPage": "./src/pages/ArtistPage.tsx",
        },
        shared: ["react", "react-dom", "react-router-dom"],
      }),
    ],
    server: {
      port: 5001,
      cors: true,
    },
    preview: {
      port: 5001,
      cors: true,
    },
    build: {
      modulePreload: false,
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
    },
  };
});

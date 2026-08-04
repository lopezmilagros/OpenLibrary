import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    proxy: {
      "/api": {
        target: "https://openlibrary.org",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyreq) => {
            proxyreq.setHeader("Challange", "BookExplorer/1.0 (lopezmilagros003@gmail.com)");
          });
        },
      },
    },
  },
});
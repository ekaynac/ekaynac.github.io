import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/", // user-site (ekaynac.github.io) serves from root
  publicDir: "../public", // serve the repo's public/ (cv.pdf) at /cv.pdf in dev, preview, and build
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test-setup.ts"],
  },
});

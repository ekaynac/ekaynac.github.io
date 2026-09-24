import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/", // served from root on both ekaynac.github.io and tensorenes.com
  publicDir: "../public", // serve the repo's public/ (cv.pdf) at /cv.pdf in dev, preview, and build
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test-setup.ts"],
  },
});

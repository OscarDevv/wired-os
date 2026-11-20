/// <reference types="vitest/config" />

import react from "@vitejs/plugin-react"
import path from "node:path"
import { defineConfig } from "vite"
import { visualizer } from "rollup-plugin-visualizer"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: "./stats.html",
      open: true,
      gzipSize: true,
      brotliSize: true,
      template: "treemap"
    })
  ],

  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },

  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    globals: false,
    css: true
  }
})

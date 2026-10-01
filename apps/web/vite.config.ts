import react from "@vitejs/plugin-react"
import path from "node:path"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@app": path.resolve(__dirname, "./src/app"),
      "@os": path.resolve(__dirname, "./src/os"),
      "@ui": path.resolve(__dirname, "./src/ui"),
    },
  },
})

import path from "path"
import { fileURLToPath } from 'url'
// fs is no longer needed here, it's used in vite-macros.js
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import Macros from 'unplugin-macros/vite'

// Import macros from the external file

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    Macros()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
  },
  server: {
    allowedHosts: [
      "X7md.local".toLowerCase(),
      "LAPTOP-A5BTHRSE.local".toLowerCase()
    ]
  }
}
)


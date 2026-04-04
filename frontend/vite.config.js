import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Use port 3000 for stable local development (or next available if taken)
    port: process.env.VITE_PORT || 3000,
    host: '127.0.0.1',
    proxy: {
      '/api': {
        // API target: http://127.0.0.1:3000 (backend API endpoint)
        target: process.env.VITE_API_URL || 'http://127.0.0.1:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    cors: true,
    // HMR configuration for hot module replacement
    middlewareMode: false
  }
})

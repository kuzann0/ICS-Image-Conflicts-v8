import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Use port 5173 - accessible from all interfaces
    port: 5173,
    // Bind to 0.0.0.0 to be accessible from all machines
    host: '0.0.0.0',
    proxy: {
      '/api': {
        // API target: backend service on port 3001
        target: 'http://127.0.0.1:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    cors: true,
    // HMR configuration for hot module replacement
    middlewareMode: false,
    // Allow connections from external clients
    hmr: {
      host: 'localhost',
      port: 5173,
      protocol: 'ws'
    }
  }
})

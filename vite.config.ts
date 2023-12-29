import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  server: {
    https: true,
    hmr: {
      host: "localhost",
      protocol: "ws",
    },
  },
  plugins: [react({
    jsxRuntime: 'classic'
  }), mkcert()]
})

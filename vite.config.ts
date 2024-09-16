import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/zeldaFandom': {
        target: 'https://zelda.fandom.com', 
        changeOrigin: true, 
        rewrite: (path) => path.replace(/^\/zeldaFandom/, ''), 
      },
    },
  },
})

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
/* https://zelda.fandom.com/api.php?action=query&titles=File:BotW_English_Logo.png&prop=imageinfo&iiprop=url&format=json */
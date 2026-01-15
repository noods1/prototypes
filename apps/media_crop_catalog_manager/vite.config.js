import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/media_crop_catalog_manager/',
  server: {
    port: 5177,
  },
})

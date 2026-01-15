import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/media_crop_catalog_manager/',
  server: {
    port: 5177,
  },
  resolve: {
    alias: {
      '@fe-infra/keystone-design-tokens': path.resolve(__dirname, '../../packages/keystone-design-tokens'),
      '@fe-infra/keystone-react': path.resolve(__dirname, '../../packages/keystone-ui/react/dist'),
      '@fe-infra/keystone': path.resolve(__dirname, '../../packages/keystone-ui/core')
    }
  },
  optimizeDeps: {
    exclude: ['@fe-infra/keystone-react', '@fe-infra/keystone']
  }
})

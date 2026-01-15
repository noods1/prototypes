import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { existsSync } from 'fs'

// Plugin to resolve keystone-react component imports
const keystoneReactResolver = () => {
  return {
    name: 'keystone-react-resolver',
    resolveId(id, importer) {
      // Handle relative imports from keystone-react dist/index.js
      if (importer && importer.includes('keystone-ui/react/dist/index.js')) {
        if (id.startsWith('./components/')) {
          const componentPath = path.resolve(
            path.dirname(importer),
            id + '.js'
          )
          if (existsSync(componentPath)) {
            return componentPath
          }
        }
      }
      return null
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), keystoneReactResolver()],
  base: '/media_crop_catalog_manager/',
  server: {
    port: 5177,
  },
  resolve: {
    alias: {
      '@fe-infra/keystone-design-tokens': path.resolve(__dirname, '../../packages/keystone-design-tokens'),
      '@fe-infra/keystone-react': path.resolve(__dirname, '../../packages/keystone-ui/react/dist'),
      '@fe-infra/keystone': path.resolve(__dirname, '../../packages/keystone-ui/core')
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },
  optimizeDeps: {
    exclude: ['@fe-infra/keystone-react', '@fe-infra/keystone']
  },
  build: {
    commonjsOptions: {
      include: [/keystone-ui/, /node_modules/],
      transformMixedEsModules: true
    }
  }
})

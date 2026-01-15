import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { existsSync } from 'fs'

// Plugin to resolve keystone-react component imports
const keystoneReactResolver = () => {
  const keystoneReactPath = path.resolve(__dirname, '../../packages/keystone-ui/react')
  return {
    name: 'keystone-react-resolver',
    enforce: 'pre', // Run before other resolvers
    resolveId(id, importer) {
      // Handle relative imports from keystone-react
      if (importer && importer.includes('keystone-ui/react')) {
        // Handle component imports
        if (id.startsWith('./components/')) {
          const componentName = id.replace('./components/', '')
          const srcPath = path.resolve(keystoneReactPath, 'src', 'components', componentName + '.ts')
          const distPath = path.resolve(keystoneReactPath, 'dist', 'components', componentName + '.js')
          
          if (existsSync(srcPath)) {
            return srcPath
          }
          if (existsSync(distPath)) {
            return distPath
          }
        }
        // Handle hook imports
        if (id.startsWith('./hooks/')) {
          const hookName = id.replace('./hooks/', '')
          const srcPath = path.resolve(keystoneReactPath, 'src', 'hooks', hookName + '.ts')
          const distPath = path.resolve(keystoneReactPath, 'dist', 'hooks', hookName + '.js')
          
          if (existsSync(srcPath)) {
            return srcPath
          }
          if (existsSync(distPath)) {
            return distPath
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
      '@fe-infra/keystone-react': path.resolve(__dirname, '../../packages/keystone-ui/react/src'),
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

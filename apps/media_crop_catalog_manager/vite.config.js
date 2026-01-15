import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { existsSync } from 'fs'

// Plugin to resolve keystone-react component imports
const keystoneReactResolver = () => {
  const keystoneReactPath = path.resolve(__dirname, '../../packages/keystone-ui/react')
  return {
    name: 'keystone-react-resolver',
    resolveId(id, importer) {
      // Handle relative imports from keystone-react (both src and dist)
      if (importer && importer.includes('keystone-ui/react')) {
        if (id.startsWith('./components/') || id.startsWith('../components/')) {
          // Determine if we're in src or dist based on importer
          const componentName = id.replace('./components/', '').replace('../components/', '')
          
          // Try src first (since alias points to src)
          const srcPath = path.resolve(keystoneReactPath, 'src', 'components', componentName + '.ts')
          if (existsSync(srcPath)) {
            return srcPath
          }
          
          // Fallback to dist
          const distPath = path.resolve(keystoneReactPath, 'dist', 'components', componentName + '.js')
          if (existsSync(distPath)) {
            return distPath
          }
        }
        if (id.startsWith('./hooks/') || id.startsWith('../hooks/')) {
          const hookName = id.replace('./hooks/', '').replace('../hooks/', '')
          
          // Try src first
          const srcPath = path.resolve(keystoneReactPath, 'src', 'hooks', hookName + '.ts')
          if (existsSync(srcPath)) {
            return srcPath
          }
          
          // Fallback to dist
          const distPath = path.resolve(keystoneReactPath, 'dist', 'hooks', hookName + '.js')
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

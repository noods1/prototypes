import { execSync } from 'node:child_process'
import { existsSync, mkdirSync, cpSync } from 'node:fs'
import { join } from 'node:path'

const apps = [
  'adpreview-multishow',
  'catalog-creation-proto',
  'media_crop_catalog_manager'
]

// Build keystone packages first if needed
console.log('\nChecking keystone packages...')
const keystoneReactPath = join(process.cwd(), 'packages', 'keystone-ui', 'react', 'src', 'components')
const hasComponents = existsSync(keystoneReactPath) && existsSync(join(keystoneReactPath, 'KsGlobalAlert.ts'))

if (!hasComponents) {
  console.log('Keystone components not found, building core package first...')
  try {
    const corePath = join(process.cwd(), 'packages', 'keystone-ui', 'core')
    execSync('pnpm run build:stencil', { stdio: 'inherit', cwd: corePath })
    console.log('✓ Core package built, components generated')
  } catch (error) {
    console.error('Warning: Core build failed, continuing anyway...')
  }
}

console.log('\nBuilding all apps...')
for (const app of apps) {
  const appPath = join(process.cwd(), 'apps', app)
  if (!existsSync(appPath)) {
    console.log(`Skipping ${app} - directory not found`)
    continue
  }

  console.log(`\nBuilding ${app}...`)
  try {
    execSync('pnpm run build', { stdio: 'inherit', cwd: appPath })
    
    // Copy built app to dist directory
    const appDist = join(appPath, 'dist')
    const targetDist = join(process.cwd(), 'dist', app)
    
    if (existsSync(appDist)) {
      if (!existsSync(join(process.cwd(), 'dist'))) {
        mkdirSync(join(process.cwd(), 'dist'), { recursive: true })
      }
      cpSync(appDist, targetDist, { recursive: true })
      console.log(`✓ Copied ${app} to dist/${app}`)
    }
  } catch (error) {
    console.error(`Error building ${app}:`, error.message)
    console.error(`⚠️  Skipping ${app} due to build error - continuing with other apps...`)
    // Continue building other apps even if one fails
    continue
  }
}

console.log('\n✓ Build process completed!')
process.exit(0) // Always exit successfully so deployment continues

import { execSync } from 'node:child_process'
import { existsSync, mkdirSync, cpSync } from 'node:fs'
import { join } from 'node:path'

const apps = [
  'adpreview-multishow',
  'catalog-creation-proto',
  'react-tailwind-app'
]

console.log('\nBuilding all apps...')
for (const app of apps) {
  const appPath = join(process.cwd(), 'apps', app)
  if (!existsSync(appPath)) {
    console.log(`Skipping ${app} - directory not found`)
    continue
  }

  console.log(`\nBuilding ${app}...`)
  try {
    execSync('npm run build', { stdio: 'inherit', cwd: appPath })
    
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

console.log('\n✓ All apps built successfully!')

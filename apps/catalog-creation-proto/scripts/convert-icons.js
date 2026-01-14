#!/usr/bin/env node

/**
 * Icon Converter Script
 * 
 * Converts icons from /Users/bytedance/Downloads/icons to our icon system
 * - Extracts SVG paths
 * - Converts hardcoded colors to currentColor
 * - Scales from 24x24 viewBox to 16x16
 * - Converts to TypeScript with IconBase
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_DIR = '/Users/bytedance/Downloads/icons';
const TARGET_DIR = path.join(__dirname, '../src/components/icons');

// Scale factor: 16/24 = 0.6667
const SCALE = 16 / 24;

// Convert path coordinates from 24x24 to 16x16
function scalePath(pathData) {
  // This is a simplified approach - we'll keep the viewBox as 24x24 and scale the SVG
  // Actually, better to keep viewBox and let SVG scale naturally
  return pathData;
}

// Extract paths from icon file
function extractPaths(content) {
  const paths = [];
  const pathRegex = /<path\s+([^>]+)\/>/g;
  let match;
  
  while ((match = pathRegex.exec(content)) !== null) {
    const attrs = match[1];
    const pathObj = {};
    
    // Extract attributes
    const attrRegex = /(\w+(?:-\w+)*)=["']([^"']+)["']/g;
    let attrMatch;
    while ((attrMatch = attrRegex.exec(attrs)) !== null) {
      const [, key, value] = attrMatch;
      pathObj[key] = value;
    }
    
    // Convert colors to currentColor
    if (pathObj.fill && pathObj.fill !== 'none') {
      pathObj.fill = 'currentColor';
    }
    if (pathObj.stroke && pathObj.stroke !== 'none') {
      pathObj.stroke = 'currentColor';
    }
    
    paths.push(pathObj);
  }
  
  return paths;
}

// Convert icon file to our format
function convertIcon(sourcePath, targetPath) {
  const content = fs.readFileSync(sourcePath, 'utf-8');
  const paths = extractPaths(content);
  
  if (paths.length === 0) {
    console.warn(`No paths found in ${sourcePath}`);
    return false;
  }
  
  // Get component name from file path
  const fileName = path.basename(sourcePath, '.js');
  const componentName = fileName.replace('Icon', '');
  
  // Determine category and subdirectory from source path
  const relativePath = path.relative(SOURCE_DIR, sourcePath);
  const parts = path.dirname(relativePath).split(path.sep).filter(p => p);
  const category = parts[0] || 'misc';
  const subdirectory = parts.slice(1).join('/');
  
  // Create target directory
  const targetDir = subdirectory 
    ? path.join(TARGET_DIR, category, subdirectory)
    : path.join(TARGET_DIR, category);
  
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  // Calculate import path depth
  const depth = subdirectory ? subdirectory.split('/').length + 1 : 1;
  const importPath = '../'.repeat(depth) + 'IconBase';
  
  // Generate component
  const pathElements = paths.map(p => {
    const attrs = Object.entries(p)
      .map(([key, value]) => {
        // Convert kebab-case to camelCase for React
        const camelKey = key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        return `${camelKey}="${value}"`;
      })
      .join(' ');
    return `      <path ${attrs} />`;
  }).join('\n');
  
  const componentContent = `import React from 'react';
import { IconBase, IconProps } from '${importPath}';

type ${componentName}Props = Omit<IconProps, 'children'>;

/**
 * ${fileName}
 * 
 * Converted from ${relativePath}
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const ${componentName}: React.FC<${componentName}Props> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
${pathElements}
    </IconBase>
  );
};

export default ${componentName};
`;
  
  const finalPath = path.join(targetDir, `${componentName}.tsx`);
  fs.writeFileSync(finalPath, componentContent);
  console.log(`Converted: ${relativePath} -> ${path.relative(TARGET_DIR, finalPath)}`);
  return true;
}

// Find all icon files
function findIconFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findIconFiles(fullPath));
    } else if (entry.name.endsWith('Icon.js')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Main
function main() {
  console.log('Starting icon conversion...');
  console.log(`Source: ${SOURCE_DIR}`);
  console.log(`Target: ${TARGET_DIR}`);
  
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`Source directory not found: ${SOURCE_DIR}`);
    process.exit(1);
  }
  
  const iconFiles = findIconFiles(SOURCE_DIR);
  console.log(`Found ${iconFiles.length} icon files`);
  
  let converted = 0;
  for (const file of iconFiles) {
    try {
      if (convertIcon(file, TARGET_DIR)) {
        converted++;
      }
    } catch (error) {
      console.error(`Error converting ${file}:`, error.message);
    }
  }
  
  console.log(`\nConverted ${converted} icons`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}


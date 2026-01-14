#!/usr/bin/env node

/**
 * Icon Generator Script
 * 
 * This script generates React icon components from the Figma metadata file.
 * It creates components organized by category with proper TypeScript types.
 * 
 * Usage: node scripts/generate-icons.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const METADATA_FILE = '/Users/bytedance/.cursor/projects/Users-bytedance-catalog-creation-proto/agent-tools/145fa0ba-a0dd-432f-b16a-388944383203.txt';
const ICONS_DIR = path.join(__dirname, '../src/components/icons');

// Parse icon name to component name
function toComponentName(iconName) {
  // Convert "Arrows/Arrow/DownSmall" to "DownSmall"
  const parts = iconName.split('/');
  const lastPart = parts[parts.length - 1];
  
  // Handle PascalCase, camelCase, kebab-case, or snake_case
  // Split on non-alphanumeric characters and capitalize each word
  const words = lastPart
    .split(/[^a-zA-Z0-9]+/)
    .filter(word => word.length > 0);
  
  // If no separators found, check if it's already PascalCase
  if (words.length === 1) {
    const word = words[0];
    // If it's already PascalCase (starts with uppercase), return as is
    if (word[0] === word[0].toUpperCase()) {
      return word;
    }
    // Otherwise capitalize first letter
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  
  // Multiple words - capitalize each
  return words
    .map(word => {
      // Preserve existing capitalization if it starts with uppercase
      if (word[0] === word[0].toUpperCase()) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join('');
}

// Get category from icon name
function getCategory(iconName) {
  const parts = iconName.split('/');
  if (parts.length > 1) {
    return parts[0].toLowerCase(); // e.g., "Arrows" -> "arrows"
  }
  return 'misc';
}

// Get subdirectory from icon name
function getSubdirectory(iconName) {
  const parts = iconName.split('/');
  if (parts.length > 2) {
    return parts.slice(1, -1).join('/').toLowerCase(); // e.g., "Arrows/Arrow/DownSmall" -> "arrow"
  }
  return '';
}

// Calculate relative import path depth
function getImportPathDepth(category, subdirectory) {
  // IconBase is at src/components/icons/IconBase.tsx
  // For icons at src/components/icons/arrows/chevron/Left.tsx: ../../IconBase (2 levels)
  // For icons at src/components/icons/arrows/arrow/DownSmall.tsx: ../../IconBase (2 levels)
  // For icons at src/components/icons/symbols/close/CloseSmall.tsx: ../../IconBase (2 levels)
  // For icons at src/components/icons/misc/Info.tsx: ../IconBase (1 level)
  // For icons at src/components/icons/rtl/media/filled/RTLVolumeUp.tsx: ../../../IconBase (3 levels)
  
  // Calculate depth based on subdirectory nesting
  if (subdirectory) {
    const depth = subdirectory.split('/').length + 1; // +1 for category level
    return '../'.repeat(depth) + 'IconBase';
  }
  return '../IconBase';
}

// Generate icon component
function generateIconComponent(iconName, componentName, category, subdirectory) {
  const categoryDir = path.join(ICONS_DIR, category);
  const subDir = subdirectory ? path.join(categoryDir, subdirectory) : categoryDir;
  
  // Ensure directory exists
  if (!fs.existsSync(subDir)) {
    fs.mkdirSync(subDir, { recursive: true });
  }
  
  // Use component name directly (should already be PascalCase)
  const filePath = path.join(subDir, `${componentName}.tsx`);
  const importPath = getImportPathDepth(category, subdirectory);
  
  const componentContent = `import React from 'react';
import { IconBase, IconProps } from '${importPath}';

type ${componentName}Props = Omit<IconProps, 'children'>;

/**
 * ${iconName}
 * 
 * This icon component is auto-generated from Figma.
 * TODO: Replace placeholder SVG with actual icon paths from Figma.
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const ${componentName}: React.FC<${componentName}Props> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} {...props}>
      {/* TODO: Add actual SVG paths from Figma */}
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </IconBase>
  );
};

export default ${componentName};
`;

  fs.writeFileSync(filePath, componentContent);
  console.log(`Generated: ${filePath}`);
}

// Parse metadata file
function parseMetadata() {
  const content = fs.readFileSync(METADATA_FILE, 'utf-8');
  const lines = content.split('\n');
  
  const icons = [];
  let currentFrame = null;
  
  for (const line of lines) {
    // Match: <frame id="56390:1806" name="Arrows/Arrow/DownSmall" ...
    const frameMatch = line.match(/<frame[^>]*id="([^"]*)"[^>]*name="([^"]*)"[^>]*>/);
    if (frameMatch) {
      const [, id, name] = frameMatch;
      if (currentFrame) {
        icons.push(currentFrame);
      }
      currentFrame = {
        id,
        name,
        sizes: [],
      };
    }
    
    if (currentFrame) {
      // Match: <symbol id="56390:1807" name="size=16" ...
      const sizeMatch = line.match(/<symbol[^>]*id="([^"]*)"[^>]*name="size=(\d+)"[^>]*>/);
      if (sizeMatch) {
        const [, symbolId, size] = sizeMatch;
        currentFrame.sizes.push({ size, id: symbolId });
      }
    }
  }
  
  if (currentFrame) {
    icons.push(currentFrame);
  }
  
  return icons;
}

// Generate unique export name
function toExportName(iconName, componentName) {
  const parts = iconName.split('/');
  // If there are multiple parts, use a more descriptive name
  if (parts.length > 2) {
    // Use category + subcategory + component name
    const category = parts[0];
    const subcategory = parts[1];
    const lastPart = parts[parts.length - 1];
    
    // Create unique name: CategorySubcategoryComponent
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
    const subcategoryName = subcategory.charAt(0).toUpperCase() + subcategory.slice(1).toLowerCase();
    
    return `${categoryName}${subcategoryName}${componentName}`;
  } else if (parts.length === 2) {
    const category = parts[0];
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
    return `${categoryName}${componentName}`;
  }
  return componentName;
}

// Generate index file exports
function generateIndexFile(icons) {
  const exports = [];
  const usedNames = new Set();
  
  for (const icon of icons) {
    const componentName = toComponentName(icon.name);
    const category = getCategory(icon.name);
    const subdirectory = getSubdirectory(icon.name);
    
    const importPath = subdirectory 
      ? `./${category}/${subdirectory}/${componentName}`
      : `./${category}/${componentName}`;
    
    // Generate unique export name
    let exportName = toExportName(icon.name, componentName);
    
    // Handle duplicates
    if (usedNames.has(exportName)) {
      // Add a suffix to make it unique
      let counter = 1;
      let uniqueName = `${exportName}${counter}`;
      while (usedNames.has(uniqueName)) {
        counter++;
        uniqueName = `${exportName}${counter}`;
      }
      exportName = uniqueName;
    }
    
    usedNames.add(exportName);
    
    exports.push({
      name: componentName,
      importPath,
      exportName,
      iconName: icon.name,
    });
  }
  
  // Sort exports alphabetically
  exports.sort((a, b) => a.exportName.localeCompare(b.exportName));
  
  // Generate index.ts content with comments
  const indexContent = `// Icon library exports
// Auto-generated file - do not edit manually
// Total icons: ${exports.length}

${exports.map(exp => `// ${exp.iconName}\nexport { default as ${exp.exportName} } from '${exp.importPath}';`).join('\n')}

// Export IconBase for custom icons
export { IconBase } from './IconBase';
export type { IconProps, IconSize } from './IconBase';
`;

  fs.writeFileSync(path.join(ICONS_DIR, 'index.ts'), indexContent);
  console.log(`Generated index.ts with ${exports.length} exports`);
}

// Main execution
function main() {
  console.log('Parsing metadata file...');
  const icons = parseMetadata();
  console.log(`Found ${icons.length} icons`);
  
  console.log('Generating icon components...');
  for (const icon of icons) {
    const componentName = toComponentName(icon.name);
    const category = getCategory(icon.name);
    const subdirectory = getSubdirectory(icon.name);
    
    generateIconComponent(icon.name, componentName, category, subdirectory);
  }
  
  console.log('Generating index file...');
  generateIndexFile(icons);
  
  console.log('Done!');
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { parseMetadata, generateIconComponent, toComponentName };


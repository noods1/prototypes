import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { fileURLToPath } from 'url';
// eslint-disable-next-line no-unused-vars
import * as Components from '@byted-keystone/types';

// 在ES模块中获取__dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 使用__dirname获取当前目录
const rootDir = __dirname;
const baseDir = path.resolve(rootDir, '../../../apps/website/src/content/develop/components');
const snippetsDir = path.resolve(rootDir, '../../../apps/website/src/snippets');
// 输出目录为当前目录下的output文件夹
const outputDir = path.resolve(rootDir, '../md/components');
// 需要复制的目录
const copyDirectories = [
  path.resolve(rootDir, '../../../apps/website/src/content/develop/quick-start'),
  path.resolve(rootDir, '../../../apps/website/src/content/develop/iconography'),
  path.resolve(rootDir, '../../../apps/website/src/content/develop/tailwind-css'),
];
// 确保输出目录存在
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`Created output directory: ${outputDir}`);
}

// Function to read code snippet content
function getCodeSnippetContent(snippetPath) {
  const reactPath = path.join(snippetsDir, `${snippetPath}.tsx`);
  const vuePath = path.join(snippetsDir, `${snippetPath}`);

  let content = '';
  let language = '';

  // Try to read the React/TSX file first
  if (fs.existsSync(reactPath)) {
    content = fs.readFileSync(reactPath, 'utf8');
    language = 'tsx';
  }
  // Then try Vue file
  else if (fs.existsSync(vuePath)) {
    content = fs.readFileSync(vuePath, 'utf8');
    language = 'vue';
  } else {
    return `<!-- Snippet not found: ${snippetPath} -->`;
  }

  return `\`\`\`${language}\n${content}\n\`\`\``;
}

// 提取mdx文件中的导入语句，用于分析引用的类型
function extractImports(mdxContent) {
  const imports = [];
  const importRegex = /^import\s+(?:{(.+)}|(.+))\s+from\s+['"](.+)['"];?$/gm;
  let match;

  while ((match = importRegex.exec(mdxContent)) !== null) {
    // 提取导入的模块和类型
    const importedItems = match[1] || match[2];
    const fromModule = match[3];
    imports.push({ items: importedItems.split(',').map((item) => item.trim()), from: fromModule });
  }

  return imports;
}

// 从组件引用中提取组件名
function extractComponentName(dataSourceExpr) {
  // 常见的模式: props={KsButtonProps} 或 Component.props
  const match = dataSourceExpr.match(/\b([A-Z][a-zA-Z0-9]+)(|\.props|\.events|\.slots)/);
  if (match) {
    return match[1]; // 返回组件名称
  }
  return null;
}

// 根据Components数据生成属性表格
function generatePropsTable(componentName) {
  if (!componentName || !Components[componentName] || !Components[componentName].props) {
    return `## Properties\n\n<!-- No properties found for ${componentName || 'component'} -->`;
  }

  const props = Components[componentName].props;
  let mdTable = '## Properties\n\n| Name | Type | Default | Description |\n| ---- | ---- | ------- | ----------- |\n';

  // 处理属性数据
  Object.keys(props).forEach((propName) => {
    const prop = props[propName];
    const type = prop.type ? prop.type.replace(/\|/g, '\\|') : '';
    const defaultValue = prop.default || '';
    const description = prop.docsTags[0].text.replace('{en}', '').trim() || '';

    mdTable += `| ${prop.name} | ${type} | ${defaultValue} | ${description} |\n`;
  });

  return mdTable;
}

// 根据Components数据生成事件表格
function generateEventsTable(componentName) {
  if (!componentName || !Components[componentName] || !Components[componentName].events) {
    return `## Events\n\n<!-- No events found for ${componentName || 'component'} -->`;
  }

  const events = Components[componentName].events;
  let mdTable = '## Events\n\n| Name | Parameters | Description |\n| ---- | ---------- | ----------- |\n';

  // 处理事件数据
  Object.keys(events).forEach((eventName) => {
    const event = events[eventName];
    const parameters = event.detail || '';
    const description = event.docsTags[0].text.replace('{en}', '').trim() || '';

    mdTable += `| ${event.event} | ${parameters} | ${description} |\n`;
  });

  return mdTable;
}

// 根据Components数据生成插槽表格
function generateSlotsTable(componentName) {
  if (!componentName || !Components[componentName] || !Components[componentName].slots) {
    return `## Slots\n\n<!-- No slots found for ${componentName || 'component'} -->`;
  }

  const slots = Components[componentName].slots;
  let mdTable = '## Slots\n\n| Name | Description |\n| ---- | ----------- |\n';

  // 处理插槽数据
  Object.keys(slots).forEach((slotName) => {
    const slot = slots[slotName];

    mdTable += `| ${slot.name} | ${slot.docs} |\n`;
  });

  return mdTable;
}

// 转换PropertyTable为Markdown表格
function convertPropertyTableToMd(match) {
  try {
    const dataSourceMatch = match.match(/dataSource=\{(.*?)\}/s);
    if (!dataSourceMatch || !dataSourceMatch[1]) {
      return '<!-- PropertyTable: No data found -->';
    }

    const dataSourceExpr = dataSourceMatch[1].trim();
    const componentName = extractComponentName(dataSourceExpr);

    return generatePropsTable(componentName);
  } catch (error) {
    return `## Properties\n\n<!-- Error processing PropertyTable: ${error.message} -->`;
  }
}

// 转换EventTable为Markdown表格
function convertEventTableToMd(match) {
  try {
    const dataSourceMatch = match.match(/dataSource=\{(.*?)\}/s);
    if (!dataSourceMatch || !dataSourceMatch[1]) {
      return '<!-- EventTable: No data found -->';
    }

    const dataSourceExpr = dataSourceMatch[1].trim();
    const componentName = extractComponentName(dataSourceExpr);

    return generateEventsTable(componentName);
  } catch (error) {
    return `## Events\n\n<!-- Error processing EventTable: ${error.message} -->`;
  }
}

// 转换SlotTable为Markdown表格
function convertSlotTableToMd(match) {
  try {
    const dataSourceMatch = match.match(/dataSource=\{(.*?)\}/s);
    if (!dataSourceMatch || !dataSourceMatch[1]) {
      return '<!-- SlotTable: No data found -->';
    }

    const dataSourceExpr = dataSourceMatch[1].trim();
    const componentName = extractComponentName(dataSourceExpr);

    return generateSlotsTable(componentName);
  } catch (error) {
    return `## Slots\n\n<!-- Error processing SlotTable: ${error.message} -->`;
  }
}

// Function to convert a single MDX file to MD
function convertMdxToMd(mdxFilePath) {
  // Read MDX content
  const mdxContent = fs.readFileSync(mdxFilePath, 'utf8');

  // 提取导入语句
  const imports = extractImports(mdxContent);

  // 记录导入信息
  let importInfo = '';
  if (imports.length > 0) {
    importInfo = '## Imported Types\n\n';
    imports.forEach((imp) => {
      importInfo += `- From \`${imp.from}\`: ${imp.items.join(', ')}\n`;
    });
    importInfo += '\n';
  }

  // Remove import statements
  let mdContent = mdxContent.replace(/^import.*?;(\r?\n|\r)?/gm, '');

  // 添加提取的导入信息
  mdContent = importInfo + mdContent;

  // 判断是React还是Vue内容
  let framework = 'react'; // 默认为react
  if (mdContent.includes('<template>') || mdContent.toLowerCase().includes('vue')) {
    framework = 'vue';
  }

  // 从文件夹名称中获取组件名
  const dirName = path.basename(path.dirname(mdxFilePath));
  // 首字母大写处理组件名
  const componentName = dirName.charAt(0).toUpperCase() + dirName.slice(1);

  // Replace code tags with actual snippet content
  mdContent = mdContent.replace(/<code src="@\/snippets\/([^"]+)" \/>/g, (match, snippetPath) =>
    getCodeSnippetContent(snippetPath),
  );

  // 转换PropertyTable、EventTable和SlotTable
  mdContent = mdContent
    .replace(/<PropertyTable\s+dataSource=\{(.*?)\}\s*\/>/gs, convertPropertyTableToMd)
    .replace(/<EventTable\s+dataSource=\{(.*?)\}\s*\/>/gs, convertEventTableToMd)
    .replace(/<SlotTable\s+dataSource=\{(.*?)\}\s*\/>/gs, convertSlotTableToMd)
    // 处理其他MDX特有的组件
    .replace(
      /<([A-Z][a-zA-Z]*)\s+([^>]*)\/>/g,
      (match, componentName, props) => `<!-- ${componentName} component with props: ${props.trim()} -->`,
    );

  // 创建新的文件名格式：组件名+框架.md
  const newMdFilePath = path.join(outputDir, `${componentName}-${framework}.md`);

  // Write the MD file
  fs.writeFileSync(newMdFilePath, mdContent);
}

// 复制指定目录下的md文件到输出目录，并添加前缀
function copyMdFilesWithPrefix() {
  console.log('Starting to copy files with prefix...');

  copyDirectories.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      console.log(`Directory does not exist: ${dir}`);
      return;
    }

    try {
      // 获取目录的最后一层名称作为前缀
      const dirName = path.basename(dir);
      const files = fs.readdirSync(dir);
      files.forEach((file) => {
        if (file.endsWith('.md') || file.endsWith('.mdx')) {
          const sourcePath = path.join(dir, file);
          const fileName = path.basename(file);
          const destPath = path.join(outputDir, `${dirName}-${fileName}`);

          fs.copyFileSync(sourcePath, destPath);
          console.log(`Copied and prefixed: ${fileName} -> ${dirName}-${fileName}`);
        }
      });
    } catch (error) {
      console.error(`Error copying files from ${dir}:`, error);
    }
  });

  console.log('Finished copying files with prefix.');
}

// Find all MDX files in the components directory
glob(`${baseDir}/**/*.mdx`)
  .then((files) => {
    console.log(`Found ${files.length} MDX files to convert.`);

    // Convert each MDX file to MD
    files.forEach(convertMdxToMd);

    // Copy and prefix additional MD files
    copyMdFilesWithPrefix();

    console.log('Conversion complete!');
  })
  .catch((err) => {
    console.error('Error finding MDX files:', err);
  });

import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';

const findAndProcessFiles = (rootDir: string): Record<string, string> => {
  const allTypes: Record<string, string> = {};
  const filePaths: string[] = [];

  const findFiles = (dir: string) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        findFiles(fullPath);
      } else if (entry.isFile() && fullPath.endsWith('.ts')) {
        filePaths.push(fullPath);
      }
    }
  };

  findFiles(rootDir);

  const program = ts.createProgram(filePaths, { allowJs: true });
  const checker = program.getTypeChecker();

  const visit = (node: ts.Node) => {
    // Stencil will automatically handle type alias declarations
    // So we only parse interface declarations
    if (ts.isInterfaceDeclaration(node)) {
      const symbol = checker.getSymbolAtLocation(node.name);
      if (symbol) {
        const typeName = symbol.getName();
        const typeText = node.getText().replace(/^export/, "");
        allTypes[typeName] = typeText.trim();
      }
    }
    ts.forEachChild(node, visit);
  };

  for (const sourceFile of program.getSourceFiles()) {
    if (!sourceFile.isDeclarationFile && filePaths.includes(sourceFile.fileName)) {
      ts.forEachChild(sourceFile, visit);
    }
  }

  return allTypes;
};

const entitiesDir = path.resolve(import.meta.dirname, '..', 'src/entities');
const extractedTypes = findAndProcessFiles(entitiesDir);
const outputPath = path.resolve(import.meta.dirname, '..', 'docs', 'entities.json');

fs.writeFileSync(outputPath, JSON.stringify(extractedTypes, null, 2));

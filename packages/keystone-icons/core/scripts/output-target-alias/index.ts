import fs from 'node:fs';
import path from 'node:path';
import { format } from 'prettier';
import prettierConfig from '../../../../../.prettierrc.js';
import type { OutputTargetCustom } from '@stencil/core/internal';

interface AliasOutputTargetConfig {
  /**
   * Path to the output alias file
   */
  aliasFile: string;
  /**
   * Path to the proxy file that contains the icon components
   */
  proxyFile: string;
  /**
   * Mapping of original icon names to their aliases
   */
  aliasMapping: Record<string, string[]>;
}

/**
 * Creates a custom Stencil output target that generates icon alias exports
 * This allows multiple icon names to reference the same implementation
 */
export default ({ aliasFile, proxyFile, aliasMapping }: AliasOutputTargetConfig): OutputTargetCustom => {
  return {
    type: 'custom',
    name: 'alias-output-target',
    taskShouldRun: 'onBuildOnly',
    generator: async () => {
      const file: string[] = [];

      const aliasDir = path.dirname(aliasFile);
      const resolveImportPath = path.relative(aliasDir, proxyFile);
      const normalizedImportPath = normalizeImportPath(resolveImportPath);
      // Process each alias mapping to generate export statements
      // For each alias, create re-exports for all its mapped names
      Object.entries(aliasMapping).forEach(([alias, mappings]) => {
        const aliasIconName = capitalize(`ks-icon-${alias}`);

        file.push(
          ...mappings.map(
            (mapping) =>
              `export { ${aliasIconName} as ${capitalize(`ks-icon-${mapping}`)} } from '${normalizedImportPath}';`,
          ),
        );
      });

      // Format the generated export statements using prettier
      const formattedFile = await format(file.join('\n'), { ...prettierConfig, parser: 'typescript' });

      // Write the formatted exports to the alias file
      fs.writeFileSync(aliasFile, formattedFile, { encoding: 'utf-8' });
    },
  };
};

const capitalize = (str: string): string =>
  str
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

const normalizeImportPath = (pathname: string) => {
  const normalizedPath = pathname.startsWith('.') ? pathname : `./${pathname}`;
  return normalizedPath.replace(/\.ts$/, '');
};

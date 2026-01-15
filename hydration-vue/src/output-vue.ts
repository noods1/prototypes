import path from 'path';
import type { OutputTargetVue, PackageJSON } from './types';
import type { BuildCtx, CompilerCtx, ComponentCompilerMeta, Config, OutputTargetDist } from '@stencil/core/internal';
import { createComponentDefinition } from './generate-vue-component';
import { normalizePath, readPackageJson, relativeImport, sortBy, dashToPascalCase } from './utils';

export async function vueProxyOutput(
  config: Config,
  compilerCtx: CompilerCtx,
  outputTarget: OutputTargetVue,
  components: ComponentCompilerMeta[],
  buildConfig: BuildCtx['config'],
) {
  const filteredComponents = getFilteredComponents(outputTarget, components);
  const rootDir = config.rootDir as string;
  const pkgData = await readPackageJson(rootDir);

  const { esModules = false } = outputTarget;

  if (esModules) {
    const finalTextMap = generateProxiesMap(
      config,
      filteredComponents,
      pkgData,
      outputTarget,
      rootDir,
      buildConfig.extras.tagNameTransform,
    );
    await compilerCtx.fs.writeFiles(finalTextMap);
  } else {
    const finalText = generateProxies(
      config,
      filteredComponents,
      pkgData,
      outputTarget,
      rootDir,
      buildConfig.extras.tagNameTransform,
    );
    await compilerCtx.fs.writeFile(outputTarget.proxiesFile, finalText);
  }
  await copyResources(config, outputTarget);
}

function getFilteredComponents(outputTarget: OutputTargetVue, cmps: ComponentCompilerMeta[]) {
  return sortBy<ComponentCompilerMeta>(cmps, (cmp: ComponentCompilerMeta) => cmp.tagName)
    .filter((c: ComponentCompilerMeta) => !outputTarget.excludeComponents?.includes(c.tagName) && !c.internal)
    .filter((component) => {
      if (outputTarget.includeDependency) {
        return true;
      } else {
        return !component.isCollectionDependency;
      }
    });
}

export function generateProxies(
  config: Config,
  components: ComponentCompilerMeta[],
  pkgData: PackageJSON,
  outputTarget: OutputTargetVue,
  rootDir: string,
  tagNameTransform?: boolean,
) {
  const distTypesDir = path.dirname(pkgData.types);
  const dtsFilePath = path.join(rootDir, distTypesDir, GENERATED_DTS);
  const componentsTypeFile = relativeImport(outputTarget.proxiesFile, dtsFilePath, '.d.ts');
  const pathToCorePackageLoader = getPathToCorePackageLoader(config, outputTarget);
  // get when `includeImportCustomElements` is true, the elements path.
  const dirPath = outputTarget.includeImportCustomElements ? `/${outputTarget.customElementsDir || 'components'}` : '';

  const imports = `/* eslint-disable */
/* tslint:disable */
/* auto-generated vue proxies */
import { defineContainer } from './vue-component-lib/utils';\n
type Modify<T extends PropertyKey> = T extends \`onKs\${infer R}\` ? \`on\${R}\` : T

type RemoveKs<T> = {
  [K in keyof T as Modify<K>]: T[K]
}
`;

  const generateTypeImports = () => {
    if (outputTarget.componentCorePackage !== undefined) {
      return `import type { ${IMPORT_TYPES} } from '${normalizePath(outputTarget.componentCorePackage)}${dirPath}';\n`;
    }
    return `import type { ${IMPORT_TYPES} } from '${normalizePath(componentsTypeFile)}';\n`;
  };

  const typeImports = generateTypeImports();

  let sourceImports = '';
  let registerCustomElements = '';

  if (outputTarget.includeImportCustomElements && outputTarget.componentCorePackage !== undefined) {
    const cmpImports = components.map((component) => {
      const pascalImport = dashToPascalCase(component.tagName);

      return `import { defineCustomElement as define${pascalImport} } from '${normalizePath(
        outputTarget.componentCorePackage!,
      )}${dirPath}/${component.tagName}.js';`;
    });

    sourceImports = cmpImports.join('\n');
  } else if (outputTarget.includePolyfills && outputTarget.includeDefineCustomElements) {
    sourceImports = `import { ${APPLY_POLYFILLS}, ${REGISTER_CUSTOM_ELEMENTS} } from '${pathToCorePackageLoader}';\n`;
    registerCustomElements = `${APPLY_POLYFILLS}().then(() => ${REGISTER_CUSTOM_ELEMENTS}());`;
  } else if (!outputTarget.includePolyfills && outputTarget.includeDefineCustomElements) {
    sourceImports = `import { ${REGISTER_CUSTOM_ELEMENTS} } from '${pathToCorePackageLoader}';\n`;
    registerCustomElements = `${REGISTER_CUSTOM_ELEMENTS}();`;
  }

  const exportsAllFromComponentCorePackage = '';
  // if(outputTarget.componentCorePackage !== undefined) {
  //   exportsAllFromComponentCorePackage = `export * from '${normalizePath(outputTarget.componentCorePackage)}${dirPath}';\n`
  // }

  const final: string[] = [
    imports,
    typeImports,
    sourceImports,
    registerCustomElements,
    exportsAllFromComponentCorePackage,
    components
      .map(
        createComponentDefinition(
          IMPORT_TYPES,
          outputTarget.componentModels,
          outputTarget.includeImportCustomElements,
          undefined,
          outputTarget.tagNameSuffix || '',
          tagNameTransform,
        ),
      )
      .join('\n'),
  ];

  return final.join('\n') + '\n';
}

export function generateProxiesMap(
  config: Config,
  components: ComponentCompilerMeta[],
  pkgData: PackageJSON,
  outputTarget: OutputTargetVue,
  rootDir: string,
  tagNameTransform?: boolean,
) {
  const { outDir } = outputTarget;

  if (!outDir) {
    throw new Error('outDir not provided!');
  }

  const distTypesDir = path.dirname(pkgData.types);
  const dtsFilePath = path.join(rootDir, distTypesDir, GENERATED_DTS);
  const componentsTypeFile = relativeImport(outputTarget.proxiesFile, dtsFilePath, '.d.ts');
  const pathToCorePackageLoader = getPathToCorePackageLoader(config, outputTarget);
  // get when `includeImportCustomElements` is true, the elements path.
  const dirPath = outputTarget.includeImportCustomElements ? `/${outputTarget.customElementsDir || 'components'}` : '';

  const imports = `/* eslint-disable */
/* tslint:disable */
/* auto-generated vue proxies */
import { defineContainer } from '../vue-component-lib/utils';\n
type Modify<T extends PropertyKey> = T extends \`onKs\${infer R}\` ? \`on\${R}\` : T

type RemoveKs<T> = {
  [K in keyof T as Modify<K>]: T[K]
}
`;

  const generateTypeImports = () => {
    if (outputTarget.componentCorePackage !== undefined) {
      return `import type { ${IMPORT_TYPES} } from '${normalizePath(outputTarget.componentCorePackage)}${dirPath}';\n`;
    }
    return `import type { ${IMPORT_TYPES} } from '${normalizePath(componentsTypeFile)}';\n`;
  };

  const typeImports = generateTypeImports();

  return components.reduce<Record<string, string>>((proxiesMap, component) => {
    let sourceImport = '';
    let registerCustomElement = '';

    const pascalName = dashToPascalCase(component.tagName);

    if (outputTarget.includeImportCustomElements && outputTarget.componentCorePackage !== undefined) {
      sourceImport = `import { defineCustomElement as define${pascalName} } from '${normalizePath(
        outputTarget.componentCorePackage!,
      )}${dirPath}/${component.tagName}.js';`;
    } else if (outputTarget.includePolyfills && outputTarget.includeDefineCustomElements) {
      sourceImport = `import { ${APPLY_POLYFILLS}, ${REGISTER_CUSTOM_ELEMENTS} } from '${pathToCorePackageLoader}';\n`;
      registerCustomElement = `${APPLY_POLYFILLS}().then(() => ${REGISTER_CUSTOM_ELEMENTS}());`;
    } else if (!outputTarget.includePolyfills && outputTarget.includeDefineCustomElements) {
      sourceImport = `import { ${REGISTER_CUSTOM_ELEMENTS} } from '${pathToCorePackageLoader}';\n`;
      registerCustomElement = `${REGISTER_CUSTOM_ELEMENTS}();`;
    }

    const exportsAllFromComponentCorePackage = '';

    return {
      ...proxiesMap,
      [path.join(outDir, `${pascalName}.ts`)]: [
        imports,
        typeImports,
        sourceImport,
        registerCustomElement,
        exportsAllFromComponentCorePackage,
        createComponentDefinition(
          IMPORT_TYPES,
          outputTarget.componentModels,
          outputTarget.includeImportCustomElements,
          outputTarget.esModules,
          outputTarget.tagNameSuffix || '',
          tagNameTransform,
        )(component),
      ].join('\n'),
    };
  }, {});
}

async function copyResources(config: Config, outputTarget: OutputTargetVue) {
  if (!config.sys || !config.sys.copy || !config.sys.glob) {
    throw new Error('stencil is not properly initialized at this step. Notify the developer');
  }
  const srcDirectory = path.join(__dirname, '..', 'vue-component-lib');
  const destDirectory = path.join(path.dirname(outputTarget.proxiesFile), 'vue-component-lib');

  return config.sys.copy(
    [
      {
        src: srcDirectory,
        dest: destDirectory,
        keepDirStructure: false,
        warn: false,
        ignore: [],
      },
    ],
    srcDirectory,
  );
}

export function getPathToCorePackageLoader(config: Config, outputTarget: OutputTargetVue) {
  const basePkg = outputTarget.componentCorePackage || '';
  const distOutputTarget = config.outputTargets?.find((o) => o.type === 'dist') as OutputTargetDist;

  const distAbsEsmLoaderPath =
    distOutputTarget?.esmLoaderPath && path.isAbsolute(distOutputTarget.esmLoaderPath)
      ? distOutputTarget.esmLoaderPath
      : null;

  const distRelEsmLoaderPath =
    config.rootDir && distAbsEsmLoaderPath ? path.relative(config.rootDir, distAbsEsmLoaderPath) : null;

  const loaderDir = outputTarget.loaderDir || distRelEsmLoaderPath || DEFAULT_LOADER_DIR;
  return normalizePath(path.join(basePkg, loaderDir));
}

export const GENERATED_DTS = 'components.d.ts';
const IMPORT_TYPES = 'JSX';
const REGISTER_CUSTOM_ELEMENTS = 'defineCustomElements';
const APPLY_POLYFILLS = 'applyPolyfills';
const DEFAULT_LOADER_DIR = '/dist/loader';

import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
import { vueOutputTarget } from '@byted-keystone/vue-output-target';
import { transTagNameOfStencilCustomElements } from '@bytedance-dev/rollup-plugin-dealwith-stencil-custom-elements';
import aliasOutputTarget from './scripts/output-target-alias';

import AliasJson from './alias.json';
import PackageJson from './package.json';

const componentCorePackage = PackageJson.name;

export const config: Config = {
  namespace: 'keystone-icons',
  sourceMap: true,
  extras: {
    tagNameTransform: true,
    enableImportInjection: true,
  },
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      dir: 'components',
      customElementsExportBehavior: 'single-export-module',
      generateTypeDeclarations: true,
      includeGlobalScripts: false,
    },
    reactOutputTarget({
      componentCorePackage,
      proxiesFile: '../react/src/components.ts',
      includeImportCustomElements: true,
      includeDefineCustomElements: false,
      includePolyfills: false,
    }),
    vueOutputTarget({
      componentCorePackage,
      proxiesFile: '../vue/src/components.ts',
      includeImportCustomElements: true,
      includeDefineCustomElements: false,
      includePolyfills: false,
    }),
    aliasOutputTarget({
      aliasMapping: AliasJson,
      aliasFile: '../react/src/alias.ts',
      proxyFile: '../react/src/components.ts',
    }),
    aliasOutputTarget({
      aliasMapping: AliasJson,
      aliasFile: '../vue/src/alias.ts',
      proxyFile: '../vue/src/components.ts',
    }),
  ],
  testing: {
    browserHeadless: 'new',
  },
  rollupPlugins: {
    after: [transTagNameOfStencilCustomElements()],
  },
};

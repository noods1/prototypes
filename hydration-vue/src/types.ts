import type { CompilerCtx, ComponentCompilerMeta, Config } from '@stencil/core/internal';

export interface OutputTargetVue {
  componentCorePackage?: string;
  esModules?: boolean;
  outDir?: string;
  proxiesFile: string;
  excludeComponents?: string[];
  componentModels?: ComponentModelConfig[];
  loaderDir?: string;
  includePolyfills?: boolean;
  includeDefineCustomElements?: boolean;
  includeImportCustomElements?: boolean;
  customElementsDir?: string;
  /*
   * 导出依赖组件库，入业务组件库导出业务组件库 + 基础组件库
   */
  includeDependency?: boolean;
  plugins?: Array<
    (
      config: Config,
      compilerCtx: CompilerCtx,
      outputTarget: OutputTargetVue,
      components: ReadonlyArray<ComponentCompilerMeta>,
    ) => void
  >;
  tagNameSuffix?: string;
}

export interface ComponentModelConfig {
  elements: string | string[];
  event: string;
  targetAttr: string;
  externalEvent?: string;
}

export interface PackageJSON {
  types: string;
}

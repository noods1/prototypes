import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { inlineSvg } from 'stencil-inline-svg';
import { reactOutputTarget as react } from '@byted-keystone/react-output-target';
import { vueOutputTarget as vue } from '@byted-keystone/vue-output-target';
import PackageJson from './package.json';
import image from '@rollup/plugin-image';
import { postcss } from '@stencil-community/postcss';
import url from 'postcss-url';
import generator from './scripts/build-json-types';
import {
  transTagNameOfStencilCustomElements,
  outputDefineAllHelperOfStencilCustomElements,
} from '@bytedance-dev/rollup-plugin-dealwith-stencil-custom-elements';

const excludeComponents = [
  'ks-rc-upload',
  'ks-picker-base',
  'ks-pick-presenter',
  'ks-multiple-picker-base',
  'ks-calendar-event',
  'ks-calendar-year',
  'ks-calendar-month',
  'ks-calendar-header',
  'ks-inner-slider',
  'ks-dots',
  'ks-arrow-pagination',
  'ks-arrow-button-group',
  'ks-arrow-button',
  'ks-cascader-searchlist',
  'ks-year-panel',
  'ks-multiple-year-panel',
  'ks-week-panel',
  'ks-multiple-week-panel',
  'ks-month-panel',
  'ks-multiple-month-panel',
  'ks-date-panel',
  'ks-multiple-date-panel',
  'ks-date-range-panel',
  'ks-date-comparison-panel',
  'ks-select',
  'ks-select-option',
  'ks-select-option-group',
  'ks-time-range-panel',
  'ks-time-panel',
  'ks-upload-list',
  'ks-pagination-jumper',
];

export const config: Config = {
  namespace: 'keystone',
  sourceMap: true,
  plugins: [
    sass(),
    inlineSvg(),
    postcss({
      plugins: [url({ url: 'inline' })],
    }),
  ],
  globalStyle: 'src/globalstyle/index.scss',
  globalScript: 'src/globalscript/index.ts',
  invisiblePrehydration: false,
  taskQueue: 'immediate',
  extras: {
    enableImportInjection: true, // https://stenciljs.com/docs/config-extras#experimentalimportinjection
    tagNameTransform: true,
  },
  testing: {
    browserArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
    moduleNameMapper: {},
    setupFilesAfterEnv: ['./fixture/jest.js'],
    testPathIgnorePatterns: ['/node_modules/', '/.history/', '/dist/', '/__test__/', '/__tests__/'],
    reporters: [
      'default',
      [
        'jest-junit',
        {
          outputDirectory: './reports/',
          outputName: 'js-test-results.xml',
        },
      ],
    ],
    collectCoverageFrom: ['src/components/**/*', 'src/utils/**/*', '!src/components/*-legacy/**/*'],
  },
  outputTargets: [
    react({
      outDir: '../react/src/components',
      excludeComponents: excludeComponents,
      customElementsDir: 'dist/components',
      esModules: true,
      aliasEventNames: (eventName) =>
        eventName.replace(/^ks([A-Z])(\w*)$/, (_, first, rest) => first.toLowerCase() + rest),
    }),
    vue({
      componentCorePackage: PackageJson.name,
      proxiesFile: '../vue/src/components.ts',
      esModules: true,
      outDir: '../vue/src/components',
      customElementsDir: 'dist/components',
      includeImportCustomElements: true,
      excludeComponents: excludeComponents,
      componentModels: [
        {
          elements: [
            'ks-input',
            'ks-radio-group',
            'ks-checkbox-group',
            'ks-cascader',
            'ks-multiple-cascader',
            'ks-input-number',
            'ks-textarea',
            'ks-day-picker',
            'ks-year-picker',
            'ks-month-picker',
            'ks-week-picker',
            'ks-multiple-date-picker',
            'ks-multiple-year-picker',
            'ks-multiple-month-picker',
            'ks-multiple-week-picker',
            'ks-date-panel',
            'ks-year-panel',
            'ks-month-panel',
            'ks-week-panel',
            'ks-multiple-date-panel',
            'ks-multiple-year-panel',
            'ks-multiple-month-panel',
            'ks-multiple-week-panel',
            'ks-date-range-picker',
            'ks-date-range-panel',
            'ks-date-comparison-panel',
            'ks-date-comparison-picker',
            'ks-time-picker',
            'ks-time-panel',
            'ks-time-range-picker',
            'ks-time-range-panel',
            'ks-date-time-picker',
            'ks-select',
          ],
          event: 'ksChange',
          targetAttr: 'value',
        },
        {
          elements: ['ks-modal', 'ks-drawer', 'ks-popconfirm', 'ks-popover'],
          event: 'ksChange',
          targetAttr: 'visible',
        },
        {
          elements: ['ks-radio', 'ks-checkbox', 'ks-switch', 'ks-tile'],
          event: 'ksChange',
          targetAttr: 'checked',
        },
      ],
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'single-export-module',
    },
    {
      type: 'docs-custom',
      generator,
    },
    {
      type: 'www',
      serviceWorker: null,
      copy: [{ src: '**/*.html' }, { src: '**/*.css' }],
    },
  ],
  rollupPlugins: {
    before: [image()],
    after: [
      // 包装stencil输出目标为dist-custom-elements的组件名，通过自定义标签后缀以解决多库冲突
      transTagNameOfStencilCustomElements(),
      // 基于stencil输出目标为dist-custom-elements的define all 帮助文件。
      outputDefineAllHelperOfStencilCustomElements(),
    ],
  },
  rollupConfig: {
    inputOptions: {
      // 注意：三方 npm 包依赖最好设为 external，否则代码被合并打包后，其中的副作用可能会受 Stencil 较为激进的 tree-shaking 设置影响失效
      // [FIXME] External modules will be missing from the bundle, which will cause E2E test failed.
      external: process.env.NODE_ENV === 'test' ? [] : ['@oddbird/popover-polyfill'],
    },
  },
};

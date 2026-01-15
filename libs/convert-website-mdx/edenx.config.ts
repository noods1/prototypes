import { moduleTools, defineConfig } from '@edenx/module-tools';

export default defineConfig({
  plugins: [moduleTools()],
  buildConfig: [
    {
      format: 'cjs',
      target: 'es6',
      buildType: 'bundle',
      outDir: './dist/lib',
      dts: false,
    },
    {
      format: 'esm',
      target: 'es6',
      buildType: 'bundle',
      outDir: './dist/es',
      dts: false,
    },
    {
      buildType: 'bundle',
      dts: { only: true, distPath: './types' },
    },
  ],
});

const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const { trimStart, camelCase } = require('lodash');

const typeTemplate = `import type {
  JsonDocsProp,
  JsonDocsEvent,
  JsonDocsPart,
  JsonDocsSlot,
  JsonDocsMethod,
  JsonDocsMethodReturn,
} from '@stencil/core/internal';

export interface JsonDocsKeystoneComponent {
  props: JsonDocsProp[];
  events: JsonDocsEvent[];
  parts: JsonDocsPart[];
  slots: JsonDocsSlot[];
  methods: (JsonDocsMethod & {
    returnsType: JsonDocsMethodReturn['type'];
    returnsDocs: JsonDocsMethodReturn['docs'];
  })[];
}
`;

/**
 * @param {import('@stencil/core/internal').JsonDocs} jsonDocs
 */
module.exports = function run(jsonDocs) {
  const cwdPath = process.cwd();
  const generatedTypesPath = path.resolve(cwdPath, 'docs/json');
  const typesEntryPath = path.resolve(generatedTypesPath, 'index.ts');

  if (fs.existsSync(generatedTypesPath)) {
    fs.rmdirSync(generatedTypesPath, { recursive: true });
  }

  fs.mkdirSync(generatedTypesPath, { recursive: true });
  fs.writeFileSync(path.resolve(generatedTypesPath, 'types.ts'), typeTemplate, { encoding: 'utf-8' });
  fs.writeFileSync(typesEntryPath, `export type * from './types';\n`, { encoding: 'utf-8' });

  jsonDocs.components.forEach(async (component) => {
    const { tag, props, events, methods, parts, slots } = component;
    const componentType = {
      props,
      events: (events || []).map(({ event, ...rest }) => ({
        event: camelCase(trimStart(event, 'ks')),
        ...rest,
      })),
      parts,
      slots,
      methods: (methods || [])
        .map((method) => ({
          ...method,
          returnsType: method.returns.type,
          returnsDocs: method.returns.docs,
        }))
        .filter((method) => {
          return !method.name?.startsWith?.('_');
        }),
    };

    const componentTypePath = path.resolve(generatedTypesPath, `${tag}.ts`);
    const file = await prettier.format(
      `import type { JsonDocsKeystoneComponent } from './types';\n\n` +
        `const type: JsonDocsKeystoneComponent = ${JSON.stringify(componentType, null, 2)};\n\n` +
        `export default type;`,
      {
        singleQuote: true,
        trailingComma: 'all',
        printWidth: 120,
        parser: 'babel-ts',
      },
    );
    fs.writeFileSync(componentTypePath, file, 'utf-8');

    const componentTypeName = camelCase(tag + '-type');
    const exportComponentTypeName = componentTypeName[0].toUpperCase() + componentTypeName.slice(1);
    fs.appendFileSync(typesEntryPath, `export { default as ${exportComponentTypeName} } from './${tag}';\n`);
  });
};

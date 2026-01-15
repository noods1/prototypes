import { dashToPascalCase } from './utils';
import { ComponentCompilerMeta } from '@stencil/core/internal';
import { ComponentModelConfig } from './types';

export const createComponentDefinition =
  (
    importTypes: string,
    componentModelConfig: ComponentModelConfig[] | undefined,
    includeCustomElement = false,
    exportDefault = false,
    tagNameSuffix = '',
    tagNameTransform = false,
  ) =>
  (cmpMeta: Pick<ComponentCompilerMeta, 'properties' | 'tagName' | 'methods' | 'events'>) => {
    const tagNameAsPascal = dashToPascalCase(cmpMeta.tagName);
    const importAs = includeCustomElement ? 'define' + tagNameAsPascal : 'undefined';

    const componentProps = cmpMeta.properties?.map((prop) => `'${prop.name}'`) || [];

    const nameArg = `'${cmpMeta.tagName}${tagNameSuffix}'`;
    const defineCustomElementArg = importAs;
    const componentPropsArg = `[\n  ${[
      ...componentProps,
      ...(cmpMeta.events?.map((event) => `'${event.name}'`) || []),
    ].join(',\n  ')}\n]`;
    let modelPropArg = '';
    let modelUpdateEventArg = '';
    let externalModelUpdateEventArg = '';
    const tagNameTransformArg = typeof tagNameTransform === 'boolean' ? String(tagNameTransform) : '';

    const componentType = `${importTypes}.${tagNameAsPascal}`;
    const findModel =
      componentModelConfig && componentModelConfig.find((config) => config.elements.includes(cmpMeta.tagName));
    const modelType = findModel !== undefined ? `, ${componentType}["${findModel.targetAttr}"]` : '';

    if (findModel) {
      const targetProp = findModel.targetAttr;

      /**
       * If developer is trying to bind v-model support to a component's
       * prop, but that prop was not defined, warn them of this otherwise
       * v-model will not work as expected.
       */
      if (!componentProps.includes(`'${targetProp}'`)) {
        console.warn(
          `Your '${cmpMeta.tagName}' component is configured to have v-model support bound to '${targetProp}', but '${targetProp}' is not defined as a property on the component. v-model integration may not work as expected.`,
        );
      }
      modelPropArg = `'${targetProp}'`;
      modelUpdateEventArg = `'${findModel.event}'`;

      if (findModel.externalEvent) {
        externalModelUpdateEventArg = `'${findModel.externalEvent}'`;
      }
    }

    const defineContainerArgs = [
      nameArg,
      defineCustomElementArg,
      componentPropsArg,
      modelPropArg,
      modelUpdateEventArg,
      externalModelUpdateEventArg,
      tagNameTransformArg,
    ].map((arg) => (arg.trim().length ? arg : 'undefined'));

    let templateString = `
export const ${tagNameAsPascal} = /*@__PURE__*/ defineContainer<RemoveKs<${componentType}>${modelType}>(${defineContainerArgs.join(', ')});\n`;

    if (exportDefault) {
      templateString += `\nexport default ${tagNameAsPascal};\n`;
    }

    return templateString;
  };

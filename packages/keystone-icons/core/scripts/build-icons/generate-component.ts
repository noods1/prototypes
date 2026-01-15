import { camelCase, kebabCase, upperFirst, replace } from 'lodash-es';
import { SVGParser } from './svg-parser';
import type { ComponentProp, ComponentEvent } from './types';

export const getComponentTagName = (name: string) => `ks-icon-${kebabCase(name)}`;

export const getComponentClassName = (name: string) => upperFirst(camelCase(getComponentTagName(name)));

export const getComponentProps = (svg: string): ComponentProp[] => {
  const props: ComponentProp[] = [
    { name: 'size', type: 'string | number', defaultValue: 16 },
    { name: 'color', type: 'string', defaultValue: 'currentColor' },
    { name: 'strokeWidth', type: 'string | number', comment: '@deprecated' },
    { name: 'absoluteStrokeWidth', type: 'boolean', defaultValue: false, comment: '@deprecated' },
  ];

  const parser = new SVGParser(svg);
  props.push(
    ...parser.parseMacroColors().map(({ name, value }) => ({
      name,
      type: 'string',
      defaultValue: value,
    })),
  );

  return props;
};

export const getComponentEvents = (svg: string): ComponentEvent[] =>
  new SVGParser(svg).parseDataClickAttributes().map((value) => ({
    name: value,
    returns: 'void',
  }));

/**
 * @todo Remove this.
 */
const RTL_ICONS = [
  'logout',
  'sign-in',
  'refresh',
  'redo',
  'undo',
  'export',
  'volume-mute',
  'volume-up',
  'volume-down',
  'filled-volume-mute',
  'filled-volume-up',
  'filled-volume-down',
  'browser-window',
  'change-user',
  'engage',
  'message',
  'local',
  'announcement',
  'shopping-cart',
  'payment',
  'notes',
  'hamburger',
  'help',
  'filled-help',
  'log',
  'calendar',
  'folder',
  'all-application',
  'bulleted-list',
  'filter',
  'folder-add',
  'folder-subtract',
  'format-text',
  'copy-content',
  'layout',
  'unmarked-flag',
  'marked-flag',
  'add-flag',
  'wand',
  'lead-generation',
  'document-file',
  'flag',
  'bookmarked',
  'card-list',
];
export const getComponentHostClassName = (name: string) =>
  ['ks-icon'].concat(RTL_ICONS.includes(name) ? 'ks-icon--rtlable' : []).join(' ');

export const getComponentElement = (svg: string) => {
  const parser = new SVGParser(svg);
  const element = parser
    .replaceWidthAndHeight()
    .replaceColorWithVariables()
    .replaceStrokeWidth()
    .replaceDataClickAttributes();
  return replace(element.svg.toString(), /\"\{([^}]+)\}\"/g, (match) => match.slice(1, -1));
};

export const getComponentStyleUrls = (name: string) => {
  const styleUrls: string[] = ['../styles/index.css'];
  if (name === 'loading') {
    styleUrls.push('../styles/spin.css');
  }

  return styleUrls;
};

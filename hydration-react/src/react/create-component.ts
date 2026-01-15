import type { EventNames, SlotNames, Options, ReactWebComponent, WebComponentProps } from './lib/create-component';
import { createComponent as createComponentWrapper } from './lib/create-component';
import { createComponent as createContextComponentWrapper } from './lib/create-context-component';
import { generateSortId } from './utils';

import type { RenderToString } from './ssr';

export type StencilReactComponent<
  I extends HTMLElement,
  E extends EventNames = {},
  S extends SlotNames = {},
> = ReactWebComponent<I, E, S>;

type DefineCustomElement =
  | {
      tagNameTransform: false;
      defineCustomElement: () => void;
    }
  | {
      tagNameTransform: true;
      defineCustomElement: (transTagName: (tagName: string, isDynamic?: boolean) => string) => void;
    };

/**
 * Defines a custom element and creates a React component.
 * @public
 */
export const createComponent = <I extends HTMLElement, E extends EventNames = {}, S extends SlotNames = {}>({
  tagNameTransform,
  defineCustomElement,
  ...options
}: Options<I, E, S> & DefineCustomElement) => {
  if (typeof defineCustomElement !== 'undefined') {
    const sortId = generateSortId();
    tagNameTransform
      ? defineCustomElement((tagName, isDynamic) => (!isDynamic && tagNameTransform ? `${tagName}-${sortId}` : tagName))
      : defineCustomElement();
    options.tagName = tagNameTransform ? `${options.tagName}-${sortId}` : options.tagName;
  }
  return createComponentWrapper<I, E, S>({
    ...options,
  });
};

/**
 * Defines a custom element and creates a React component.
 * @public
 */
export const createContextComponent = <I extends HTMLElement, E extends EventNames = {}, S extends SlotNames = {}>({
  tagNameTransform,
  defineCustomElement,
  ...options
}: Options<I, E, S> & DefineCustomElement) => {
  if (typeof defineCustomElement !== 'undefined') {
    const sortId = generateSortId();
    tagNameTransform
      ? defineCustomElement((tagName, isDynamic) => (!isDynamic && tagNameTransform ? `${tagName}-${sortId}` : tagName))
      : defineCustomElement();
    options.tagName = tagNameTransform ? `${options.tagName}-${sortId}` : options.tagName;
  }
  return createContextComponentWrapper<I, E, S>({
    ...options,
  });
};

/**
 * Defines a custom element and creates a React component for server side rendering.
 * @public
 */
export const createSSRComponent = <I extends HTMLElement, E extends EventNames = {}>({
  hydrateModule,
  properties,
  tagName,
  // tagNameTransform,
}: {
  hydrateModule: Promise<{ renderToString: RenderToString }>;
  properties: Record<string, string>;
  tagName: string;
  tagNameTransform?: boolean;
}): ReactWebComponent<I, E> =>
  /**
   * IIFE to lazy load the `createComponentForServerSideRendering` function while allowing
   * to return the correct type for the `ReactWebComponent`.
   *
   * Note: we want to lazy load the `./ssr` and `hydrateModule` modules to avoid
   * bundling them in the runtime and serving them in the browser.
   */
  (async (props: WebComponentProps<I>) => {
    const { createComponentForServerSideRendering } = await import('./ssr');
    return createComponentForServerSideRendering<I, E>({
      tagName,
      properties,
      renderToString: (await hydrateModule).renderToString,
    })(props as any);
  }) as unknown as ReactWebComponent<I, E>;

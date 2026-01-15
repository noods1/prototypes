/* eslint-disable */
// @ts-nocheck
// It's easier and safer for Volar to disable typechecking and let the return type inference do its job.
import {
  VNode,
  defineComponent,
  getCurrentInstance,
  h,
  provide,
  inject,
  ref,
  Ref,
  isVue3,
  Slots,
  onMounted,
  watch,
  nextTick,
} from 'vue-demi';
/**
 *
 * manually set default value to undefined
 * to suppress Vue injection not found warning in development environment
 */
const injectWithDefault = (value) => inject(value, () => undefined);

export function generateSortId(length = 8) {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
export function getValue(name: string, values: any) {
  if (typeof name !== 'string' || !values) {
    return;
  }
  const nameList = name.split('.') || [];
  name = nameList.shift();
  let value = values?.[name];
  while (nameList.length > 0) {
    name = nameList.shift();
    value = value?.[name];
  }
  return value;
}
export interface InputProps<T> {
  modelValue?: T;
}

const UPDATE_VALUE_EVENT = isVue3 ? 'update:modelValue' : 'input';
const MODEL_VALUE = isVue3 ? 'modelValue' : 'value';
const CUSTOM_VALUE_KEY = 'detail';
const ROUTER_LINK_VALUE = 'routerLink';
const NAV_MANAGER = 'navManager';
const ROUTER_PROP_PREFIX = 'router';
const ARIA_PROP_PREFIX = 'aria';
/**
 * Starting in Vue 3.1.0, all properties are
 * added as keys to the props object, even if
 * they are not being used. In order to correctly
 * account for both value props and v-model props,
 * we need to check if the key exists for Vue <3.1.0
 * and then check if it is not undefined for Vue >= 3.1.0.
 * See https://github.com/vuejs/vue-next/issues/3889
 */
const EMPTY_PROP = Symbol();
const DEFAULT_EMPTY_PROP = { default: EMPTY_PROP };

const CONTEXT_EFFECT = 'contextEffect';

interface NavManager<T = any> {
  navigate: (options: T) => void;
}

const getComponentClasses = (classes: unknown) => (classes as string)?.split(' ') || [];

const getElementClasses = (
  ref: Ref<HTMLElement | undefined>,
  componentClasses: Set<string>,
  defaultClasses: string[] = [],
) =>
  [...Array.from(ref.value?.classList || []), ...defaultClasses].filter(
    (c: string, i, self) => !componentClasses.has(c) && self.indexOf(c) === i,
  );

function convertVue2SlotsToDomSlots(slots: Slots): VNode[] {
  const slotNames = Object.keys(slots);
  const children: VNode[] = [];

  slotNames.forEach((slotName) => {
    const slotVNodes = slots[slotName]?.();
    if (!slotVNodes) return;

    if (slotName === 'default') {
      slotVNodes.forEach((vNode) => children.push(vNode));
    } else {
      slotVNodes.forEach((vNode, index) => {
        if (!vNode.tag) {
          slotVNodes.splice(index, 1, h('span', { attrs: { slot: slotName } }, vNode.text));
        } else {
          if (!vNode.data) vNode.data = {};
          if (!vNode.data.attrs) vNode.data.attrs = {};
          vNode.data.attrs.slot = slotName;
        }
      });
      children.push(slotVNodes);
    }
  });

  return children;
}

const wrapWithSlot = (slotName: string, children: VNode | VNode[]) =>
  h(
    'div',
    {
      key: `${slotName}`,
      style: { display: 'contents' },
      slot: slotName,
      attrs: {
        slot: slotName,
      },
    },
    [children],
  );

const hashedTags = new Set();

/**
 * Create a callback to define a Vue component wrapper around a Web Component.
 *
 * @prop name - The component tag name (i.e. `ion-button`)
 * @prop componentProps - An array of properties on the
 * component. These usually match up with the @Prop definitions
 * in each component's TSX file.
 * @prop customElement - An option custom element instance to pass
 * to customElements.define. Only set if `includeImportCustomElements: true` in your config.
 * @prop modelProp - The prop that v-model binds to (i.e. value)
 * @prop modelUpdateEvent - The event that is fired from your Web Component when the value changes (i.e. ionChange)
 * @prop externalModelUpdateEvent - The external event to fire from your Vue component when modelUpdateEvent fires. This is used for ensuring that v-model references have been
 * correctly updated when a user's event callback fires.
 */
type DefineComponent<T> = (arg: T) => void;
export const defineContainer: DefineComponent = <Props, VModelType = string | number | boolean>(
  name: string,
  defineCustomElement: any,
  componentProps: string[] = [],
  modelProp?: string,
  modelUpdateEvent?: string,
  externalModelUpdateEvent?: string,
  tagNameTransform?: boolean,
) => {
  // @deprecated FIXME urgent prop bugfix, should find better way soon
  const isXInputNumber = name === 'x-input-number';

  /**
   * Create a Vue component wrapper around a Web Component.
   * Note: The `props` here are not all properties on a component.
   * They refer to whatever properties are set on an instance of a component.
   */
  if (defineCustomElement !== undefined) {
    if (tagNameTransform) {
      const sortId = generateSortId();
      hashedTags.add(name);

      defineCustomElement((tagName: string, isDynamic?: boolean) =>
        !isDynamic || hashedTags.has(tagName) ? `${tagName}-${sortId}` : tagName,
      );

      name = `${name}-${sortId}`;
    }

    defineCustomElement();
  }

  const componentClass = customElements.get(name) as any;

  if (componentClass.vModel) {
    modelProp = componentClass.vModel.prop;
    modelUpdateEvent = componentClass.vModel.event;
  }

  // vue2和vue3的composition API还存在一些使用差异，所以在这里重新做个判断来做兼容，这样对已有的Vue3水合层影响最小
  if (isVue3) {
    const container = defineComponent<Props & InputProps<VModelType>>({
      setup: (props, { attrs, slots, emit }) => {
        let modelPropValue = props[modelProp as string];
        const containerRef = ref<HTMLElement>();
        const classes = new Set(getComponentClasses(attrs.class));
        const dynamicChildrenRef = ref(componentClass?.__internal_renderDynamicSlots?.(props, wrapWithSlot)||[]);
        const setDynamicRenderDeps = (value) => dynamicChildrenRef.value = value;
        const contextRef = ref();
        provide('__context__', contextRef);

        watch(contextRef, async () => {
          await nextTick();
          const el = containerRef.value;
          if (el && typeof el[CONTEXT_EFFECT] === 'function') {
            el[CONTEXT_EFFECT]();
          }
        });

        const handleContextChange = (e: CustomEvent) => {
          contextRef.value = e.detail.context;
        };
        const onContextUpdateListener = (vnode: VNode) => {
          if (vnode.el) {
            vnode.el.addEventListener('context-change', handleContextChange);
          }
        };

        const emitKsEvent = (name: string, e: Event) => {
          const detail = e[CUSTOM_VALUE_KEY];
          if (detail && detail._isDetailArgs) {
            emit(name, ...detail);
          } else {
            emit(name, detail);
          }
        }

        const onVnodeBeforeMount = (vnode: VNode) => {
          // Add a listener to tell Vue to update the v-model
          if (vnode.el) {
            if (modelUpdateEvent) {
              const eventsNames = Array.isArray(modelUpdateEvent) ? modelUpdateEvent : [modelUpdateEvent];
              eventsNames.forEach((eventName: string) => {
                vnode.el!.addEventListener(eventName, (e: Event) => {
                  emitKsEvent(UPDATE_VALUE_EVENT, e);

                  /**
                   * We need to emit the change event here
                   * rather than on the web component to ensure
                   * that any v-model bindings have been updated.
                   * Otherwise, the developer will listen on the
                   * native web component, but the v-model will
                   * not have been updated yet.
                   */
                  if (externalModelUpdateEvent) {
                    emit(externalModelUpdateEvent, e);
                  }
                });
              });
            }

            const nonModelEvent = componentProps.filter((item) => item.startsWith('ks'));
            nonModelEvent.forEach((eventName: string) => {
              vnode.el!.addEventListener(eventName, (e: Event) => {
                emitKsEvent(`${eventName.substring(2).charAt(0).toLowerCase()}${eventName.slice(3)}`, e);
              });
            });
            onContextUpdateListener(vnode);
          }
        };

        const currentInstance = getCurrentInstance();
        const hasRouter = currentInstance?.appContext?.provides[NAV_MANAGER];
        const navManager: NavManager | undefined = hasRouter ? inject(NAV_MANAGER) : undefined;
        const handleRouterLink = (ev: Event) => {
          const { routerLink } = props;
          if (routerLink === EMPTY_PROP) return;

          if (navManager !== undefined) {
            const navigationPayload: any = { event: ev };
            for (const key in props) {
              const value = props[key];
              if (
                Object.prototype.hasOwnProperty.call(props, key) &&
                key.startsWith(ROUTER_PROP_PREFIX) &&
                value !== EMPTY_PROP
              ) {
                navigationPayload[key] = value;
              }
            }

            navManager.navigate(navigationPayload);
          } else {
            console.warn('Tried to navigate, but no router was found. Make sure you have mounted Vue Router.');
          }
        };

        return () => {
          modelPropValue = props[modelProp as string];

          getComponentClasses(attrs.class).forEach((value) => {
            classes.add(value);
          });

          const oldClick = props.onClick;
          const handleClick = (ev: Event) => {
            if (oldClick !== undefined) {
              oldClick(ev);
            }
            if (!ev.defaultPrevented) {
              handleRouterLink(ev);
            }
          };

          let propsToAdd: any = {
            ref: containerRef,
            class: getElementClasses(containerRef, classes),
            onClick: handleClick,
            onVnodeBeforeMount,
          };

          propsToAdd.wrapWithSlot = wrapWithSlot;
          propsToAdd.setDynamicRenderDeps = setDynamicRenderDeps;
          /**
           * We can use Object.entries here
           * to avoid the hasOwnProperty check,
           * but that would require 2 iterations
           * where as this only requires 1.
           */
          for (const key in props) {
            const value = props[key];
            if (
              (Object.prototype.hasOwnProperty.call(props, key) && value !== EMPTY_PROP) ||
              key.startsWith(ARIA_PROP_PREFIX)
            ) {
              propsToAdd[key] = value;
            } else if (value === EMPTY_PROP) {
              if (key === 'filled') {
                propsToAdd[key] = true;
              }
            }
          }

          if (modelProp) {
            /**
             * If form value property was set using v-model
             * then we should use that value.
             * Otherwise, check to see if form value property
             * was set as a static value (i.e. no v-model).
             */
            if (props[MODEL_VALUE] !== EMPTY_PROP) {
              propsToAdd = {
                ...propsToAdd,
                [modelProp]: props[MODEL_VALUE],
              };
            } else if (modelPropValue !== EMPTY_PROP) {
              propsToAdd = {
                ...propsToAdd,
                [modelProp]: modelPropValue,
              };
            }
          }

          const children: VNode[] = [];
          slots.default && children.push(slots.default());

          children.push(
            ...(dynamicChildrenRef.value || []),
          );

          return h(name, propsToAdd, children);
        };
      },
    });

    container.displayName = name;

    container.props = {
      [ROUTER_LINK_VALUE]: DEFAULT_EMPTY_PROP,
    };

    componentProps.forEach((componentProp) => {
      container.props[componentProp] = DEFAULT_EMPTY_PROP;
    });

    if (modelProp) {
      container.props[MODEL_VALUE] = DEFAULT_EMPTY_PROP;
      container.emits = [UPDATE_VALUE_EVENT, externalModelUpdateEvent];
    }

    return container;
  } else {
    const container = defineComponent<Props & InputProps<VModelType>>({
      setup: (props, { attrs, slots, emit }) => {
        let modelPropValue = props[modelProp as string];
        const containerRef = ref<HTMLElement>();
        const classes = new Set(getComponentClasses(attrs.class));

        const currentInstance = getCurrentInstance();
        const hasRouter = currentInstance?.appContext?.provides[NAV_MANAGER];
        const navManager: NavManager | undefined = hasRouter ? inject(NAV_MANAGER) : undefined;
        const handleRouterLink = (ev: Event) => {
          const { routerLink } = props;
          if (routerLink === EMPTY_PROP) return;

          if (navManager !== undefined) {
            const navigationPayload: any = { event: ev };
            for (const key in props) {
              const value = props[key];
              if (
                Object.prototype.hasOwnProperty.call(props, key) &&
                key.startsWith(ROUTER_PROP_PREFIX) &&
                value !== EMPTY_PROP
              ) {
                navigationPayload[key] = value;
              }
            }

            navManager.navigate(navigationPayload);
          } else {
            console.warn('Tried to navigate, but no router was found. Make sure you have mounted Vue Router.');
          }
        };

        const dynamicChildrenRef = ref(componentClass?.__internal_renderDynamicSlots?.(props, wrapWithSlot)|| []);
        const setDynamicRenderDeps = (value) => dynamicChildrenRef.value = value;
        const contextRef = ref();

        onMounted(() => {
          containerRef?.value?.addEventListener('context-change', (e) => {
            contextRef.value = e.detail.context;
          });
        });

        watch(contextRef, () => {
          nextTick(() => {
            const el = containerRef.value;
            if (el && typeof el[CONTEXT_EFFECT] === 'function') {
              el[CONTEXT_EFFECT]();
            }
          });
        });

        const emitKsEvent = (name: string, e: Event) => {
          const detail = e[CUSTOM_VALUE_KEY];
          if (detail && detail._isDetailArgs) {
            emit(name, ...detail);
          } else {
            emit(name, detail);
          }
        }

        return () => {
          modelPropValue = props[modelProp as string];

          getComponentClasses(attrs.class).forEach((value) => {
            classes.add(value);
          });

          const oldClick = props.onClick;
          const handleClick = (ev: Event) => {
            if (oldClick !== undefined) {
              oldClick(ev);
            }
            if (!ev.defaultPrevented) {
              handleRouterLink(ev);
            }
          };

          const propsToAdd: any = {
            ref: containerRef,
            class: getElementClasses(containerRef, classes),
            onClick: handleClick,
            domProps: {},
            on: {},
          };

          const eventsNames = Array.isArray(modelUpdateEvent) ? modelUpdateEvent : [modelUpdateEvent];
          eventsNames.forEach((eventName) => {
            propsToAdd.on[eventName] = (e: Event) => {
              emitKsEvent(UPDATE_VALUE_EVENT, e);
              if (externalModelUpdateEvent) {
                emit(externalModelUpdateEvent, e);
              }
            };
          });
          const { $listeners } = currentInstance.proxy;
          const nonModelEvent = componentProps.filter((item) => item.startsWith('ks'));
          Object.keys($listeners).forEach((eventName) => {
            const ksEventName = `ks${eventName.charAt(0).toUpperCase()}${eventName.slice(1)}`;
            if (eventName !== UPDATE_VALUE_EVENT) {
              if (propsToAdd.on[ksEventName]) {
                propsToAdd.on[ksEventName] = [
                  propsToAdd.on[ksEventName],
                  (e) => {
                    emitKsEvent(eventName, e);
                  },
                ].flat();
              } else if (nonModelEvent.includes(ksEventName)) {
                propsToAdd.on[ksEventName] = (e) => {
                  emitKsEvent(eventName, e);
                };
              } else {
                propsToAdd.on[eventName] = $listeners[eventName];
              }
            }
          });

          /**
           * We can use Object.entries here
           * to avoid the hasOwnProperty check,
           * but that would require 2 iterations
           * where as this only requires 1.
           */
          if (injectWithDefault('__context__') !== undefined) {
            propsToAdd.context = injectWithDefault('__context__').value;
          }

          for (const key in props) {
            const value = props[key];
            if (key === 'value' && value !== EMPTY_PROP) {
              // Temp patch for Vue2 dom patch bug of force conversion of `.value` to string
              // https://github.com/vuejs/vue/blob/223a9e9f2ecf013e6ee5dbf98cbaa8cadf9daf50/src/platforms/web/runtime/modules/dom-props.ts#L46
              // Also see packages/keystone-ui/core/src/utils/decorators/vue2ValueFix.ts
              propsToAdd.domProps._valueFix = value;
            } else if (
              (Object.prototype.hasOwnProperty.call(props, key) && value !== EMPTY_PROP) ||
              key.startsWith(ARIA_PROP_PREFIX)
            ) {
              propsToAdd.domProps[key] = value;
            } else if (isXInputNumber && value === EMPTY_PROP) {
              if (key === 'disabled') {
                propsToAdd.domProps[key] = false;
              } else if (key === 'filled') {
                propsToAdd.domProps[key] = true;
              }
            }
          }

          propsToAdd.domProps.wrapWithSlot = wrapWithSlot;
          propsToAdd.domProps.setDynamicRenderDeps = setDynamicRenderDeps;

          if (modelProp) {
            /**
             * If form value property was set using v-model
             * then we should use that value.
             * Otherwise, check to see if form value property
             * was set as a static value (i.e. no v-model).
             */
            if (props[MODEL_VALUE] !== EMPTY_PROP) {
              propsToAdd.domProps = {
                ...propsToAdd.domProps,
                // Temp patch for Vue2 dom patch bug of force conversion of `.value` to string
                // https://github.com/vuejs/vue/blob/223a9e9f2ecf013e6ee5dbf98cbaa8cadf9daf50/src/platforms/web/runtime/modules/dom-props.ts#L46
                // Also see packages/keystone-ui/core/src/utils/decorators/vue2ValueFix.ts
                [modelProp === 'value' ? '_valueFix' : 'value']: props[MODEL_VALUE],
              };
            } else if (modelPropValue !== EMPTY_PROP) {
              propsToAdd.domProps = {
                ...propsToAdd.domProps,
                // Temp patch for Vue2 dom patch bug of force conversion of `.value` to string
                // https://github.com/vuejs/vue/blob/223a9e9f2ecf013e6ee5dbf98cbaa8cadf9daf50/src/platforms/web/runtime/modules/dom-props.ts#L46
                // Also see packages/keystone-ui/core/src/utils/decorators/vue2ValueFix.ts
                [modelProp === 'value' ? '_valueFix' : 'value']: modelPropValue,
              };
            }
          }

          const children = convertVue2SlotsToDomSlots(slots);
          children.push(
            ...(dynamicChildrenRef.value ||[]),
          );


          return h(name, propsToAdd, children);
        };
      },
    });

    container.displayName = name;

    container.props = {
      [ROUTER_LINK_VALUE]: DEFAULT_EMPTY_PROP,
    };

    componentProps.forEach((componentProp) => {
      container.props[componentProp] = DEFAULT_EMPTY_PROP;
    });

    if (modelProp) {
      container.props[MODEL_VALUE] = DEFAULT_EMPTY_PROP;
      container.emits = [UPDATE_VALUE_EVENT, externalModelUpdateEvent];
    }

    return container;
  }
};

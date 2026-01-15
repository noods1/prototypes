import { Component, h, Prop, Host } from '@stencil/core';
import { dir, zIndexFromStore } from '@src/utils/utils';

const prefix = 'toast-box';

@Component({
  tag: 'ks-toast-box',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsToastBox {
  ['ks-name'] = 'ks-toast-box';
  /**
   * @locale {en} The z-index of the toast box container. If not provided, a default value from the store will be used.
   * @locale {zh} 浮层通知容器的 z-index。如果未提供，将使用来自存储的默认值。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() zIndex: number;

  render() {
    return (
      <Host dir={dir()} ks-toast-box>
        <div dir={dir()} class={`${prefix}__wrap`} style={{ zIndex: `${this.zIndex ?? zIndexFromStore.message}` }}>
          <div class={`${prefix}`}>
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}

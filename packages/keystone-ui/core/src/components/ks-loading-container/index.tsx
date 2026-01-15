import { Component, h, Prop, Host, ComponentInterface } from '@stencil/core';
import { dir } from '@src/utils/utils';

const prefix = 'loading-container';
/**
 * @slot loading - loading component
 */
@Component({
  tag: 'ks-loading-container',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsLoadingContainer implements ComponentInterface {
  /**
   *  @locale {en} Whether to show loading
   *  @locale {zh} 是否展示 loading
   */
  @Prop() loading = false;

  render() {
    return (
      <Host dir={dir()} ks-loading-container>
        <div
          class={prefix}
          style={{
            opacity: this.loading ? '0' : '1',
          }}
        >
          <slot></slot>
        </div>
        {this.loading && (
          <div class={`${prefix}__loading`}>
            <slot name="loading"></slot>
          </div>
        )}
      </Host>
    );
  }
}

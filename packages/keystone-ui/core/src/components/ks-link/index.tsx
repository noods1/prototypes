import { Component, h, Prop, ComponentInterface, Host, Element } from '@stencil/core';
import classnames from 'classnames';
import { dir } from '@src/utils/utils';
import { registerPluginManager } from '@src/utils/plugin';
import { sendActionTracking } from '@src/utils/tracking';
import { LinkSize, LinkTarget, LinkVariant } from '../../entities';

const prefix = 'link';

@Component({
  tag: 'ks-link',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsLink implements ComponentInterface {
  ['ks-name'] = 'ks-link';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsLinkElement;
  /**
   * @locale {en} The index of the link, similar to the HTML native `tabindex` attribute, used to manage the focus order.
   * @locale {zh} 链接的索引，与 HTML 原生属性 `tabindex` 类似，用于管理焦点顺序。
   */
  @Prop({ attribute: 'tabindex' }) index = 0;
  /**
   * @locale {en} The size of the link component. Options include 'sm' for small and 'md' for medium.
   * @locale {zh} 链接组件的大小。选项包括 `"sm"` 和 `"md"`。
   */
  @Prop() size: LinkSize = 'inherit';
  /**
   * @locale {en} The visual variant of the link. Can be one of the following values: `"primary"`, `"support"`, `"neutral"`、`"neutralHigh"`, `"success"`, `"warning"`, `"error"` or `"info"`
   * @locale {zh} 链接的视觉变体。可选值包括：`"primary"`、`"support"`、`"neutral"`、`"neutralHigh"`、`"success"`、`"warning"`、`"error"` 或 `"info"`。
   */
  @Prop() variant: LinkVariant = 'primary';
  /**
   * @locale {en} Indicates whether the link is disabled. When `true`, the link will not be clickable.
   * @locale {zh} 指示链接是否禁用。当值为 `true` 时，链接不可点击。
   */
  @Prop() disabled = false;
  /**
   * @locale {en} Specifies where to open the linked document. Can be one of the following values: `_self`, `_blank`, `_parent` or `_top`. This property is effective only when `href` is also provided.
   * @locale {zh} 指定打开链接文档的位置。可选值包括：`_self`、`_blank`、`_parent` 或 `_top`。此属性仅在同时提供了 `href` 时生效。
   */
  @Prop() target: LinkTarget = '_self';
  /**
   * @locale {en} The URL of the linked document. This is where the link points to.
   * @locale {zh} 链接文档的 URL。这是链接指向的地址。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() href: string;

  /** The display style of the link. */
  @Prop() display: 'inline' | 'inline-block' = 'inline-block';

  /**
   * @locale {en} The `rel` attribute passed to the `<a>` tag, commonly used to set security parameters like `noreferrer`.
   * @locale {zh} 传递给 `<a>` 标签的 `rel` 属性，常用于设置如 `noreferrer` 等安全参数。
   */
  @Prop() rel?: string;

  constructor() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    registerPluginManager(this.el);
  }

  render() {
    const cls = classnames(prefix, `${prefix}--${this.size}`, `${prefix}--${this.variant}`, {
      [`${prefix}--disabled`]: this.disabled,
      [`${prefix}--inline`]: this.display === 'inline',
    });
    return (
      <Host dir={dir()} ks-link ks-display={this.display} role="link" aria-disabled={this.disabled ? 'true' : null}>
        <a
          dir={dir()}
          class={cls}
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          tabindex={this.disabled ? null : this.index}
          target={this.href && this.target}
          href={this.disabled ? undefined : this.href}
          part="self"
          aria-disabled={!!this.disabled}
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          onClick={(event) => {
            if (this.disabled) {
              event.preventDefault();
              event.stopImmediatePropagation();
              event.stopPropagation();
              return false;
            }
            if (typeof this.href === 'string') {
              sendActionTracking(this.el, { eventType: 'link', componentParams: { href: this.href } });
            } else {
              sendActionTracking(this.el, {
                eventType: 'click',
                componentParams: { text: this.el.textContent },
              });
            }
          }}
          {...(this.rel ? { rel: this.rel } : {})}
          data-testid="ks-link-index-nsmWAN"
        >
          <slot></slot>
        </a>
      </Host>
    );
  }
}

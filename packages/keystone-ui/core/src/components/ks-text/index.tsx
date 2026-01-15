import { Component, Prop, h, Host, Element, State } from '@stencil/core';
import { dir, removeChildNodes } from '@src/utils/utils';
import { Theme } from '../../entities';
import { KsTextVariant } from '../../entities/components/text';
import { Slot, Slots } from '@src/utils/decorators';
import { Placement } from '@floating-ui/dom';
import { parseRichTextString } from '@src/components/ks-text/richTextParser';

const X_NAME = 'ks-text';
const DEFAULT_PLACEMENT = 'top';

/**
 * @slot definition - Slot for content to be displayed inside the definition hint tooltip.
 */
@Component({
  tag: 'ks-text',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsText {
  ['ks-name']: string = X_NAME;
  // eslint-disable-next-line no-undef
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() textContainerEl: HTMLKsTextElement;

  /**
   * @locale {en} The placement of the tooltip (shown when `ellipsis` is active and text overflows) relative to the text element. Can be one of the following values:
   * `top`, `right`, `bottom`, `left`, `top-start`, `top-end`,
   * `right-start`, `right-end`, `bottom-start`, `bottom-end`,
   * `left-start` or `left-end`.
   * @locale {zh} 当 `ellipsis` 属性激活且文本溢出时显示的工具提示（tooltip）相对于文本元素的位置。可选值包括
   * `top`、`right`、`bottom`、`left`、`top-start`、`top-end`、
   * `right-start`、`right-end`、`bottom-start`、`bottom-end`、
   * `left-start` 或 `left-end`。
   */
  @Prop() placement: Placement = DEFAULT_PLACEMENT;
  /**
   * @locale {en} To render text by passing a rich text string, it currently only supports parsing <a> tags in the text,
   * such as `You can <a href="help.com">learn more</a>.`
   * @locale {zh} 是否通过传递富文本字符串的形式渲染文本，目前只支持解析文案中的 <a> 标签，如 `You can <a href="help.com">learn more</a>.`
   */
  @Prop() richTextString = '';
  /**
   * @locale {en} Typography variant for different text styles. Can be one of the following values:
   * `headlineLg`, `headlineMd`, `headlineSm`, `titleLg`, `titleMd`, `titleSm`,
   * `bodyLg`, `bodyMd`, `bodySm`, `labelLg`, `labelMd`, `labelSm`.
   * @locale {zh} 不同文本样式的排版变体。可以是以下值之一：
   * `headlineLg`、`headlineMd`、`headlineSm`、`titleLg`、`titleMd`、`titleSm`、
   * `bodyLg`、`bodyMd`、`bodySm`、`labelLg`、`labelMd`、`labelSm`。
   */
  @Prop() variant: KsTextVariant = 'bodyMd';
  /**
   * @locale {en} Theme of the text, which sets the color based on the provided theme. Can be one of the following values:
   * `"default"`, `"primary"`, `"support"`, `"error"`, `"warning"`, `"success"`, `"info"`, `"neutral"`, `"neutralHigh"`, `"neutralLow"`.
   * @locale {zh} 文本的主题，设置基于指定主题的颜色。可以是以下值之一：
   * `"default"`、`"primary"`、`"support"`、`"error"`、`"warning"`、`"success"`、`"info"`、`"neutral"`、`"neutralHigh"`、`"neutralLow"`。
   */
  @Prop() theme: Theme = 'default';
  /**
   * @locale {en} Determines if the text should be truncated with an ellipsis.
   * Can be either:
   * - A boolean: when `true`, the text is truncated with an ellipsis if it exceeds the container width.
   * - An object:
   *   - `tooltip`: when `true`, a tooltip will display the full text on hover.
   *   - `maxline` (optional): the maximum number of lines before truncating the text.
   * @locale {zh} 决定是否应该使用省略号截断文本。
   * 可以是以下两种形式：
   * - 布尔值：当 `true` 时，如果文本超出容器宽度，将被截断并显示省略号。
   * - 对象：
   *   - `tooltip`：当 `true` 时，鼠标悬停时会显示完整文本的工具提示。
   *   - `maxline`（可选）：指定最大行数，超过该行数后文本将被截断。
   */
  @Prop() ellipsis: boolean | { tooltip: boolean; maxline?: number } = false;
  /**
   * @locale {en} Indicates whether to highlight the tooltip (shown when `ellipsis` is active and text overflows). When `true`, the tooltip will have a highlighted appearance.
   * @locale {zh} 指示是否高亮当 `ellipsis` 属性激活且文本溢出时显示的工具提示（tooltip）。当为 `true` 时，工具提示将呈现高亮效果。
   */
  @Prop() highLight = false;

  /**
   * @locale {en} Set the `definition` prop will style the text as a definition term, and show a tooltip when hovered, with the content of `definition` prop.
   * @locale {zh} 设置后组件将以下划线样式作为一个定义术语展示，并且在悬停时会显示一个工具提示展示 `definition` 属性的内容。
   */
  @Prop() definition?: string;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ rootname: 'textContainerEl', slotname: '_default' }) defaultSlots: Slots;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ rootname: 'textContainerEl', slotname: 'definition' }) definitionSlots: Slots;

  defaultSlotEl?: HTMLSlotElement;

  popoverContentEl?: HTMLElement;

  @State() hasOverflow = false;

  get enableEllipsisTooltip(): boolean {
    return Boolean(typeof this.ellipsis === 'object' ? this.ellipsis.tooltip : this.ellipsis);
  }

  tooltipEl?: HTMLKsTooltipElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  showTooltipTimer: ReturnType<typeof setTimeout>;
  onPointerEnterTextContent = () => {
    if (!this.enableEllipsisTooltip) {
      return;
    }

    const { scrollHeight, clientHeight, scrollWidth, clientWidth } = this.textContainerEl;
    this.hasOverflow = scrollHeight > clientHeight || scrollWidth > clientWidth;
    if (this.hasOverflow) {
      this.showTooltipTimer = setTimeout(() => {
        this.updatePopoverContent();
        this.tooltipEl?.open();
      }, 200);
    }
  };
  onPointerLeaveTextContent = () => {
    clearTimeout(this.showTooltipTimer);
  };

  updatePopoverContent = (el = this.popoverContentEl) => {
    this.popoverContentEl = el;
    if (this.popoverContentEl) {
      // TODO performance optimization: don't clone if just pointerover for a short time and won't show tooltip
      // TODO use @slot instead of native lookup after it supports TextNode
      removeChildNodes(this.popoverContentEl);
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.defaultSlotEl.assignedNodes().forEach((node) => {
        const dom = document.createElement('div');
        dom.appendChild(node.cloneNode(true));
        dom.setAttribute('style', 'word-break: break-word;white-space: break-spaces;');
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        this.popoverContentEl.appendChild(dom);
      });
    }
  };

  renderRichTextString() {
    return parseRichTextString(this.richTextString)
      .map((node) => {
        if (typeof node === 'object') {
          if (node.tag === 'a') {
            return (
              <ks-link {...node.attrs} target="_blank">
                {node.content}
              </ks-link>
            );
          }
        }
        return node;
      })
      .filter(Boolean);
  }

  renderText() {
    const text = (
      <slot ref={(el) => (this.defaultSlotEl = el as HTMLSlotElement)}>
        {this.richTextString && this.renderRichTextString()}
      </slot>
    );

    if (this.definition || this.definitionSlots) {
      return (
        <ks-tooltip elementContext="floating" hideOnAnchorExit={true}>
          {text}
          <div class="tooltip-content" slot="content">
            <slot name="definition">{this.definition}</slot>
          </div>
        </ks-tooltip>
      );
    } else {
      return text;
    }
  }

  render() {
    const shouldRenderHoverTooltip =
      !this.definition &&
      !this.definitionSlots &&
      this.hasOverflow &&
      (this.ellipsis === true || (typeof this.ellipsis === 'object' && this.ellipsis.tooltip));
    const maxline = typeof this.ellipsis === 'object' ? this?.ellipsis?.maxline : false;
    return (
      <Host
        dir={dir()}
        ks-text
        ks-variant={this.variant || 'bodyMd'}
        ks-theme={this.theme || 'default'}
        ks-ellipsis={this.ellipsis ? '' : undefined}
        ks-maxline={maxline ? true : undefined}
        ks-definition={Boolean(this.definition || this.definitionSlots)}
        style={maxline ? { '-webkit-line-clamp': maxline.toString() } : {}}
        onPointerenter={this.onPointerEnterTextContent}
        onPointerleave={this.onPointerLeaveTextContent}
        data-testid="ks-text-index-o9Z3fb"
      >
        {this.renderText()}
        {shouldRenderHoverTooltip && (
          <ks-tooltip
            ref={(el) => (this.tooltipEl = el)}
            size="auto"
            trigger="hover"
            placement={this.placement}
            highLight={this.highLight}
            hideOnAnchorExit={true}
            enterDelay={200}
            anchorEl={() => this.textContainerEl}
            style={{ visibility: this.hasOverflow ? undefined : 'hidden' }}
          >
            <div
              class="tooltip-content"
              style={{
                // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
                mixBlendMode: this.highLight && 'difference',
              }}
              slot="content"
              ref={this.updatePopoverContent}
            ></div>
          </ks-tooltip>
        )}
      </Host>
    );
  }
}

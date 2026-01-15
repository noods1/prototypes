import { Component, Host, h, Prop } from '@stencil/core';
import { dir } from '@src/utils/utils';
import type { TimelineItem } from '../../entities';

const prefix = 'timeline';

@Component({
  tag: 'ks-timeline',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsTimeline {
  ['ks-name'] = 'ks-timeline';

  /**
   * @locale {en} The index of the currently active timeline item. Indicates which item is highlighted as active.
   * @locale {zh} 当前激活的时间轴项的索引。指示哪个项被高亮为激活状态。
   */
  @Prop() active = 0;
  /**
   * @locale {en} An array of timeline items. Each item should have a `title` and may optionally include a `description` and `content`.
   * @locale {zh} 时间轴项的数组。每个项应具有 `title`，并可以选择性地包含 `description` 和 `content`。
   */
  @Prop() items: TimelineItem[] = [];
  /**
   * @locale {en} Indicates whether the timeline as a whole is disabled.
   * @locale {zh} 指示Timeline整体是否被禁用。
   */
  @Prop() disabled = false;
  /**
   * @locale {en} Indicates the overall status of the Timeline.
   * @locale {zh} 指示Timeline整体的状态。
   */
  @Prop() status: 'default' | 'error' = 'default';

  render() {
    return (
      <Host dir={dir()} ks-timeline>
        <div dir={dir()} class={{ [prefix]: true, [`${prefix}__disabled`]: this.disabled }} part="self">
          {this.items.map(({ title, description, content, disabled, status = 'default' }, index) => (
            <div
              key={index}
              class={{
                [`${prefix}__item`]: true,
                [`${prefix}__item--active`]: this.active === index,
                [`${prefix}__item--complete`]: this.active > index,
                // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
                [`${prefix}__item--disabled`]: this.disabled || disabled,
                [`${prefix}__item--${this.status === 'default' ? status : this.status}`]: true,
              }}
              data-testid={`ks-timeline-index-w6MokP-${index}`}
            >
              <div class={`${prefix}__item-bar`} />
              <div class={`${prefix}__item-wrapper`}>
                <div class={`${prefix}__item-title`}>
                  <span class={`${prefix}__item-indicator`} />
                  {title}
                </div>
                <div class={`${prefix}__item-description`}>{description}</div>
                <div class={`${prefix}__item-content`}>{content}</div>
              </div>
            </div>
          ))}
        </div>
      </Host>
    );
  }
}

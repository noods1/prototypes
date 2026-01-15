import { Component, h, Prop, Element, Host } from '@stencil/core';
import { dir } from '@src/utils/utils';

const prefix = 'skeleton-tile';

@Component({
  tag: 'ks-skeleton-tile',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsSkeletonTile {
  ['x-name'] = 'ks-skeleton-tile';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsSkeletonTileElement;

  /**
   * @locale {en} The overall width of the skeleton tile container (e.g., "100px", "50%").
   * @locale {zh} 骨架屏瓦片容器的整体宽度（例如 "100px", "50%"）。
   */
  @Prop() width = '';

  /**
   * @locale {en} The number of body text lines to render in the skeleton tile, excluding the title line.
   * @locale {zh} 在骨架屏瓦片中渲染的主体文本行数，不包括标题行。
   */
  @Prop() rows = 2;

  /**
   * @locale {en} The width of the title line within the skeleton tile (e.g., "80px", "30%").
   * @locale {zh} 骨架屏瓦片中标题行的宽度（例如 "80px", "30%"）。
   */
  @Prop() titleWidth = '80px';

  render() {
    // const cls = classnames('ks-skeleton', prefix, `${prefix}`);
    return (
      <Host dir={dir()} x-name="ks-skeleton">
        {/* @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf */}
        <div class={prefix} style={this.width ? { width: this.width } : null}>
          <ks-skeleton-text width={this.titleWidth} type="title" size="lg" />
          {Array.from({ length: this.rows }).map(() => (
            <ks-skeleton-text width="100%" type="body" size="md" />
          ))}
        </div>
      </Host>
    );
  }
}

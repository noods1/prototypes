import { BulletinDataType } from '@src/entities/components/bulletin-tile';
import { Component, ComponentInterface, Host, h, Prop, Event, EventEmitter, Element } from '@stencil/core';
import classNames from 'classnames';
import { sendActionTracking } from '@src/utils/tracking';
import { registerPluginManager } from '@src/utils/plugin';

const prefix = 'bulletin-tile';

@Component({
  shadow: true,
  styleUrl: 'index.scss',
  tag: 'ks-bulletin-tile',
})
export class KsBulletinTile implements ComponentInterface {
  ['ks-name'] = 'ks-bulletin-tile';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsBulletinTileElement;
  /**
   * @locale {en} An array of data objects used to render each bulletin slide. Each object should conform to the BulletinDataType structure, typically including 'key', 'image', 'title', 'content', and 'buttons'.
   * @locale {zh} 用于渲染每个公告幻灯片的数据对象数组。每个对象应符合 BulletinDataType 结构，通常包括 'key'、'image'、'title'、'content' 和 'buttons'。
   */
  @Prop() dataSource: BulletinDataType[] = [];
  /**
   * @locale {en} Specifies how the image within each bulletin slide should be resized to fit its container. 'cover' scales the image to maintain its aspect ratio while filling the element’s entire content box. 'contain' scales the image to maintain its aspect ratio while fitting within the element’s content box.
   * @locale {zh} 指定每个公告幻灯片中的图片应如何调整大小以适应其容器。“cover”会缩放图片以保持其宽高比，同时填充元素的整个内容框。“contain”会缩放图片以保持其宽高比，同时使其适应元素的内容框。
   */
  @Prop() imageMode: 'contain' | 'cover' = 'cover';
  /**
   * @locale {en} Emitted when a button within a bulletin slide is clicked. The event detail contains the 'key' of the slide, the 'text' of the clicked button, and the 'index' of the button within its slide's button array.
   * @locale {zh} 当公告幻灯片中的按钮被点击时触发。事件详情包含幻灯片的 'key'、被点击按钮的 'text' 以及按钮在其幻灯片按钮数组中的 'index'。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksButtonClick: EventEmitter<{
    key: string | number;
    text: string;
    index: number;
  }>;

  constructor() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    registerPluginManager(this.el);
  }

  render() {
    const classes = classNames(`${prefix}`);
    return (
      <Host ks-bulletin-tile>
        <div class={classes}>
          <ks-carousel
            bulletinMode
            dots={this.dataSource.length > 1}
            arrows={this.dataSource.length > 1 ? 'overlay' : false}
          >
            {this.dataSource.map((item) => (
              <ks-carousel-item key={item.key} data-testid={`ks-bulletin-tile-index-fcfRiy-${item.key}`}>
                <div class={classNames(`${prefix}-item`)}>
                  <img src={item.image} style={{ 'object-fit': this.imageMode }} alt="" />
                  <div class="content-card">
                    <div class={{ content: true, 'has-dot': this.dataSource.length > 1 }}>
                      <div class="title">
                        <ks-text variant="titleLg">{item.title}</ks-text>
                      </div>
                      <div class="body">
                        <ks-text variant="bodyMd" theme="neutral">
                          {item.content}
                        </ks-text>
                      </div>
                    </div>
                    <div class="buttons">
                      {item.buttons.map((button, index) => (
                        <ks-button
                          onClick={() => {
                            this.ksButtonClick.emit({ key: item.key, text: button.text, index });
                            sendActionTracking(this.el, {
                              eventType: 'click',
                              subEventType: 'button',
                              componentParams: { text: button.text },
                            });
                          }}
                          variant={button.variant}
                          data-testid="ks-bulletin-tile-index-cw1uiy"
                        >
                          {button.text}
                        </ks-button>
                      ))}
                    </div>
                  </div>
                </div>
              </ks-carousel-item>
            ))}
          </ks-carousel>
        </div>
      </Host>
    );
  }
}

import { Component, h, Prop, ComponentInterface, State, Watch, Host, Fragment } from '@stencil/core';
import classnames from 'classnames';
import { UploadFile } from '../../../entities';
import { getBase64, dir } from '@src/utils/utils';

const prefix = 'upload-list';

const getFileIcon = (type: string) => {
  if (type?.startsWith('image')) {
    return <ks-icon-picture slot="icon" />;
  } else if (type?.startsWith('audio')) {
    return <ks-icon-music slot="icon" />;
  } else if (type?.startsWith('video')) {
    return <ks-icon-video-clip slot="icon" />;
  } else {
    return <ks-icon-folder slot="icon" />;
  }
};

@Component({
  tag: 'ks-upload-list',
  styleUrl: 'upload-list.scss',
  shadow: true,
})
export class KsUploadList implements ComponentInterface {
  ['ks-name'] = 'ks-upload-list';
  @Prop() disabled = false;

  @Prop() items: UploadFile[] = [];

  @Prop() size: 'md' | 'sm' = 'md';

  @Prop() onremove?: (file: UploadFile) => void;

  @State() preview = {};

  updatePreviewData() {
    this.items.forEach(async (item) => {
      if (item.type?.startsWith('image')) {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        this.preview[item.uid] = item.url ?? (await getBase64(item.originFileObj));
      }
    });
  }

  componentWillLoad() {
    this.updatePreviewData();
  }

  @Watch('items')
  handleUpdate() {
    this.updatePreviewData();
  }

  render() {
    return (
      <Host dir={dir()} ks-upload-list>
        <div dir={dir()} class={prefix}>
          {this.items.map((item) => (
            <Fragment>
              <div
                class={classnames(
                  `${prefix}__item`,
                  `${prefix}__item--${this.size}`,
                  `${prefix}__item--${item.status}`,
                )}
              >
                <div class={`${prefix}__item-thumb`}>
                  {item.status === 'uploading' ? (
                    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
                    <ks-thumbnail size={this.size === 'md' ? 'sm' : 'xs'}>{getFileIcon(item?.type)}</ks-thumbnail>
                  ) : item.type?.startsWith('image') ? (
                    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
                    <ks-thumbnail size={this.size === 'md' ? 'sm' : 'xs'} image={this.preview[item.uid]}></ks-thumbnail>
                  ) : (
                    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
                    <ks-thumbnail size={this.size === 'md' ? 'sm' : 'xs'}>{getFileIcon(item?.type)}</ks-thumbnail>
                  )}
                </div>
                <div class={`${prefix}__item-inner`}>
                  {item.url ? (
                    <a href={item.url} target="_blank" class={`${prefix}__item-name`}>
                      {item.name}
                    </a>
                  ) : (
                    <span class={`${prefix}__item-name`}>{item.name}</span>
                  )}

                  {item.status === 'uploading' && (
                    <ks-progress size="sm" percent={item.percent} showLabel={false}></ks-progress>
                  )}
                </div>
                {!this.disabled && item.status === 'done' && (
                  <div class={`${prefix}__item-success`}>
                    <ks-status-icon variant="success" size={this.size}></ks-status-icon>
                  </div>
                )}

                {!this.disabled && item.status === 'error' && (
                  <div class={`${prefix}__item-error`}>
                    <ks-status-icon variant="error" size={this.size}></ks-status-icon>
                  </div>
                )}

                <div class={`${prefix}__item-close`}>
                  {!this.disabled && (
                    <ks-button
                      size="sm"
                      variant="text"
                      shape="square"
                      onClick={() => this.onremove?.(item)}
                      data-testid="upload-list-upload-list-xjpiXE"
                    >
                      <ks-icon-close size={14} class={`${prefix}__item-delete`} />
                    </ks-button>
                  )}
                </div>
              </div>
              {item.status === 'error' && item.response && (
                <div class={`${prefix}__item-message`}>
                  <ks-status-message variant="error">{item.response}</ks-status-message>
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </Host>
    );
  }
}

/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { Component, h, Prop, Element, ComponentInterface, State, Host, Event, EventEmitter } from '@stencil/core';
import classnames from 'classnames';
import { BeforeUploadHook, UploadFile, UpLoadSize, UploadChangeParam, UploadIconType } from '../../entities';
import { dir, t } from '@src/utils/utils';
import { uploadMessages } from '@fe-infra/keystone-locales';

const prefix = 'upload-drop';

@Component({
  tag: 'ks-upload-drop',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsUploadDrop implements ComponentInterface {
  ['ks-name'] = 'ks-upload-drop';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsUploadDropElement;
  uploadEl?: HTMLKsUploadElement & { isExceededMax?: boolean };

  /**
   * @locale {en} The size of the upload component, Can be one of the following values: `"sm"` or `"md"`.
   * @locale {zh} 上传组件的尺寸。可以是 `"sm"` 或 `"md"`。
   */
  @Prop() size: UpLoadSize = 'md';

  /**
   * @locale {en} The accepted file types for upload, similar to the HTML `accept` attribute.
   * @locale {zh} 接受上传的文件类型，类似于 HTML 的 `accept` 属性。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() accept: string;
  /**
   * @locale {en} The URL where the files will be uploaded.
   * @locale {zh} 文件上传的接口地址。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() action: string;
  /**
   * @locale {en} Additional data sent with the upload request.
   * @locale {zh} 上传时携带的额外参数。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() data: object;
  /**
   * @locale {en} The name attribute value for the files in the upload request, sent to the backend.
   * @locale {zh} 文件上传请求中 files 的 name 值，发送给后端。
   */
  @Prop() name = 'file';
  /**
   * @locale {en} Disables the upload component, preventing file selection or drag-and-drop functionality.
   * @locale {zh} 是否禁用上传组件，禁止选择文件或拖拽上传。
   */
  @Prop() disabled = false;
  /**
   * @locale {en} Whether multiple files can be uploaded at once.
   * @locale {zh} 是否允许同时上传多个文件。
   */
  @Prop() multiple = false;
  /**
   * @locale {en} The headers to be sent along with the upload request.
   * @locale {zh} 上传请求携带的 headers。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() headers: object;
  /**
   * @locale {en} The HTTP method used for the upload request.
   * @locale {zh} 上传请求的 HTTP 方法。
   */
  @Prop() method = 'post';
  /**
   * @locale {en} The current list of files in the upload queue.
   * @locale {zh} 当前上传队列中的文件列表。
   */
  @Prop() fileList: UploadFile[] = [];
  /**
   * @locale {en} The default file list when the component is first rendered.
   * @locale {zh} 组件初次渲染时的默认文件列表。
   */
  @Prop() defaultFileList: UploadFile[] = [];
  /**
   * @locale {en} Whether to display custom messages related to the upload process, such as errors or warnings.
   * @locale {zh} 是否展示与上传过程相关的自定义消息，例如错误或警告。
   */
  @Prop() showMessage = false;
  /**
   * @locale {en} Whether or not to display the uploaded files list.
   * @locale {zh} 是否显示上传文件列表。
   */
  @Prop() showUploadList = true;
  /**
   * @locale {en} A function to be called before the upload process begins, can be used to validate files.
   * @locale {zh} 上传前的回调函数，用于文件验证。
   */
  @Prop() beforeUpload?: BeforeUploadHook;
  /**
   * @locale {en} Custom messages related to the upload process, such as errors or warnings.
   * @locale {zh} 与上传过程相关的自定义消息，例如错误或警告。
   */
  @Prop() message = '';
  /**
   * @locale {en} The width of the upload drop area. Can be a string (e.g. '100px') or number (in pixels).
   * @locale {zh} 上传拖拽区域的宽度。可以是字符串（如 '100px'）或数字（单位为像素）。
   */
  @Prop() width: string | number = 250;
  /**
   * @locale {en} The type of icon to display in the upload area. Can be either 'upload' (default) or 'plus'.
   * @locale {zh} 上传区域显示的图标类型。可以是 'upload'（默认）或 'plus'。
   */
  @Prop() iconType: UploadIconType = 'upload';

  /**
   * @locale {en} Whether to show the instructions text. If set to false, the text part will be hidden.
   * @locale {zh} 是否显示说明文字。如果设置为 false，将隐藏说明文字部分。
   */
  @Prop() hasInstructions = true;

  /**
   * @locale {en} Description related to the upload, such as the types of uploads allowed.
   * @locale {zh} 与上传相关的描述，例如允许上传的类型。
   */
  @Prop() description = '';
  /**
   * @locale {en} The maximum length of the fileList.
   * @locale {zh} 最大文件个数。
   */
  @Prop() maxLength?: number;

  /**
   * @locale {en} Allows custom control of the upload process, overriding the default request behavior.
   * @locale {zh} 允许自定义上传过程，覆盖默认的上传请求行为。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() customRequest: (e: unknown) => void;
  /**
   * @locale {en} A function to be called before a file is removed from the upload queue.
   * @locale {zh} 文件从上传队列中移除前的回调函数。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() beforeRemove: (event: CustomEvent) => boolean | Promise<boolean>;
  /**
   * @locale {en} Custom event emitted when the file list or upload state changes.
   * @locale {zh} 当文件列表或上传状态发生变化时触发的自定义事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksChange: EventEmitter<UploadChangeParam<UploadFile>>;
  /**
   * @locale {en} Custom event emitted when the file upload state errors.
   * @locale {zh} 当文件上传状态发生错误时触发的自定义事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksError: EventEmitter<UploadChangeParam<UploadFile>>;

  @State() highlight = false;

  @State() isError = false;
  @State() isExceededMax = false;

  handleChange = (event: CustomEvent<UploadChangeParam<UploadFile>>) => {
    const { error } = event.detail;
    this.highlight = false;
    if (error) {
      this.isError = true;
      this.ksError.emit(event.detail);
    } else {
      this.isError = false;
    }
    this.ksChange.emit?.(event.detail);
  };

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  handleDragOver(e) {
    e.preventDefault();
    this.highlight = true;
  }

  handleDragLeave() {
    this.highlight = false;
  }

  render() {
    return (
      <Host dir={dir()} ks-upload-drop>
        <div
          onDragEnter={(e) => this.handleDragOver(e)}
          onDragOver={(e) => this.handleDragOver(e)}
          onDragLeave={() => this.handleDragLeave()}
          data-testid="ks-upload-drag-index-bLkPxb"
        >
          <ks-upload
            ref={(el) => (this.uploadEl = el)}
            size={this.size}
            dir={dir()}
            accept={this.accept}
            action={this.action}
            data={this.data}
            name={this.name}
            disabled={this.disabled}
            multiple={this.multiple}
            headers={this.headers}
            method={this.method}
            fileList={this.fileList}
            defaultFileList={this.defaultFileList}
            showUploadList={this.showUploadList}
            beforeRemove={this.beforeRemove}
            beforeUpload={this.beforeUpload}
            onKsChange={this.handleChange}
            customRequest={this.customRequest}
            onKsError={(event) => {
              this.ksError.emit(event.detail);
            }}
            onExceededMaxChange={({ detail }) => (this.isExceededMax = detail)}
            message={this.message}
            showMessage={this.showMessage}
            description={this.description}
            maxLength={this.maxLength}
            data-testid="ks-upload-drag-index-4eqbEm"
          >
            <slot>
              <div
                class={classnames(prefix, `${prefix}--plain`, {
                  [`${prefix}--disabled`]: this.disabled,
                  [`${prefix}--highlight`]: this.highlight,
                  [`${prefix}--error`]: this.isError,
                })}
                style={{ width: typeof this.width === 'string' ? this.width : `${this.width}px` }}
                data-testid="ks-upload-drag-index-8ra1Uc"
              >
                {this.iconType === 'plus' ? (
                  <ks-icon-plus class={`${prefix}__icon`} />
                ) : (
                  <ks-icon-upload class={`${prefix}__icon`} />
                )}

                {this.hasInstructions && (
                  <div class={`${prefix}__text`}>
                    {t(uploadMessages.drop)} <span class={`${prefix}__special-text`}>{t(uploadMessages.click)}</span>
                  </div>
                )}
              </div>
            </slot>
          </ks-upload>
        </div>
      </Host>
    );
  }
}

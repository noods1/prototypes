import {
  Component,
  h,
  Prop,
  Element,
  Fragment,
  ComponentInterface,
  State,
  Host,
  EventEmitter,
  Event,
} from '@stencil/core';
import classnames from 'classnames';
import { getBase64, getImageWxH, dir, t } from '@src/utils/utils';
import { UploadFile, UploadChangeParam, BeforeUploadHook } from '../../entities';
import { logger } from '@src/utils/logger';
import { uploadMessages } from '@fe-infra/keystone-locales';

const prefix = 'upload-avatar';

@Component({
  tag: 'ks-upload-avatar',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsUploadAvatar implements ComponentInterface {
  ['ks-name'] = 'ks-upload-avatar';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  uploadEl;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsUploadAvatarElement;

  /**
   * @locale {en} The accepted file types for upload, similar to the HTML `accept` attribute.
   * @locale {zh} 接受上传的文件类型，类似于 HTML 的 `accept` 属性。
   */
  @Prop() accept = '.png,.jpg,.svg,.gif';
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
   * @locale {en} Custom messages related to the upload process, such as errors or warnings.
   * @locale {zh} 与上传过程相关的自定义消息，例如错误或警告。
   */
  @Prop() message = '';
  /**
   * @locale {en} Description related to the upload, such as the types of uploads allowed.
   * @locale {zh} 与上传相关的描述，例如允许上传的类型。
   */
  @Prop() description = '';
  /**
   * @locale {en} Whether or not to display the uploaded files list.
   * @locale {zh} 是否显示上传文件列表。
   */
  @Prop() showUploadList = false;
  /**
   * @locale {en} A function to be called before the upload process begins, can be used to validate files.
   * @locale {zh} 上传前的回调函数，用于文件验证。
   */
  @Prop() beforeUpload?: BeforeUploadHook;
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

  // @State() percent: number = 0;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @State() file: UploadFile;

  @State() previewUrl = '';

  @State() highlight = false;

  @State() isError = false;

  @State() imgInfo: { width: number; height: number } = { width: 0, height: 0 };

  handleChange = async (event: CustomEvent) => {
    if (this.disabled) return;
    const { detail } = event;
    const { error } = detail;
    this.highlight = false;
    if (error) {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      logger.error(error);
      this.isError = true;
      this.ksError.emit(event.detail);
      return;
    }
    this.isError = false;
    if (this.file?.uid !== event.detail.file.uid) {
      this.previewUrl = '';
    }

    this.file = event.detail.file;

    if (this.file && !this.previewUrl) {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.previewUrl = await getBase64(this.file.originFileObj);
      this.imgInfo = await getImageWxH(this.previewUrl);
    }

    if (event.detail.file.status === 'removed') {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.file = null;
      this.previewUrl = '';
    }

    this.ksChange.emit?.(event.detail);
  };

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  handleDelete = (e) => {
    e.stopPropagation();
    this.uploadEl.handleRemove(this.file);
  };

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  handleDragOver(e) {
    e.preventDefault();
    if (this.disabled) return;
    this.highlight = true;
  }

  handleDragLeave() {
    this.highlight = false;
  }

  renderState = () => {
    const { percent = 10, status } = this.file || {};
    if (status === 'uploading') {
      return (
        <div class={`${prefix}--progressContainer`}>
          <ks-progress size="sm" percent={percent} showLabel={false}></ks-progress>
        </div>
      );
    }
    if (status === 'done') {
      return (
        <div class={classnames(`${prefix}__action`)}>
          <ks-icon-edit />
          <ks-icon-filled-close
            class={`${prefix}__action-close`}
            onClick={this.handleDelete}
            data-testid="ks-upload-image-index-eKqsJe"
          />
        </div>
      );
    }
    return null;
  };

  render() {
    const { status } = this.file || {};
    return (
      <Host dir={dir()} ks-upload-avatar>
        <ks-upload
          dir={dir()}
          ref={(el) => (this.uploadEl = el)}
          accept={this.accept}
          action={this.action}
          data={this.data}
          name={this.name}
          disabled={this.disabled}
          multiple={false}
          headers={this.headers}
          method={this.method}
          fileList={this.fileList}
          defaultFileList={this.defaultFileList}
          showUploadList={this.showUploadList}
          beforeRemove={this.beforeRemove}
          beforeUpload={this.beforeUpload}
          onKsChange={this.handleChange}
          showMessage={this.showMessage}
          message={this.message}
          description={this.description}
          data-testid="ks-upload-image-index-fbq3jt"
        >
          <div
            onDragEnter={(e) => this.handleDragOver(e)}
            onDragOver={(e) => this.handleDragOver(e)}
            onDragLeave={() => this.handleDragLeave()}
            class={classnames(
              prefix,
              `${prefix}--plain`,
              { [`${prefix}--disabled`]: this.disabled },
              this.isError ? `${prefix}--error` : '',
              this.highlight ? `${prefix}--highlight` : '',
            )}
            data-testid="ks-upload-image-index-fAyCCs"
          >
            {status !== 'uploading' && (
              <Fragment>
                <ks-icon-plus />
                <span>{t(uploadMessages.button)}</span>
              </Fragment>
            )}

            {this.previewUrl && (
              <div class={`${prefix}__picture`}>
                <img
                  src={this.previewUrl}
                  class={classnames({ [`${prefix}__picture--vertical`]: this.imgInfo.width < this.imgInfo.height })}
                  alt=""
                />
              </div>
            )}

            {this.renderState()}
          </div>
        </ks-upload>
      </Host>
    );
  }
}

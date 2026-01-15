import {
  Component,
  h,
  Prop,
  Element,
  Watch,
  ComponentInterface,
  State,
  Method,
  Host,
  Event,
  EventEmitter,
} from '@stencil/core';
import classnames from 'classnames';
import { Slot, Slots } from '@src/utils/decorators';
import { BeforeUploadHook, UploadChangeParam, UploadFile, UploadType, UpLoadSize } from '../../entities';
import { dir, t } from '@src/utils/utils';
import { file2Obj, updateFileList, removeFileItem } from '@src/utils/upload/file';
import { isNumber } from 'lodash-es';
import { uploadMessages } from '@fe-infra/keystone-locales';

const prefix = 'upload';

@Component({
  tag: 'ks-upload',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsUpload implements ComponentInterface {
  ['ks-name'] = 'ks-upload';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  uploadEl;
  // eslint-disable-next-line no-undef
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsUploadElement;

  /**
   * @locale {en} The size of the upload file list, Can be one of the following values: `"sm"` or `"md"`.
   * @locale {zh} 上传文件列表的尺寸。可以是 `"sm"` 或 `"md"`。
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
   * @locale {en} Whether or not to display the uploaded files list.
   * @locale {zh} 是否显示上传文件列表。
   */
  @Prop() showUploadList = true;
  /**
   * @locale {en} The type of upload mode, Can be one of the following values: `select` or `drag`.
   * @locale {zh} 上传模式的类型，可以是 `select` 或 `drag`。
   */
  @Prop() type: UploadType = 'select';
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
   * @locale {en} Description related to the upload, such as the types of uploads allowed.
   * @locale {zh} 与上传相关的描述，例如允许上传的类型。
   */
  @Prop() description = '';
  /**
   * @locale {en} Whether to display custom messages related to the upload process, such as errors or warnings.
   * @locale {zh} 是否展示与上传过程相关的自定义消息，例如错误或警告。
   */
  @Prop() showMessage = false;
  /**
   * @locale {en} The maximum length of the fileList.
   * @locale {zh} 最大文件个数。
   */
  @Prop() maxLength?: number;

  @State() mergedFileList: UploadFile[] = [];

  /**
   * @locale {en} A function to be called before a file is removed from the upload queue.
   * @locale {zh} 文件从上传队列中移除前的回调函数。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() beforeRemove: (event: CustomEvent) => boolean | Promise<boolean>;
  /**
   * @locale {en} Allows custom control of the upload process, overriding the default request behavior.
   * @locale {zh} 允许自定义上传过程，覆盖默认的上传请求行为。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() customRequest: (e: unknown) => void;

  // @Prop() ondrop: (event: CustomEvent) => void;

  /**
   * @locale {en} Reference to the default slot content, typically the trigger UI for the upload.
   * @locale {zh} 对默认插槽内容的引用，通常是上传的触发 UI。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: '_default' }) children: Slots<unknown>;

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

  /** @private inter event */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) exceededMaxChange: EventEmitter<boolean>;

  @State() highlight = false;

  @State() isError = false;

  @State() isExceededMax = false;

  @State() errorMessage = '';

  @Watch('fileList')
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  handleUpdateFileList(fileList) {
    const timestamp = Date.now();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    (fileList || []).forEach((file, index) => {
      if (!file.uid && !Object.isFrozen(file)) {
        file.uid = `__AUTO__${timestamp}_${index}__`;
      }
    });
    if (isNumber(this.maxLength)) {
      if (fileList.length > this.maxLength) {
        this.isExceededMax = true;
        this.mergedFileList = fileList.slice(0, this.maxLength);
      } else {
        this.isExceededMax = false;
        this.mergedFileList = [...fileList];
      }
    } else {
      this.mergedFileList = [...fileList];
    }
  }

  @Watch('isExceededMax')
  handleExceededMaxChange(val: boolean) {
    this.exceededMaxChange.emit(val);
  }

  @Watch('disabled')
  handleUpdate() {
    this.children.forEach((item) => {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      item.disabled = this.disabled;
    });
  }

  onInternalChange = (file: UploadFile, changedFileList: UploadFile[], event?: { percent: number }) => {
    this.mergedFileList = [...changedFileList];
    const changeInfo: UploadChangeParam<UploadFile> = {
      file: file as UploadFile,
      fileList: this.mergedFileList,
    };

    if (event) {
      changeInfo.event = event;
    }
    if (changeInfo.fileList.length === 0) {
      this.uploadEl.clearInputValue();
    }
    this.ksChange?.emit(changeInfo);
  };

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  onSuccess = ({ detail: { response, file, xhr } }) => {
    this.isError = false;
    const targetItem = file2Obj(file);

    targetItem.status = 'done';
    targetItem.percent = 100;
    targetItem.response = response;
    targetItem.xhr = xhr;

    const nextFileList = this.multiple ? updateFileList(targetItem, this.mergedFileList) : [targetItem];

    this.onInternalChange(targetItem, nextFileList);
  };

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  onProgress = ({ detail: { event, file } }) => {
    this.isError = false;
    const targetItem = file2Obj(file);
    targetItem.status = 'uploading';
    targetItem.percent = event.percent;

    const nextFileList = this.multiple ? updateFileList(targetItem, this.mergedFileList) : [targetItem];

    this.onInternalChange(targetItem, nextFileList);
  };

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  onFail = (e) => {
    const {
      detail: { event, file, error, response },
    } = e;

    if (error) {
      // this.ksChange?.emit({ file, fileList: [], error });
      this.ksError.emit({ file, fileList: [], error });
      this.isError = true;
      if (error === 'upload_exceeded_max_limit') {
        this.isExceededMax = true;
        return;
      }
    }
    const targetItem = file2Obj(file);
    targetItem.status = 'error';
    targetItem.percent = event?.percent || 0;
    targetItem.response = response || error.message;
    const nextFileList = this.multiple ? updateFileList(targetItem, this.mergedFileList) : [targetItem];
    this.onInternalChange(targetItem, nextFileList, error);
  };

  /**
   * @locale {en} Handles the removal of a file from the upload list. This function is called when a file is removed.
   * @locale {zh} 处理从上传列表中移除文件的逻辑。此函数在文件被移除时调用。
   */
  @Method()
  async handleRemove(file: UploadFile) {
    let currentFile: UploadFile;
    await Promise.resolve(
      typeof this.beforeRemove === 'function'
        ? this.beforeRemove(
            new CustomEvent('beforeRemove', {
              detail: {
                file,
              },
            }),
          )
        : this.beforeRemove,
    ).then((_) => {
      const removedFileList = removeFileItem(file, this.mergedFileList);

      if (removedFileList) {
        currentFile = { ...file, status: 'removed' };
        this.mergedFileList?.forEach((item) => {
          const matchKey = currentFile.uid !== undefined ? 'uid' : 'name';
          if (item[matchKey] === currentFile[matchKey] && !Object.isFrozen(item)) {
            item.status = 'removed';
          }
        });

        this.uploadEl.abort(currentFile);

        this.onInternalChange(currentFile, removedFileList);
      }
    });
    this.isExceededMax = false;
  }

  componentWillLoad() {
    this.children?.forEach((item) => {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      item.disabled = this.disabled;
    });
  }

  componentDidLoad() {
    const timestamp = Date.now();

    (this.fileList || []).forEach((file, index) => {
      if (!file.uid && !Object.isFrozen(file)) {
        file.uid = `__AUTO__${timestamp}_${index}__`;
      }
    });

    this.mergedFileList = [...this.defaultFileList, ...this.fileList];
  }

  render() {
    const exceededMaxLimit = t(uploadMessages.exceededMaxLimit, {
      num_max_files: this.maxLength || '',
    });
    return (
      <Host dir={dir()} ks-upload>
        <span
          dir={dir()}
          class={classnames(prefix, {
            [`${prefix}--active`]: this.mergedFileList.some((item) => item.status === 'uploading'),
          })}
        >
          <ks-rc-upload
            data={this.data}
            multiple={this.multiple}
            accept={this.accept}
            headers={this.headers}
            action={this.action}
            beforeUpload={this.beforeUpload}
            onsuccess={this.onSuccess}
            onfail={this.onFail}
            onpro={this.onProgress}
            name={this.name}
            disabled={this.disabled}
            ref={(el) => (this.uploadEl = el)}
            customRequest={this.customRequest}
            maxLength={this.maxLength}
            fileListLength={this.mergedFileList.length}
          >
            <slot></slot>
            {this.description && (
              <ks-text variant="labelSm">
                <span class={{ disabled: this.disabled }}>{this.description}</span>
              </ks-text>
            )}
          </ks-rc-upload>
          {this.showMessage && (this.errorMessage || this.message || this.isExceededMax) && (
            <div
              class={classnames(`${prefix}__message`, {
                [`${prefix}__message--error`]: this.isError || this.isExceededMax,
              })}
            >
              {this.isExceededMax ? (
                <ks-status-message variant="error" richTextString={exceededMaxLimit}></ks-status-message>
              ) : this.isError ? (
                <ks-status-message
                  variant="error"
                  richTextString={this.errorMessage || this.message}
                ></ks-status-message>
              ) : (
                this.errorMessage || this.message
              )}
            </div>
          )}
          {this.showUploadList && (
            <ks-upload-list
              size={this.size}
              class={`${prefix}__file-list`}
              items={this.mergedFileList}
              onremove={(file) => this.handleRemove(file)}
              disabled={this.disabled}
            ></ks-upload-list>
          )}
        </span>
      </Host>
    );
  }
}

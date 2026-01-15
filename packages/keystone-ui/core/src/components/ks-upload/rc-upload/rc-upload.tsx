import {
  Component,
  h,
  Prop,
  Event,
  Element,
  EventEmitter,
  Host,
  Watch,
  ComponentInterface,
  Method,
} from '@stencil/core';
import classnames from 'classnames';
import { defaultRequest } from '@src/utils/upload';
import { Slot, Slots } from '@src/utils/decorators';
import { dir, generateUniqueId } from '@src/utils/utils';
import { attrAccept } from '@src/utils/upload/file';
import { BeforeUploadHook, UploadProgressEvent, UploadRequestError, WcFile } from '../../../entities';
import { isNumber } from 'lodash-es';

const prefix = 'rc-upload';

@Component({
  tag: 'ks-rc-upload',
  shadow: true,
})
export class KsRcUpload implements ComponentInterface {
  ['ks-name'] = 'ks-rc-upload';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsRcUploadElement;
  // el: HTMLElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  fileInput: HTMLInputElement;
  uid: string = generateUniqueId();

  reqs = {};

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() accept: string;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() action: string;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() data: object;

  @Prop() name = 'file';

  @Prop() disabled = false;

  @Prop() multiple = false;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() headers: object;

  @Prop() method = 'post';

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() customRequest: (e: unknown) => void;

  // @Prop() onvaluechange: (event: CustomEvent) => void;

  @Prop() beforeUpload?: BeforeUploadHook;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() onstart: (event: CustomEvent) => void;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() onfail: (event: CustomEvent) => void;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() onpro: (event: CustomEvent) => void;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() onsuccess: (event: CustomEvent) => void;

  @Prop() maxLength?: number;

  @Prop() fileListLength = 0;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksChange: EventEmitter;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: '_default' }) children: Slots<unknown>;

  @Watch('disabled')
  handleUpdate() {
    this.children.forEach((item) => {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      item.disabled = this.disabled;
    });
  }

  uploadFiles(files: File[]) {
    const originFiles = isNumber(this.maxLength)
      ? [...files].slice(0, this.maxLength - this.fileListLength)
      : [...files];
    if (isNumber(this.maxLength) && this.fileListLength + files.length > this.maxLength) {
      this.onfail?.(
        new CustomEvent('onfail', {
          bubbles: false,
          composed: false,
          detail: {
            error: 'upload_exceeded_max_limit',
            response: 'upload_exceeded_max_limit',
            file: files,
          },
        }),
      );
    }
    const postFiles = originFiles.map((file: File & { uid?: string }) => {
      // eslint-disable-next-line no-param-reassign
      file.uid = generateUniqueId();
      return this.processFile(file, originFiles);
    });

    Promise.all(postFiles)
      .then((fileList) => {
        fileList
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          .filter((file) => file.parsedFile !== null)
          .forEach((file) => {
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            this.post(file);
          });
      })
      .finally(() => {
        this.clearInputValue();
      });
  }

  processFile = async (file: File & { uid?: string }, fileList: File[]): Promise<unknown> => {
    let transformedFile: (File & { uid?: string }) | Blob = file;

    if (this.beforeUpload) {
      let beforeUploadHookReturn: false | File | Blob;

      try {
        beforeUploadHookReturn = await this.beforeUpload(file, fileList);
      } catch (e) {
        // Rejection will also trade as false
        beforeUploadHookReturn = false;
      }

      if (beforeUploadHookReturn === false) {
        return {
          origin: file,
          parsedFile: null,
          action: null,
          data: null,
        };
      } else {
        transformedFile = beforeUploadHookReturn;
      }
    }

    // Get latest action
    const { action } = this;
    let mergedAction: string;
    if (typeof action === 'function') {
      // mergedAction = await action(file);
    } else {
      mergedAction = action;
    }

    // Get latest data
    const { data } = this;
    let mergedData: Record<string, unknown>;
    if (typeof data === 'function') {
      mergedData = await data(transformedFile);
    } else {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      mergedData = data;
    }

    let parsedFile: File;
    if (transformedFile instanceof File) {
      parsedFile = transformedFile;
    } else {
      // Not sure if this will work since no related test case works with it
      parsedFile = new File([transformedFile], file.name, { type: file.type });
    }

    const mergedParsedFile = parsedFile as File;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    mergedParsedFile.uid = file.uid;

    return {
      origin: file,
      data: mergedData,
      parsedFile: mergedParsedFile,
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      action: mergedAction,
    };
  };

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  post({ data, origin, action, parsedFile }) {
    const { name, headers, method } = this;

    const { uid } = origin;

    const request = this.customRequest || defaultRequest;

    const requestOption = {
      action,
      filename: name,
      data,
      file: parsedFile,
      headers,
      method,
      onProgress: (event: UploadProgressEvent) => {
        // this.onpro?.(e, parsedFile);

        this.onpro?.(
          new CustomEvent('onpro', {
            bubbles: false,
            composed: false,
            detail: {
              event,
              file: parsedFile,
            },
          }),
        );
      },
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      onSuccess: (ret, xhr: XMLHttpRequest) => {
        this.onsuccess?.(
          new CustomEvent('onsuccess', {
            bubbles: false,
            composed: false,
            detail: {
              response: ret,
              file: parsedFile,
              xhr,
            },
          }),
        );
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        delete this.reqs[uid];
      },
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      onError: (err: UploadRequestError, ret) => {
        // const { onfail1 } = this;
        this.onfail?.(
          new CustomEvent('onfail', {
            bubbles: false,
            composed: false,
            detail: {
              error: err,
              response: ret,
              file: parsedFile,
            },
          }),
        );
      },
    };

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.reqs[uid] = request(requestOption);
  }

  @Method()
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  async abort(file?) {
    const { reqs } = this;
    if (file) {
      const uid = file.uid ? file.uid : file;
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      if (reqs[uid] && reqs[uid].abort) {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        reqs[uid].abort();
      }
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      delete reqs[uid];
    } else {
      Object.keys(reqs).forEach((uid) => {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        if (reqs[uid] && reqs[uid].abort) {
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          reqs[uid].abort();
        }
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        delete reqs[uid];
      });
    }
  }

  componentWillLoad() {
    this.children.forEach((item) => {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      item.disabled = this.disabled;
    });
  }

  onTrigger = () => {
    if (this.disabled) {
      return;
    }
    this.fileInput.click();
  };

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  onFileDrop = (e) => {
    e.preventDefault();

    let files = [...e.dataTransfer.files].filter((file: WcFile) => attrAccept(file, this.accept));

    if (!this.multiple) {
      files = files.slice(0, 1);
    }
    if (files.length === 0) {
      this.onfail?.(
        new CustomEvent('onfail', {
          bubbles: false,
          composed: false,
          detail: {
            error: 'file accept err',
            response: 'error',
            file: files,
          },
        }),
      );
    }

    this.uploadFiles(files);
  };

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  uploadChange = (e: Event & { target }) => {
    this.uploadFiles(e.target.files);
  };

  @Method()
  async clearInputValue() {
    this.fileInput.value = '';
  }

  render() {
    return (
      <Host dir={dir()} ks-rc-upload>
        <span
          dir={dir()}
          class={classnames(prefix)}
          part="self"
          onClick={this.onTrigger}
          onDrop={this.onFileDrop}
          data-testid="rc-upload-rc-upload-8JzfyY"
        >
          <input
            part="upload"
            type="file"
            accept={this.accept}
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            ref={(el) => (this.fileInput = el)}
            onClick={(e) => e.stopPropagation()}
            style={{ display: 'none' }}
            multiple={this.multiple}
            disabled={this.disabled}
            onChange={this.uploadChange}
            data-testid="rc-upload-rc-upload-rrbezU"
          />

          <slot></slot>
        </span>
      </Host>
    );
  }
}

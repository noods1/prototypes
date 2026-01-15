export interface WcFile extends File {
  uid: string;
  lastModifiedDate?: Date;
}

export declare type UploadFileStatus = 'error' | 'done' | 'uploading' | 'removed';

export interface UploadFile<T = unknown> {
  uid: string;
  size?: number;
  name: string;
  fileName?: string;
  lastModified?: number;
  lastModifiedDate?: Date;
  url?: string;
  status?: UploadFileStatus;
  percent?: number;
  thumbUrl?: string;
  // crossOrigin?: React.ImgHTMLAttributes<HTMLImageElement>['crossOrigin'];
  originFileObj?: Blob;
  response?: T;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  error?;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  linkProps?;
  type?: string;
  xhr?: T;
  preview?: string;
  autoUpload?: boolean;
}

export type UploadRequestMethod = 'POST' | 'PUT' | 'PATCH' | 'post' | 'put' | 'patch';

export interface UploadProgressEvent extends Partial<ProgressEvent> {
  percent?: number;
}

export interface UploadRequestError extends Error {
  status?: number;
  method?: UploadRequestMethod;
  url?: string;
}

export interface UploadChangeParam<T = UploadFile> {
  file: T;
  fileList: T[];
  event?: { percent: number };
  error?: string;
}

export type UploadType = 'select' | 'drag';

export type BeforeUploadHook = (file: File, fileList: File[]) => false | Promise<File | Blob>;

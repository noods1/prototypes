import { RuleItem } from 'async-validator';
import type { KsFormItem } from '@src/components/ks-form-item';
import type { KsFormList } from '@src/components/ks-form-list';

export type NamePath = string;
export type Trigger = 'blur' | 'change';
export type RuleItemExpand = RuleItem & {
  trigger?: Trigger[] | Trigger;
  warningOnly?: boolean;
  messageCta?: { label: string; onClick: () => void };
};
export type LabelAlign = 'right' | 'left';

export interface FieldError {
  name: string;
  errors: string[];
  warnings: string[];
}

export interface FieldData {
  errors?: string[];
  warnings?: string[];
  touched?: boolean;
  validating?: boolean;
  name: NamePath;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  value;
}

export type FieldMap = FieldData & {
  instance?: HTMLKsFormItemElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  initialValue?;
};

export type FormItemValue =
  | undefined
  | null
  | string
  | number
  | boolean
  | Date
  | File
  | Array<GeneralFormValue>
  | {
      [key: string]: GeneralFormValue;
    };

export type FormListValue = Array<GeneralFormValue> | undefined;

export interface FormValue {
  [key: string]: GeneralFormValue;
}

export type GeneralFormValue = FormValue | FormItemValue | FormListValue;

export interface FormListField {
  name: number;
  key: number;
}

export interface SuccessValidationSingleState {
  status: 'success';
}

export interface FailedValidationSingleState {
  status: 'error';
  message: string;
  cta?: { label: string; onClick: () => void };
}

export interface WarningValidationSingleState {
  status: 'warning';
  message: string;
  cta?: { label: string; onClick: () => void };
}

export interface PendingValidationSingleState {
  status: 'validating';
}

export type ValidationSingleState =
  | SuccessValidationSingleState
  | FailedValidationSingleState
  | WarningValidationSingleState
  | PendingValidationSingleState;

export type ValidationState = ValidationSingleState[];

export const STATUS_KEY = '__status__';

export type FormListValidationStates = ValidationStates[] & {
  [STATUS_KEY]: ValidationState | null;
};

export type FormItemValidationStates = {
  [key: string]: ValidationStates | ValidationState | null;
} & {
  [STATUS_KEY]: ValidationState | null;
};

export type ValidationStates = FormItemValidationStates | FormListValidationStates | undefined;

export interface ErrorField {
  name: NamePath;
  errors: string[];
  warnings: string[];
}

export const INSTANCE_KEY = '__instance__';

export interface InstanceMap {
  [INSTANCE_KEY]: KsFormItem | KsFormList | null;
  [key: string]: InstanceMap | KsFormItem | KsFormList | null;
}

export type WatchCallBack = (value: GeneralFormValue) => void;

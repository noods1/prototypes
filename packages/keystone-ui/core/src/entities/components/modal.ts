import { Status } from '../common';

export type ModalType = Exclude<Status, 'default' | 'danger'> | 'info' | 'error';
export type ModalSize = 'lg' | 'md' | 'sm';

export type ModalCloseReason = 'confirm' | 'close' | 'cancel' | 'manual';

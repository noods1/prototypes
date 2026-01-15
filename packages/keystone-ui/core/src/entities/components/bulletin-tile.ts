import { BtnVariant } from './button';

interface ButtonType {
  text: string;
  variant?: BtnVariant;
}

export interface BulletinDataType {
  title: string;
  content: string;
  image: string;
  buttons: ButtonType[];
  key: string | number;
}

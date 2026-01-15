interface ButtonType {
  text: string;
  variant: 'text' | 'support';
  loading?: boolean;
  key?: string | number;
}

export interface NuxPopoverData {
  image?: string;
  title: string;
  content: string;
  total?: number;
  current?: number;
  buttons: ButtonType[];
  key: string | number;
}

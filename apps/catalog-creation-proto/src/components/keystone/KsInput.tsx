import React from 'react';

// React wrapper for ks-input web component
export interface KsInputProps extends React.HTMLAttributes<HTMLKsInputElement> {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  clearable?: boolean;
  type?: string;
  size?: 'sm' | 'md' | 'lg';
  status?: 'default' | 'error' | 'warning' | 'success';
  children?: React.ReactNode;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ks-input': React.DetailedHTMLProps<React.HTMLAttributes<HTMLKsInputElement>, HTMLKsInputElement>;
    }
  }
}

export const KsInput = React.forwardRef<HTMLKsInputElement, KsInputProps>(
  ({ children, ...props }, ref) => {
    return React.createElement('ks-input', { ...props, ref }, children);
  }
);

KsInput.displayName = 'KsInput';


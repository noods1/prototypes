import React from 'react';

// React wrapper for ks-button web component
// This will work once @fe-infra/keystone is built and loaded
export interface KsButtonProps extends React.HTMLAttributes<HTMLKsButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'tertiary' | 'text' | 'inverse' | 'alert';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  shape?: 'angle' | 'round' | 'cycle' | 'square';
  block?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
  forceActive?: boolean;
  children?: React.ReactNode;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ks-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLKsButtonElement>, HTMLKsButtonElement>;
    }
  }
}

export const KsButton = React.forwardRef<HTMLKsButtonElement, KsButtonProps>(
  ({ children, ...props }, ref) => {
    return React.createElement('ks-button', { ...props, ref }, children);
  }
);

KsButton.displayName = 'KsButton';


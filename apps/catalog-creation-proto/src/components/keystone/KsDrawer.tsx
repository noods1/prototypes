import React from 'react';

// React wrapper for ks-drawer web component
export interface KsDrawerProps extends React.HTMLAttributes<HTMLKsDrawerElement> {
  open?: boolean;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  width?: string;
  height?: string;
  mask?: boolean;
  maskClosable?: boolean;
  closable?: boolean;
  children?: React.ReactNode;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ks-drawer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLKsDrawerElement>, HTMLKsDrawerElement>;
    }
  }
}

export const KsDrawer = React.forwardRef<HTMLKsDrawerElement, KsDrawerProps>(
  ({ children, ...props }, ref) => {
    return React.createElement('ks-drawer', { ...props, ref }, children);
  }
);

KsDrawer.displayName = 'KsDrawer';


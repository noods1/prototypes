import React from 'react';

// React wrapper for ks-switch web component
export interface KsSwitchProps extends React.HTMLAttributes<HTMLKsSwitchElement> {
  checked?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ks-switch': React.DetailedHTMLProps<React.HTMLAttributes<HTMLKsSwitchElement>, HTMLKsSwitchElement>;
    }
  }
}

export const KsSwitch = React.forwardRef<HTMLKsSwitchElement, KsSwitchProps>(
  ({ children, ...props }, ref) => {
    return React.createElement('ks-switch', { ...props, ref }, children);
  }
);

KsSwitch.displayName = 'KsSwitch';


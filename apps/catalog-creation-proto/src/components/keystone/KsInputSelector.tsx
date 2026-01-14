import React from 'react';

// React wrapper for ks-input-selector web component
export interface KsInputSelectorProps extends React.HTMLAttributes<HTMLKsInputSelectorElement> {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  size?: 'sm' | 'md' | 'lg';
  status?: 'default' | 'error' | 'warning' | 'success';
  children?: React.ReactNode;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ks-input-selector': React.DetailedHTMLProps<React.HTMLAttributes<HTMLKsInputSelectorElement>, HTMLKsInputSelectorElement>;
    }
  }
}

export const KsInputSelector = React.forwardRef<HTMLKsInputSelectorElement, KsInputSelectorProps>(
  ({ children, ...props }, ref) => {
    return React.createElement('ks-input-selector', { ...props, ref }, children);
  }
);

KsInputSelector.displayName = 'KsInputSelector';


import React from 'react';

// React wrapper for ks-card web component
export interface KsCardProps extends React.HTMLAttributes<HTMLKsCardElement> {
  children?: React.ReactNode;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ks-card': React.DetailedHTMLProps<React.HTMLAttributes<HTMLKsCardElement>, HTMLKsCardElement>;
    }
  }
}

export const KsCard = React.forwardRef<HTMLKsCardElement, KsCardProps>(
  ({ children, ...props }, ref) => {
    return React.createElement('ks-card', { ...props, ref }, children);
  }
);

KsCard.displayName = 'KsCard';


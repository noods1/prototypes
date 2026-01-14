import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type CloseLargeProps = Omit<IconProps, 'children'>;

/**
 * CloseLargeIcon
 * 
 * Converted from Symbols/Close/CloseLargeIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const CloseLarge: React.FC<CloseLargeProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M3.89363 3.89363C4.22836 3.55889 4.77107 3.55889 5.10581 3.89363L20.1057 18.8936C20.4405 19.2283 20.4405 19.771 20.1057 20.1057C19.771 20.4405 19.2283 20.4405 18.8936 20.1057L3.89363 5.10581C3.5589 4.77107 3.5589 4.22836 3.89363 3.89363Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M3.89363 20.1057C3.55889 19.771 3.55889 19.2283 3.89363 18.8936L18.8936 3.89363C19.2283 3.5589 19.771 3.5589 20.1057 3.89363C20.4405 4.22836 20.4405 4.77107 20.1057 5.10581L5.10581 20.1057C4.77107 20.4405 4.22836 20.4405 3.89363 20.1057Z" fill="currentColor" />
    </IconBase>
  );
};

export default CloseLarge;

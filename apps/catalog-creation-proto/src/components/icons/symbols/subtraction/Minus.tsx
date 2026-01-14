import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type MinusProps = Omit<IconProps, 'children'>;

/**
 * MinusIcon
 * 
 * Converted from Symbols/Subtraction/MinusIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Minus: React.FC<MinusProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M1.70421 12C1.70421 11.5858 2.04 11.25 2.45421 11.25L21.546 11.25C21.9602 11.25 22.296 11.5858 22.296 12C22.296 12.4142 21.9602 12.75 21.546 12.75L2.45421 12.75C2.04 12.75 1.70421 12.4142 1.70421 12Z" fill="currentColor" />
    </IconBase>
  );
};

export default Minus;

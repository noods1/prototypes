import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type SquareProps = Omit<IconProps, 'children'>;

/**
 * SquareIcon
 * 
 * Converted from Symbols/Shapes/SquareIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Square: React.FC<SquareProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M0.5 2.99999C0.5 1.61928 1.61929 0.5 2.99999 0.5H20.9999C22.3806 0.5 23.4999 1.61929 23.4999 2.99999V21C23.4999 22.3807 22.3806 23.5 20.9999 23.5H2.99999C1.61928 23.5 0.5 22.3807 0.5 21V2.99999ZM2.99999 2.5C2.72385 2.5 2.5 2.72385 2.5 2.99999V21C2.5 21.2761 2.72385 21.5 2.99999 21.5H20.9999C21.2761 21.5 21.4999 21.2761 21.4999 21V2.99999C21.4999 2.72385 21.2761 2.5 20.9999 2.5H2.99999Z" fill="currentColor" />
    </IconBase>
  );
};

export default Square;

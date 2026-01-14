import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type CircleSmallProps = Omit<IconProps, 'children'>;

/**
 * CircleSmallIcon
 * 
 * Converted from Arrows/Loading/CircleSmallIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const CircleSmall: React.FC<CircleSmallProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 20.753C16.8343 20.753 20.7534 16.8339 20.7534 11.9995C20.7534 7.16514 16.8343 3.24609 12 3.24609C11.4477 3.24609 11 2.79838 11 2.24609C11 1.69381 11.4477 1.24609 12 1.24609C17.9389 1.24609 22.7534 6.06058 22.7534 11.9995C22.7534 17.9385 17.9389 22.753 12 22.753C6.06104 22.753 1.24658 17.9385 1.24658 11.9995C1.24658 11.4472 1.6943 10.9995 2.24658 10.9995C2.79887 10.9995 3.24658 11.4472 3.24658 11.9995C3.24658 16.8339 7.16562 20.753 12 20.753Z" fill="currentColor" />
    </IconBase>
  );
};

export default CircleSmall;

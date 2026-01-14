import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type PlusSmallProps = Omit<IconProps, 'children'>;

/**
 * PlusSmallIcon
 * 
 * Converted from Symbols/Addition/PlusSmallIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const PlusSmall: React.FC<PlusSmallProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M11.1424 19.4241C11.1424 19.8975 11.5261 20.2812 11.9995 20.2812C12.4729 20.2812 12.8566 19.8975 12.8566 19.4241V12.8566H19.4241C19.8975 12.8566 20.2812 12.4729 20.2812 11.9995C20.2812 11.5261 19.8975 11.1424 19.4241 11.1424H12.8566V4.57491C12.8566 4.10153 12.4729 3.71777 11.9995 3.71777C11.5261 3.71777 11.1424 4.10153 11.1424 4.57491V11.1424H4.57491C4.10153 11.1424 3.71777 11.5261 3.71777 11.9995C3.71777 12.4729 4.10153 12.8566 4.57491 12.8566H11.1424V19.4241Z" fill="currentColor" />
    </IconBase>
  );
};

export default PlusSmall;

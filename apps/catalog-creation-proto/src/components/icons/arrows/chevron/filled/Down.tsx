import React from 'react';
import { IconBase, IconProps } from '../../../IconBase';

type DownProps = Omit<IconProps, 'children'>;

/**
 * DownIcon
 * 
 * Converted from Arrows/Chevron/Filled/DownIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Down: React.FC<DownProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M12.0001 16.418L3.11768 7.58203H20.8823L12.0001 16.418Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </IconBase>
  );
};

export default Down;

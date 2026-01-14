import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type DownProps = Omit<IconProps, 'children'>;

/**
 * DownIcon
 * 
 * Converted from Arrows/Chevron/DownIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Down: React.FC<DownProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 15.2411L20.2928 6.94817C20.6833 6.55764 21.3165 6.55764 21.707 6.94816C22.0975 7.33869 22.0975 7.97185 21.707 8.36238L13.2374 16.832C12.554 17.5155 11.4459 17.5155 10.7625 16.832L2.29289 8.36238C1.90237 7.97185 1.90237 7.33869 2.29289 6.94816C2.68342 6.55764 3.31659 6.55764 3.70711 6.94817L12 15.2411Z" fill="currentColor" />
    </IconBase>
  );
};

export default Down;

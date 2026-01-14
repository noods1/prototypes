import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type RightProps = Omit<IconProps, 'children'>;

/**
 * RightIcon
 * 
 * Converted from Arrows/Chevron/RightIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Right: React.FC<RightProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M15.241 12L6.94817 20.2929C6.55764 20.6834 6.55764 21.3166 6.94817 21.7071C7.33869 22.0976 7.97186 22.0976 8.36238 21.7071L16.832 13.2374C17.5154 12.554 17.5154 11.446 16.832 10.7626L8.36238 2.29289C7.97186 1.90237 7.33869 1.90237 6.94817 2.29289C6.55764 2.68341 6.55764 3.31658 6.94817 3.70711L15.241 12Z" fill="currentColor" />
    </IconBase>
  );
};

export default Right;

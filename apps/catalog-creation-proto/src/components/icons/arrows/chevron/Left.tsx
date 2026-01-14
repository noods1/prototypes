import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type LeftProps = Omit<IconProps, 'children'>;

/**
 * LeftIcon
 * 
 * Converted from Arrows/Chevron/LeftIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Left: React.FC<LeftProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M8.75883 12L17.0517 20.2929C17.4422 20.6834 17.4422 21.3166 17.0517 21.7071C16.6612 22.0976 16.028 22.0976 15.6375 21.7071L7.16783 13.2374C6.48442 12.554 6.48442 11.446 7.16783 10.7626L15.6375 2.29289C16.028 1.90237 16.6612 1.90237 17.0517 2.29289C17.4422 2.68341 17.4422 3.31658 17.0517 3.70711L8.75883 12Z" fill="currentColor" />
    </IconBase>
  );
};

export default Left;

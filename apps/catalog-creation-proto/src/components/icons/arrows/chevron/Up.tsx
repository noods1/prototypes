import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type UpProps = Omit<IconProps, 'children'>;

/**
 * UpIcon
 * 
 * Converted from Arrows/Chevron/UpIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Up: React.FC<UpProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 8.75883L20.2928 17.0517C20.6833 17.4422 21.3165 17.4422 21.707 17.0517C22.0975 16.6612 22.0975 16.028 21.707 15.6375L13.2374 7.16784C12.554 6.48442 11.4459 6.48442 10.7625 7.16784L2.29289 15.6375C1.90237 16.028 1.90237 16.6612 2.29289 17.0517C2.68342 17.4422 3.31659 17.4422 3.70711 17.0517L12 8.75883Z" fill="currentColor" />
    </IconBase>
  );
};

export default Up;

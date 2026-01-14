import React from 'react';
import { IconBase, IconProps } from '../../../IconBase';

type UpProps = Omit<IconProps, 'children'>;

/**
 * UpIcon
 * 
 * Converted from Arrows/Chevron/Filled/UpIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Up: React.FC<UpProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M12.7054 6.87308C12.3153 6.48502 11.685 6.48501 11.2949 6.87307L2.41246 15.709C2.12537 15.9946 2.03885 16.4251 2.19332 16.7994C2.3478 17.1738 2.71277 17.418 3.11771 17.418H20.8824C21.2873 17.418 21.6523 17.1738 21.8067 16.7994C21.9612 16.4251 21.8747 15.9946 21.5876 15.709L12.7054 6.87308Z" fill="currentColor" />
    </IconBase>
  );
};

export default Up;

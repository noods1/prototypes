import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type CheckMark-SMProps = Omit<IconProps, 'children'>;

/**
 * CheckMark-SMIcon
 * 
 * Converted from Symbols/Check/CheckMark-SMIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const CheckMark-SM: React.FC<CheckMark-SMProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M18.8476 6.09044C19.2117 6.39294 19.2617 6.93334 18.9592 7.29747L10.2361 17.7974C10.0733 17.9934 9.83168 18.1068 9.57684 18.1068C9.322 18.1068 9.08038 17.9934 8.91754 17.7974L5.04063 13.1308C4.73813 12.7667 4.78808 12.2262 5.15221 11.9237C5.51633 11.6212 6.05674 11.6712 6.35924 12.0353L9.57684 15.9084L17.6406 6.20201C17.9431 5.83789 18.4835 5.78793 18.8476 6.09044Z" fill="currentColor" />
    </IconBase>
  );
};

export default CheckMark-SM;

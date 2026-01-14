import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type BoldProps = Omit<IconProps, 'children'>;

/**
 * BoldIcon
 * 
 * Converted from Formatting/Text/BoldIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Bold: React.FC<BoldProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M5.00708 3.54297C5.00708 2.99068 5.45479 2.54297 6.00708 2.54297H12.6548C15.4013 2.54297 17.6277 4.7694 17.6277 7.51585C17.6277 8.93684 17.0317 10.2186 16.076 11.1249C17.8118 12.0455 18.9941 13.8711 18.9941 15.9729C18.9941 19.0017 16.5388 21.457 13.51 21.457H6.00684C5.74161 21.457 5.48726 21.3516 5.29972 21.1641C5.11218 20.9765 5.00683 20.7222 5.00684 20.457L5.00708 3.54297ZM7.00708 10.4887L12.6548 10.4887C14.2967 10.4887 15.6277 9.15773 15.6277 7.51585C15.6277 5.87397 14.2967 4.54297 12.6548 4.54297H7.00708V10.4887ZM7.00705 12.4887L13.51 12.4887C15.4342 12.4887 16.9941 14.0486 16.9941 15.9729C16.9941 17.8971 15.4342 19.457 13.51 19.457H7.00686L7.00705 12.4887Z" fill="currentColor" />
    </IconBase>
  );
};

export default Bold;

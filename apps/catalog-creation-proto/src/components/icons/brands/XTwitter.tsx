import React from 'react';
import { IconBase, IconProps } from '../IconBase';

type XTwitterProps = Omit<IconProps, 'children'>;

/**
 * XTwitterIcon
 * 
 * Converted from Brands/XTwitterIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const XTwitter: React.FC<XTwitterProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M15.2129 7H16.9093L13.2032 11.2359L17.5632 17H14.1493L11.4754 13.5041L8.41592 17H6.71846L10.6826 12.4692L6.5 7H10.0006L12.4175 10.1954L15.2129 7ZM14.6175 15.9846H15.5575L9.48978 7.96205H8.48105L14.6175 15.9846Z" fill="currentColor" />
    </IconBase>
  );
};

export default XTwitter;

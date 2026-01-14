import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type LogoutProps = Omit<IconProps, 'children'>;

/**
 * LogoutIcon
 * 
 * Converted from Arrows/Authentication/LogoutIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Logout: React.FC<LogoutProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M3.5 3C3.5 2.0335 4.2835 1.25 5.25 1.25H18.7499C19.7164 1.25 20.4999 2.0335 20.4999 3V4.5C20.4999 5.05229 20.0522 5.5 19.4999 5.5C18.9476 5.5 18.4999 5.05229 18.4999 4.5V3.25H5.5V20.75H18.4999V19.5C18.4999 18.9477 18.9476 18.5 19.4999 18.5C20.0522 18.5 20.4999 18.9477 20.4999 19.5V21C20.4999 21.9665 19.7164 22.75 18.7499 22.75H5.25C4.2835 22.75 3.5 21.9665 3.5 21V3Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M15.7921 8.2925C16.1826 7.90198 16.8158 7.90198 17.2063 8.29251L20.2067 11.2929C20.5972 11.6834 20.5972 12.3166 20.2067 12.7071L17.2063 15.7075C16.8158 16.098 16.1826 16.098 15.7921 15.7075C15.4016 15.3169 15.4016 14.6838 15.7921 14.2932L17.0854 13H7.49853C6.94624 13 6.49853 12.5523 6.49853 12C6.49853 11.4477 6.94624 11 7.49853 11H17.0854L15.7921 9.70672C15.4016 9.31619 15.4016 8.68303 15.7921 8.2925Z" fill="currentColor" />
    </IconBase>
  );
};

export default Logout;

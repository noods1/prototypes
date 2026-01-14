import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type AddsectionProps = Omit<IconProps, 'children'>;

/**
 * AddsectionIcon
 * 
 * Converted from Formatting/Square/AddsectionIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Addsection: React.FC<AddsectionProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M4.99899 11.9926C4.99899 11.4403 5.44671 10.9926 5.99899 10.9926H17.9989C18.5512 10.9926 18.9989 11.4403 18.9989 11.9926C18.9989 12.5448 18.5512 12.9926 17.9989 12.9926H5.99899C5.44671 12.9926 4.99899 12.5448 4.99899 11.9926Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M11.9993 4.9926C12.5516 4.9926 12.9993 5.44032 12.9993 5.9926L12.9993 17.9926C12.9993 18.5449 12.5516 18.9926 11.9993 18.9926C11.447 18.9926 10.9993 18.5449 10.9993 17.9926L10.9993 5.9926C10.9993 5.44032 11.447 4.9926 11.9993 4.9926Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M3.5 3.5V20.5H20.4999V3.5H3.5ZM2.99999 1.5C2.17157 1.5 1.5 2.17157 1.5 2.99999V21C1.5 21.8284 2.17157 22.5 2.99999 22.5H20.9999C21.8283 22.5 22.4999 21.8284 22.4999 21V2.99999C22.4999 2.17157 21.8283 1.5 20.9999 1.5H2.99999Z" fill="currentColor" />
    </IconBase>
  );
};

export default Addsection;

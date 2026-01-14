import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type PhoneProps = Omit<IconProps, 'children'>;

/**
 * PhoneIcon
 * 
 * Converted from Media/Device/PhoneIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Phone: React.FC<PhoneProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M4.25 2.99999C4.25 1.61928 5.36929 0.5 6.74999 0.5H17.2499C18.6307 0.5 19.7499 1.61928 19.7499 2.99999V21C19.7499 22.3807 18.6307 23.5 17.2499 23.5H6.74999C5.36929 23.5 4.25 22.3807 4.25 21V2.99999ZM6.74999 2.5C6.47385 2.5 6.25 2.72385 6.25 2.99999V21C6.25 21.2761 6.47385 21.5 6.74999 21.5H17.2499C17.5261 21.5 17.7499 21.2761 17.7499 21V2.99999C17.7499 2.72385 17.5261 2.5 17.2499 2.5H6.74999Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M9.50113 19.1295C9.50113 18.5772 9.94884 18.1295 10.5011 18.1295H13.5011C14.0534 18.1295 14.5011 18.5772 14.5011 19.1295C14.5011 19.6818 14.0534 20.1295 13.5011 20.1295H10.5011C9.94884 20.1295 9.50113 19.6818 9.50113 19.1295Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M5.32925 15.75C5.32925 15.1977 5.77697 14.75 6.32925 14.75L17.6583 14.75C18.2106 14.75 18.6583 15.1977 18.6583 15.75C18.6583 16.3023 18.2106 16.75 17.6583 16.75H6.32925C5.77697 16.75 5.32925 16.3023 5.32925 15.75Z" fill="currentColor" />
    </IconBase>
  );
};

export default Phone;

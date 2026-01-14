import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type MailProps = Omit<IconProps, 'children'>;

/**
 * MailIcon
 * 
 * Converted from Menu/Communication/MailIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Mail: React.FC<MailProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M3.5 6.5V17.5H20.4999V6.5H3.5ZM2.99999 4.5C2.17157 4.5 1.5 5.17157 1.5 5.99999V18C1.5 18.8284 2.17157 19.5 2.99999 19.5H20.9999C21.8283 19.5 22.4999 18.8284 22.4999 18V5.99999C22.4999 5.17157 21.8283 4.5 20.9999 4.5H2.99999Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M4.33614 8.594C4.56044 8.08932 5.1514 7.86202 5.65609 8.08633L11.9999 10.9058L18.3437 8.08633C18.8484 7.86202 19.4394 8.08932 19.6637 8.594C19.888 9.09868 19.6607 9.68964 19.156 9.91395L12.7107 12.7786C12.2582 12.9797 11.7417 12.9797 11.2892 12.7786L4.84381 9.91395C4.33912 9.68964 4.11183 9.09868 4.33614 8.594Z" fill="currentColor" />
    </IconBase>
  );
};

export default Mail;

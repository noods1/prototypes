import React from 'react';
import { IconBase, IconProps } from '../IconBase';

type KsStatusIconProps = Omit<IconProps, 'children'>;

/**
 * KsStatusIconIcon
 * 
 * Converted from KsStatusIconIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const KsStatusIcon: React.FC<KsStatusIconProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M21.75 12C21.75 17.3848 17.3848 21.75 12 21.75C6.61522 21.75 2.25 17.3848 2.25 12C2.25 6.61522 6.61522 2.25 12 2.25C17.3848 2.25 21.75 6.61522 21.75 12Z" fill="currentColor" />
      <path d="M11.4404 6.19727C11.4404 5.64498 11.8881 5.19727 12.4404 5.19727C12.9927 5.19727 13.4404 5.64498 13.4404 6.19727V11.7812L16.1465 14.4873L16.2148 14.5635C16.5351 14.9562 16.5126 15.5353 16.1465 15.9014C15.7804 16.2674 15.2014 16.29 14.8086 15.9697L14.7324 15.9014L11.7334 12.9023C11.5459 12.7148 11.4404 12.4605 11.4404 12.1953V6.19727Z" fill="currentColor" />
    </IconBase>
  );
};

export default KsStatusIcon;

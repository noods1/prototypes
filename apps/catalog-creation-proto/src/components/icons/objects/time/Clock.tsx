import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type ClockProps = Omit<IconProps, 'children'>;

/**
 * ClockIcon
 * 
 * Converted from Objects/Time/ClockIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Clock: React.FC<ClockProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 20.753C16.8343 20.753 20.7534 16.8339 20.7534 11.9995C20.7534 7.16514 16.8343 3.24609 12 3.24609C7.16562 3.24609 3.24658 7.16514 3.24658 11.9995C3.24658 16.8339 7.16562 20.753 12 20.753ZM22.7534 11.9995C22.7534 17.9385 17.9389 22.753 12 22.753C6.06104 22.753 1.24658 17.9385 1.24658 11.9995C1.24658 6.06058 6.06104 1.24609 12 1.24609C17.9389 1.24609 22.7534 6.06058 22.7534 11.9995Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M12 5.00488C12.5523 5.00488 13 5.4526 13 6.00488V11.5907L15.7071 14.2978C16.0976 14.6883 16.0976 15.3215 15.7071 15.712C15.3166 16.1025 14.6834 16.1025 14.2929 15.712L11.2929 12.712C11.1053 12.5244 11 12.2701 11 12.0049V6.00488C11 5.4526 11.4477 5.00488 12 5.00488Z" fill="currentColor" />
    </IconBase>
  );
};

export default Clock;

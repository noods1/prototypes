import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type ComputerProps = Omit<IconProps, 'children'>;

/**
 * ComputerIcon
 * 
 * Converted from Media/Device/ComputerIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Computer: React.FC<ComputerProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M3.5 4.875V14.375H20.4999V4.875H3.5ZM2.99999 2.875C2.17157 2.875 1.5 3.54657 1.5 4.37499V14.875C1.5 15.7034 2.17157 16.375 2.99999 16.375H20.9999C21.8283 16.375 22.4999 15.7034 22.4999 14.875V4.37499C22.4999 3.54657 21.8283 2.875 20.9999 2.875H2.99999Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M11.3609 18.875L11.6942 16.875H12.3057L12.639 18.875H11.3609ZM10.7706 20.875C9.84374 20.875 9.13868 20.0427 9.29106 19.1284L9.79106 16.1284C9.91161 15.4051 10.5374 14.875 11.2706 14.875H12.7293C13.4625 14.875 14.0883 15.4051 14.2088 16.1284L14.7088 19.1284C14.8612 20.0427 14.1562 20.875 13.2293 20.875H10.7706Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M4.24998 20.125C4.24998 19.5728 4.69769 19.125 5.24998 19.125H18.7499C19.3022 19.125 19.7499 19.5728 19.7499 20.125C19.7499 20.6773 19.3022 21.125 18.7499 21.125H5.24998C4.69769 21.125 4.24998 20.6773 4.24998 20.125Z" fill="currentColor" />
    </IconBase>
  );
};

export default Computer;

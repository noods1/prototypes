import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type OffScreenProps = Omit<IconProps, 'children'>;

/**
 * OffScreenIcon
 * 
 * Converted from Media/Actions/OffScreenIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const OffScreen: React.FC<OffScreenProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M9.24949 8.25C9.24949 9.2165 8.46599 10 7.49949 10H2.99951C2.44723 10 1.99951 9.55228 1.99951 9C1.99951 8.44772 2.44723 8 2.99951 8H7.24949V3C7.24949 2.44771 7.69721 2 8.24949 2C8.80177 2 9.24949 2.44771 9.24949 3V8.25Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M14.7497 8.2502C14.7497 9.2167 15.5331 10.0002 16.4996 10.0002H20.9996C21.5519 10.0002 21.9996 9.55248 21.9996 9.0002C21.9996 8.44791 21.5519 8.0002 20.9996 8.0002H16.7497V3.0002C16.7497 2.44791 16.3019 2.0002 15.7497 2.0002C15.1974 2.0002 14.7497 2.44791 14.7497 3.0002V8.2502Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M14.7497 15.7501C14.7497 14.7836 15.5331 14.0001 16.4996 14.0001H20.9996C21.5519 14.0001 21.9996 14.4479 21.9996 15.0001C21.9996 15.5524 21.5519 16.0001 20.9996 16.0001H16.7497V21.0001C16.7497 21.5524 16.3019 22.0001 15.7497 22.0001C15.1974 22.0001 14.7497 21.5524 14.7497 21.0001V15.7501Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M9.24949 15.75C9.24949 14.7835 8.46599 14 7.49949 14H2.99951C2.44723 14 1.99951 14.4478 1.99951 15C1.99951 15.5523 2.44723 16 2.99951 16H7.24949V21C7.24949 21.5523 7.69721 22 8.24949 22C8.80177 22 9.24949 21.5523 9.24949 21V15.75Z" fill="currentColor" />
    </IconBase>
  );
};

export default OffScreen;

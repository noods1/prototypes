import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type FullScreenProps = Omit<IconProps, 'children'>;

/**
 * FullScreenIcon
 * 
 * Converted from Media/Actions/FullScreenIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const FullScreen: React.FC<FullScreenProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M2.00049 3.75019C2.00049 2.7837 2.78399 2.0002 3.75048 2.0002H8.25047C8.80275 2.0002 9.25047 2.44791 9.25047 3.0002C9.25047 3.55248 8.80275 4.0002 8.25047 4.0002H4.00049V9.0002C4.00049 9.55248 3.55277 10.0002 3.00049 10.0002C2.4482 10.0002 2.00049 9.55248 2.00049 9.0002V3.75019Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M22 3.75C22 2.7835 21.2165 2 20.25 2H15.75C15.1977 2 14.75 2.44772 14.75 3C14.75 3.55228 15.1977 4 15.75 4H20V9C20 9.55229 20.4477 10 21 10C21.5523 10 22 9.55229 22 9V3.75Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M22 20.25C22 21.2165 21.2165 22 20.25 22H15.75C15.1977 22 14.75 21.5523 14.75 21C14.75 20.4478 15.1977 20 15.75 20H20V15C20 14.4478 20.4477 14 21 14C21.5523 14 22 14.4478 22 15V20.25Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M2.00049 20.2502C2.00049 21.2167 2.78399 22.0002 3.75049 22.0002H8.25047C8.80275 22.0002 9.25047 21.5525 9.25047 21.0002C9.25047 20.4479 8.80275 20.0002 8.25047 20.0002H4.00049V15.0002C4.00049 14.4479 3.55277 14.0002 3.00049 14.0002C2.44821 14.0002 2.00049 14.4479 2.00049 15.0002V20.2502Z" fill="currentColor" />
    </IconBase>
  );
};

export default FullScreen;

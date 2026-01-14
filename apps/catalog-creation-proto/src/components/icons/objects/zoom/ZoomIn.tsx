import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type ZoomInProps = Omit<IconProps, 'children'>;

/**
 * ZoomInIcon
 * 
 * Converted from Objects/Zoom/ZoomInIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const ZoomIn: React.FC<ZoomInProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M10.0713 17.357C14.0951 17.357 17.357 14.0951 17.357 10.0713C17.357 6.0475 14.0951 2.78557 10.0713 2.78557C6.0475 2.78557 2.78557 6.0475 2.78557 10.0713C2.78557 14.0951 6.0475 17.357 10.0713 17.357ZM10.0713 19.0713C15.0419 19.0713 19.0713 15.0419 19.0713 10.0713C19.0713 5.10073 15.0419 1.07129 10.0713 1.07129C5.10073 1.07129 1.07129 5.10073 1.07129 10.0713C1.07129 15.0419 5.10073 19.0713 10.0713 19.0713Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M16.0713 14.8591L22.6774 21.4652C23.0121 21.7999 23.0121 22.3426 22.6774 22.6774C22.3426 23.0121 21.7999 23.0121 21.4652 22.6774L14.8591 16.0713L16.0713 14.8591Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M5.46415 10.0713C5.46415 9.5979 5.8479 9.21415 6.32129 9.21415H13.8213C14.2947 9.21415 14.6784 9.5979 14.6784 10.0713C14.6784 10.5447 14.2947 10.9284 13.8213 10.9284H6.32129C5.8479 10.9284 5.46415 10.5447 5.46415 10.0713Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M10.0713 5.46415C10.5447 5.46415 10.9284 5.8479 10.9284 6.32129V13.8213C10.9284 14.2947 10.5447 14.6784 10.0713 14.6784C9.5979 14.6784 9.21415 14.2947 9.21415 13.8213V6.32129C9.21415 5.8479 9.5979 5.46415 10.0713 5.46415Z" fill="currentColor" />
    </IconBase>
  );
};

export default ZoomIn;

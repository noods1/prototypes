import React from 'react';
import { IconBase, IconProps } from '../../../IconBase';

type PauseProps = Omit<IconProps, 'children'>;

/**
 * PauseIcon
 * 
 * Converted from Media/Actions/Filled/PauseIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Pause: React.FC<PauseProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M5.54185 0.000373248C7.58101 0.000373248 9.23409 1.65344 9.23409 3.69261V20.3078C9.23409 22.3469 7.58101 24 5.54185 24C3.50268 24 1.84961 22.3469 1.84961 20.3078V3.69261C1.84961 1.65344 3.50268 0.000373248 5.54185 0.000373248Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M18.458 0C20.4972 0 22.1503 1.65307 22.1503 3.69224V20.3074C22.1503 22.3466 20.4972 23.9996 18.458 23.9996C16.4189 23.9996 14.7658 22.3466 14.7658 20.3074V3.69224C14.7658 1.65307 16.4189 0 18.458 0Z" fill="currentColor" />
    </IconBase>
  );
};

export default Pause;

import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type BrowserWindowProps = Omit<IconProps, 'children'>;

/**
 * BrowserWindowIcon
 * 
 * Converted from Media/Device/BrowserWindowIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const BrowserWindow: React.FC<BrowserWindowProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M1.25002 5.25C1.25002 4.2835 2.03351 3.5 3.00001 3.5H20.9999C21.9664 3.5 22.7499 4.2835 22.7499 5.25V18.75C22.7499 19.7165 21.9664 20.5 20.9999 20.5H3.00001C2.03352 20.5 1.25002 19.7165 1.25002 18.75V5.25ZM3.25002 5.5V18.5H20.7499V5.5H3.25002Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M1.25 9.36947C1.25 8.81719 1.69772 8.36947 2.25 8.36947H21.7499C22.3022 8.36947 22.7499 8.81719 22.7499 9.36947C22.7499 9.92176 22.3022 10.3695 21.7499 10.3695H2.25C1.69772 10.3695 1.25 9.92176 1.25 9.36947Z" fill="currentColor" />
      <path d="M5.99999 6.95526C5.99999 7.36948 5.66421 7.70526 5.25 7.70526C4.83578 7.70526 4.5 7.36948 4.5 6.95526C4.5 6.54105 4.83578 6.20526 5.25 6.20526C5.66421 6.20526 5.99999 6.54105 5.99999 6.95526Z" fill="currentColor" />
      <path d="M8.99999 6.95526C8.99999 7.36948 8.66421 7.70526 8.25 7.70526C7.83578 7.70526 7.5 7.36948 7.5 6.95526C7.5 6.54105 7.83578 6.20526 8.25 6.20526C8.66421 6.20526 8.99999 6.54105 8.99999 6.95526Z" fill="currentColor" />
    </IconBase>
  );
};

export default BrowserWindow;

import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type FullSelectProps = Omit<IconProps, 'children'>;

/**
 * FullSelectIcon
 * 
 * Converted from Formatting/Collapse/FullSelectIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const FullSelect: React.FC<FullSelectProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M3.5 3.5V20.5H20.4999V3.5H3.5ZM2.99999 1.5C2.17157 1.5 1.5 2.17157 1.5 2.99999V21C1.5 21.8284 2.17157 22.5 2.99999 22.5H20.9999C21.8283 22.5 22.4999 21.8284 22.4999 21V2.99999C22.4999 2.17157 21.8283 1.5 20.9999 1.5H2.99999Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M17.5646 7.91783C17.9551 8.30835 17.9551 8.94151 17.5646 9.33204L10.8146 16.082C10.6271 16.2696 10.3727 16.3749 10.1075 16.3749C9.8423 16.3749 9.58795 16.2696 9.40041 16.082L6.40043 13.082C6.0099 12.6915 6.00991 12.0583 6.40043 11.6678C6.79096 11.2773 7.42412 11.2773 7.81464 11.6678L10.1075 13.9607L16.1504 7.91783C16.5409 7.5273 17.1741 7.5273 17.5646 7.91783Z" fill="currentColor" />
    </IconBase>
  );
};

export default FullSelect;

import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type SendProps = Omit<IconProps, 'children'>;

/**
 * SendIcon
 * 
 * Converted from Arrows/Chat/SendIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Send: React.FC<SendProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M16.0491 22.8852C15.4557 24.4129 13.2751 24.3573 12.7604 22.8012L10.0461 14.5948L1.17624 11.5252C-0.360161 10.9935 -0.401925 8.83591 1.11274 8.24516L21.713 0.210662C23.1301 -0.342047 24.528 1.05388 23.9773 2.47179L16.0491 22.8852ZM16.5404 9.5147L11.9806 14.0745L14.4388 21.5068L21.9054 2.28237L2.4781 9.85938L10.5678 12.6589L15.1262 8.10049C15.5167 7.70996 16.1499 7.70996 16.5404 8.10049C16.9309 8.49101 16.9309 9.12418 16.5404 9.5147Z" fill="currentColor" />
    </IconBase>
  );
};

export default Send;

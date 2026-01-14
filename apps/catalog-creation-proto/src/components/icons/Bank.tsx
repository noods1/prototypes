import React from 'react';
import { IconBase, IconProps } from '../IconBase';

type BankProps = Omit<IconProps, 'children'>;

/**
 * BankIcon
 * 
 * Converted from BankIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Bank: React.FC<BankProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M6 13.0312L6 17.0469" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.0156 13.0312L12.0156 17.0469" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.0312 13.0312L18.0313 17.0469" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 20.0312H19.9375" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 3.32422L20.0078 10.0039L4 10L12 3.32422Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </IconBase>
  );
};

export default Bank;

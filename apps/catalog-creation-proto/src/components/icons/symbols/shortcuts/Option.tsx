import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type OptionProps = Omit<IconProps, 'children'>;

/**
 * OptionIcon
 * 
 * Converted from Symbols/Shortcuts/OptionIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Option: React.FC<OptionProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M8.98828 4.99805L9.15625 5.0127C9.54126 5.07833 9.85907 5.36511 9.95703 5.75391L12.791 17.001H21.2734C21.8257 17.001 22.2734 17.4487 22.2734 18.001C22.2734 18.5533 21.8257 19.001 21.2734 19.001H12.0127C11.5545 19.001 11.1549 18.6894 11.043 18.2451L8.20898 6.99805H2.72656C2.17428 6.99805 1.72656 6.55033 1.72656 5.99805C1.72656 5.44576 2.17428 4.99805 2.72656 4.99805H8.98828Z" fill="currentColor" />
      <path d="M21.2422 4.99805L21.3447 5.00293C21.8489 5.05426 22.2422 5.48037 22.2422 5.99805C22.2422 6.51572 21.8489 6.94183 21.3447 6.99316L21.2422 6.99805L12.7891 6.99805C12.2368 6.99805 11.7891 6.55033 11.7891 5.99805C11.7891 5.44576 12.2368 4.99805 12.7891 4.99805L21.2422 4.99805Z" fill="currentColor" />
    </IconBase>
  );
};

export default Option;

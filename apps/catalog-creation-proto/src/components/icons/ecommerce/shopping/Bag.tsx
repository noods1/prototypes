import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type BagProps = Omit<IconProps, 'children'>;

/**
 * BagIcon
 * 
 * Converted from ECommerce/Shopping/BagIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Bag: React.FC<BagProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M3.46238 8.15287C3.5139 7.22552 4.2809 6.49994 5.20968 6.49994H18.7906C19.7194 6.49994 20.4864 7.22552 20.5379 8.15287L21.2046 20.1529C21.2603 21.156 20.462 21.9999 19.4573 21.9999H4.54302C3.53837 21.9999 2.73999 21.156 2.79572 20.1529L3.46238 8.15287ZM5.44618 8.49994L4.8073 19.9999H19.193L18.5541 8.49994H5.44618Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M12.0002 4C10.0672 4 8.50021 5.567 8.50021 7.5H6.50021C6.50021 4.46244 8.96263 2 12.0002 2C15.0377 2 17.5002 4.46244 17.5002 7.5H15.5002C15.5002 5.567 13.9332 4 12.0002 4Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M12.0002 13.2499C13.9332 13.2499 15.5002 11.683 15.5002 9.74995H17.5002C17.5002 12.7875 15.0377 15.2499 12.0002 15.2499C8.96262 15.2499 6.5002 12.7875 6.5002 9.74995H8.5002C8.5002 11.683 10.0672 13.2499 12.0002 13.2499Z" fill="currentColor" />
    </IconBase>
  );
};

export default Bag;

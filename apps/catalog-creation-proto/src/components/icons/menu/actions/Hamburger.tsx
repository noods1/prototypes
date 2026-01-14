import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type HamburgerProps = Omit<IconProps, 'children'>;

/**
 * HamburgerIcon
 * 
 * Converted from Menu/Actions/HamburgerIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Hamburger: React.FC<HamburgerProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M21.5 11.1978L21.6025 11.2027C22.1068 11.2539 22.5 11.68 22.5 12.1978C22.5 12.7156 22.1068 13.1417 21.6025 13.1929L21.5 13.1978H2.5C1.94772 13.1978 1.5 12.7501 1.5 12.1978C1.5 11.6455 1.94772 11.1978 2.5 11.1978H21.5Z" fill="currentColor" />
      <path d="M21.5001 4.46875L21.6027 4.47363C22.1069 4.52483 22.5001 4.95097 22.5001 5.46875C22.5001 5.98653 22.1069 6.41267 21.6027 6.46387L21.5001 6.46875H2.50012C1.94784 6.46875 1.50012 6.02103 1.50012 5.46875C1.50012 4.91647 1.94784 4.46875 2.50012 4.46875H21.5001Z" fill="currentColor" />
      <path d="M21.5 17.5308L21.6025 17.5357C22.1068 17.5869 22.5 18.0131 22.5 18.5308C22.5 19.0486 22.1068 19.4748 21.6025 19.526L21.5 19.5308H2.5C1.94772 19.5308 1.5 19.0831 1.5 18.5308C1.5 17.9786 1.94772 17.5308 2.5 17.5308H21.5Z" fill="currentColor" />
    </IconBase>
  );
};

export default Hamburger;

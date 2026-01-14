import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type MarkedFlagProps = Omit<IconProps, 'children'>;

/**
 * MarkedFlagIcon
 * 
 * Converted from Formatting/Flag/MarkedFlagIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const MarkedFlag: React.FC<MarkedFlagProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M3.73584 0.5C4.28812 0.5 4.73584 0.947715 4.73584 1.5L4.73584 22.5C4.73584 23.0523 4.28813 23.5 3.73584 23.5C3.18356 23.5 2.73584 23.0523 2.73584 22.5L2.73584 1.5C2.73584 0.947715 3.18356 0.5 3.73584 0.5Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M17.2251 3.50003H4.9856V11.5H17.2251L14.6591 9.21907C13.6298 8.30415 13.6298 6.69591 14.6591 5.78099L17.2251 3.50003ZM2.9856 1.50003V13.5H20.5129C21.2025 13.5 21.5266 12.6476 21.0111 12.1895L15.9878 7.72425C15.8535 7.60492 15.8535 7.39515 15.9878 7.27581L21.0111 2.81058C21.5266 2.35241 21.2025 1.50003 20.5129 1.50003H2.9856Z" fill="currentColor" />
    </IconBase>
  );
};

export default MarkedFlag;

import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type EnterArrowProps = Omit<IconProps, 'children'>;

/**
 * EnterArrowIcon
 * 
 * Converted from Arrows/Enter/EnterArrowIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const EnterArrow: React.FC<EnterArrowProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M20.0738 3.38574C20.6261 3.38574 21.0738 3.83346 21.0738 4.38574V14.4559C21.0738 16.2729 19.6072 17.8814 17.7164 17.8814L6.40074 17.8814L7.45068 18.8954C7.84795 19.2791 7.85898 19.9121 7.47532 20.3094C7.09165 20.7067 6.45858 20.7177 6.06132 20.334L3.2311 17.6007C3.0396 17.4158 2.92975 17.1621 2.92589 16.8959C2.92202 16.6297 3.02446 16.373 3.2105 16.1826L6.04072 13.2858C6.42668 12.8907 7.0598 12.8834 7.45484 13.2693C7.84988 13.6553 7.85724 14.2884 7.47128 14.6835L6.30085 15.8814L17.7164 15.8814C18.4296 15.8814 19.0738 15.2429 19.0738 14.4559V4.38574C19.0738 3.83346 19.5215 3.38574 20.0738 3.38574Z" fill="currentColor" />
    </IconBase>
  );
};

export default EnterArrow;

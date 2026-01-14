import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type NewWindowProps = Omit<IconProps, 'children'>;

/**
 * NewWindowIcon
 * 
 * Converted from Arrows/Transfer/NewWindowIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const NewWindow: React.FC<NewWindowProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M8.23945 2.97559L3.70556 2.97559C3.29135 2.97559 2.95557 3.31137 2.95557 3.72558V20.0314C2.95557 20.4456 3.29135 20.7814 3.70556 20.7814H20.0848C20.499 20.7814 20.8348 20.4456 20.8348 20.0314V15.4264" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.4102 2.97559H20.9101" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20.9053 11.2078V3.00098" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.834 12L20.833 3.00106" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </IconBase>
  );
};

export default NewWindow;

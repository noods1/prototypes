import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type PlusProps = Omit<IconProps, 'children'>;

/**
 * PlusIcon
 * 
 * Converted from Symbols/Addition/PlusIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Plus: React.FC<PlusProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M11.9995 1.59668C12.4729 1.59668 12.8567 1.98043 12.8567 2.45382V21.5456C12.8567 22.019 12.4729 22.4028 11.9995 22.4028C11.5261 22.4028 11.1424 22.019 11.1424 21.5456V2.45382C11.1424 1.98043 11.5261 1.59668 11.9995 1.59668Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M1.59668 11.9997C1.59668 11.5263 1.98043 11.1426 2.45382 11.1426L21.5456 11.1426C22.019 11.1426 22.4028 11.5263 22.4028 11.9997C22.4028 12.4731 22.019 12.8569 21.5456 12.8569L2.45382 12.8569C1.98043 12.8569 1.59668 12.4731 1.59668 11.9997Z" fill="currentColor" />
    </IconBase>
  );
};

export default Plus;

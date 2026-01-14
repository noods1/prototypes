import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type ReduceCircleProps = Omit<IconProps, 'children'>;

/**
 * ReduceCircleIcon
 * 
 * Converted from Formatting/Circular/ReduceCircleIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const ReduceCircle: React.FC<ReduceCircleProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M5.01692 11.9926C5.01692 11.4403 5.46464 10.9926 6.01692 10.9926H18.0169C18.5692 10.9926 19.0169 11.4403 19.0169 11.9926C19.0169 12.5448 18.5692 12.9926 18.0169 12.9926H6.01692C5.46464 12.9926 5.01692 12.5448 5.01692 11.9926Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M3.5 12C3.5 16.6944 7.30557 20.5 12 20.5C16.6943 20.5 20.4999 16.6944 20.4999 12C20.4999 7.30559 16.6943 3.5 12 3.5C7.30557 3.5 3.5 7.30559 3.5 12ZM12 1.5C6.20099 1.5 1.5 6.20103 1.5 12C1.5 17.799 6.20099 22.5 12 22.5C17.7989 22.5 22.4999 17.799 22.4999 12C22.4999 6.20103 17.7989 1.5 12 1.5Z" fill="currentColor" />
    </IconBase>
  );
};

export default ReduceCircle;

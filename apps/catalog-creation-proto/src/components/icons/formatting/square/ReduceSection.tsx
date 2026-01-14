import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type ReduceSectionProps = Omit<IconProps, 'children'>;

/**
 * ReduceSectionIcon
 * 
 * Converted from Formatting/Square/ReduceSectionIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const ReduceSection: React.FC<ReduceSectionProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M5.01692 11.9926C5.01692 11.4403 5.46464 10.9926 6.01692 10.9926H18.0169C18.5692 10.9926 19.0169 11.4403 19.0169 11.9926C19.0169 12.5448 18.5692 12.9926 18.0169 12.9926H6.01692C5.46464 12.9926 5.01692 12.5448 5.01692 11.9926Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M3.5 3.5V20.5H20.4999V3.5H3.5ZM2.99999 1.5C2.17157 1.5 1.5 2.17157 1.5 2.99999V21C1.5 21.8284 2.17157 22.5 2.99999 22.5H20.9999C21.8283 22.5 22.4999 21.8284 22.4999 21V2.99999C22.4999 2.17157 21.8283 1.5 20.9999 1.5H2.99999Z" fill="currentColor" />
    </IconBase>
  );
};

export default ReduceSection;

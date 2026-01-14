import React from 'react';
import { IconBase, IconProps } from '../../../IconBase';

type LeftProps = Omit<IconProps, 'children'>;

/**
 * LeftIcon
 * 
 * Converted from Arrows/Chevron/Filled/LeftIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Left: React.FC<LeftProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M6.58203 12.0006L15.418 3.11816L15.418 20.8828L6.58203 12.0006Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </IconBase>
  );
};

export default Left;

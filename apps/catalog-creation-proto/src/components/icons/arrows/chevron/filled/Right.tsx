import React from 'react';
import { IconBase, IconProps } from '../../../IconBase';

type RightProps = Omit<IconProps, 'children'>;

/**
 * RightIcon
 * 
 * Converted from Arrows/Chevron/Filled/RightIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Right: React.FC<RightProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M16.418 12.0006L7.58203 3.11816L7.58203 20.8828L16.418 12.0006Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </IconBase>
  );
};

export default Right;

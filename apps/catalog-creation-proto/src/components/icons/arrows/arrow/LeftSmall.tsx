import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type LeftSmallProps = Omit<IconProps, 'children'>;

/**
 * LeftSmallIcon
 * 
 * Converted from Arrows/Arrow/LeftSmallIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const LeftSmall: React.FC<LeftSmallProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M4.44065 12.9999H21.6067C22.159 12.9999 22.6067 12.5522 22.6067 11.9999C22.6067 11.4476 22.159 10.9999 21.6067 10.9999L4.44073 10.9999L10.3315 4.81466C10.7123 4.41473 10.6969 3.78175 10.297 3.40086C9.89704 3.01998 9.26407 3.03542 8.88318 3.43535L1.87582 10.7931C1.23215 11.4689 1.23215 12.531 1.87583 13.2069L8.88318 20.5646C9.26407 20.9645 9.89705 20.9799 10.297 20.5991C10.6969 20.2182 10.7123 19.5852 10.3315 19.1853L4.44065 12.9999Z" fill="currentColor" />
    </IconBase>
  );
};

export default LeftSmall;

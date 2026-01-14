import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type RightSmallProps = Omit<IconProps, 'children'>;

/**
 * RightSmallIcon
 * 
 * Converted from Arrows/Arrow/RightSmallIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const RightSmall: React.FC<RightSmallProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M19.56 11L2.39258 11C1.84029 11 1.39258 11.4477 1.39258 12C1.39258 12.5523 1.84029 13 2.39258 13L19.5599 13L13.6692 19.1853C13.2883 19.5852 13.3037 20.2182 13.7036 20.5991C14.1036 20.9799 14.7365 20.9645 15.1174 20.5646L22.1248 13.2069C22.7685 12.531 22.7685 11.4689 22.1248 10.7931L15.1174 3.43535C14.7365 3.03542 14.1036 3.01998 13.7036 3.40086C13.3037 3.78175 13.2883 4.41473 13.6692 4.81466L19.56 11Z" fill="currentColor" />
    </IconBase>
  );
};

export default RightSmall;

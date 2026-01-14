import React from 'react';
import { IconBase, IconProps } from '../../../IconBase';

type ThumbsDownProps = Omit<IconProps, 'children'>;

/**
 * ThumbsDownIcon
 * 
 * Converted from Human/Feedback/Filled/ThumbsDownIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const ThumbsDown: React.FC<ThumbsDownProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M14.5962 20.1488C14.3626 20.5122 13.9603 20.7319 13.5283 20.7319C12.1437 20.7319 11.0213 19.6095 11.0213 18.2249V15.4819H4.62277C3.55502 15.4819 2.78413 14.4599 3.07746 13.4332L5.64889 4.4332C5.84602 3.74326 6.47664 3.26758 7.1942 3.26758H17.5585L17.5585 15.5408L14.5962 20.1488Z" fill="currentColor" />
      <path d="M19.0588 15.4819H19.3785C20.2661 15.4819 20.9856 14.7623 20.9856 13.8747V4.87472C20.9856 3.98712 20.2661 3.26758 19.3785 3.26758H19.0588V15.4819Z" fill="currentColor" />
    </IconBase>
  );
};

export default ThumbsDown;

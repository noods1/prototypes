import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type LeftProps = Omit<IconProps, 'children'>;

/**
 * LeftIcon
 * 
 * Converted from Arrows/DoubleChevron/LeftIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Left: React.FC<LeftProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M5.21815 11.3753C4.92598 11.7406 4.92598 12.2595 5.21815 12.6247L11.2181 20.1247C11.5631 20.556 12.1924 20.6259 12.6237 20.2809C13.055 19.9359 13.1249 19.3066 12.7799 18.8753L7.27965 12L12.7799 5.12473C13.1249 4.69347 13.055 4.06418 12.6237 3.71917C12.1924 3.37416 11.5631 3.44408 11.2181 3.87534L5.21815 11.3753Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M11.2198 11.3754C10.9277 11.7406 10.9277 12.2596 11.2198 12.6248L17.2198 20.1248C17.5648 20.5561 18.1941 20.626 18.6254 20.281C19.0566 19.936 19.1266 19.3067 18.7815 18.8754L13.2813 12.0001L18.7815 5.12479C19.1266 4.69353 19.0566 4.06424 18.6254 3.71923C18.1941 3.37422 17.5648 3.44414 17.2198 3.8754L11.2198 11.3754Z" fill="currentColor" />
    </IconBase>
  );
};

export default Left;

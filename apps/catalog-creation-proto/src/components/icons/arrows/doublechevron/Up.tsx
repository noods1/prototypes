import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type UpProps = Omit<IconProps, 'children'>;

/**
 * UpIcon
 * 
 * Converted from Arrows/DoubleChevron/UpIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Up: React.FC<UpProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12.6247 5.21913C12.2595 4.92696 11.7405 4.92696 11.3753 5.21913L3.87534 11.2191C3.44408 11.5641 3.37416 12.1934 3.71917 12.6247C4.06418 13.056 4.69347 13.1259 5.12473 12.7809L12 7.28063L18.8753 12.7809C19.3065 13.1259 19.9358 13.056 20.2808 12.6247C20.6258 12.1934 20.5559 11.5641 20.1247 11.2191L12.6247 5.21913Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M12.6247 11.2193C12.2595 10.9271 11.7405 10.9271 11.3753 11.2193L3.87534 17.2193C3.44408 17.5643 3.37416 18.1936 3.71917 18.6248C4.06418 19.0561 4.69347 19.126 5.12473 18.781L12 13.2808L18.8753 18.781C19.3065 19.126 19.9358 19.0561 20.2808 18.6248C20.6258 18.1936 20.5559 17.5643 20.1247 17.2193L12.6247 11.2193Z" fill="currentColor" />
    </IconBase>
  );
};

export default Up;

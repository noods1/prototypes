import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type DownProps = Omit<IconProps, 'children'>;

/**
 * DownIcon
 * 
 * Converted from Arrows/DoubleChevron/DownIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Down: React.FC<DownProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M11.3753 18.7808C11.7405 19.073 12.2595 19.073 12.6247 18.7808L20.1247 12.7808C20.5559 12.4358 20.6259 11.8065 20.2808 11.3752C19.9358 10.944 19.3065 10.8741 18.8753 11.2191L12 16.7193L5.12474 11.2191C4.69348 10.8741 4.06419 10.944 3.71918 11.3752C3.37417 11.8065 3.44409 12.4358 3.87535 12.7808L11.3753 18.7808Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M11.3753 12.7809C11.7405 13.0731 12.2595 13.0731 12.6247 12.7809L20.1247 6.78091C20.5559 6.4359 20.6258 5.8066 20.2808 5.37534C19.9358 4.94408 19.3065 4.87416 18.8753 5.21917L12 10.7194L5.12473 5.21917C4.69347 4.87416 4.06418 4.94408 3.71917 5.37534C3.37416 5.8066 3.44408 6.43589 3.87534 6.7809L11.3753 12.7809Z" fill="currentColor" />
    </IconBase>
  );
};

export default Down;

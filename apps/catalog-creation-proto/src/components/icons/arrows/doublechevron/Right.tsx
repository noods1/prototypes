import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type RightProps = Omit<IconProps, 'children'>;

/**
 * RightIcon
 * 
 * Converted from Arrows/DoubleChevron/RightIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Right: React.FC<RightProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M18.781 12.6247C19.0732 12.2595 19.0732 11.7406 18.781 11.3753L12.781 3.87534C12.436 3.44408 11.8067 3.37416 11.3755 3.71917C10.9442 4.06417 10.8743 4.69347 11.2193 5.12473L16.7195 12L11.2193 18.8753C10.8743 19.3066 10.9442 19.9359 11.3755 20.2809C11.8067 20.6259 12.436 20.556 12.781 20.1247L18.781 12.6247Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M12.7809 12.6247C13.0731 12.2595 13.0731 11.7406 12.7809 11.3753L6.78091 3.87535C6.4359 3.44408 5.80661 3.37416 5.37535 3.71917C4.94408 4.06418 4.87416 4.69347 5.21917 5.12473L10.7194 12L5.21917 18.8753C4.87416 19.3066 4.94408 19.9359 5.37534 20.2809C5.80661 20.6259 6.4359 20.556 6.78091 20.1247L12.7809 12.6247Z" fill="currentColor" />
    </IconBase>
  );
};

export default Right;

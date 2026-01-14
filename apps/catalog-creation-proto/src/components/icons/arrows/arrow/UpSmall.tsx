import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type UpSmallProps = Omit<IconProps, 'children'>;

/**
 * UpSmallIcon
 * 
 * Converted from Arrows/Arrow/UpSmallIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const UpSmall: React.FC<UpSmallProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M11.0016 4.43862L11.0016 21.6069C11.0016 22.1592 11.4493 22.6069 12.0016 22.6069C12.5539 22.6069 13.0016 22.1592 13.0016 21.6069L13.0016 4.4418L19.1852 10.331C19.5851 10.7119 20.2181 10.6964 20.599 10.2965C20.9799 9.89659 20.9644 9.26361 20.5645 8.88273L13.2068 1.87534C12.531 1.23166 11.4689 1.23166 10.793 1.87534L3.43534 8.88273C3.03541 9.26361 3.01998 9.89659 3.40087 10.2965C3.78176 10.6964 4.41473 10.7119 4.81466 10.331L11.0016 4.43862Z" fill="currentColor" />
    </IconBase>
  );
};

export default UpSmall;

import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type DownSmallProps = Omit<IconProps, 'children'>;

/**
 * DownSmallIcon
 * 
 * Converted from Arrows/Arrow/DownSmallIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const DownSmall: React.FC<DownSmallProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M13.0003 19.5589L13.0003 2.39258C13.0003 1.84029 12.5526 1.39258 12.0003 1.39258C11.448 1.39258 11.0003 1.84029 11.0003 2.39258L11.0003 19.5597L4.81466 13.6685C4.41473 13.2876 3.78176 13.3031 3.40087 13.703C3.01998 14.1029 3.03541 14.7359 3.43534 15.1168L10.793 22.1242C11.4689 22.7679 12.531 22.7679 13.2068 22.1242L20.5645 15.1168C20.9644 14.7359 20.9799 14.1029 20.599 13.703C20.2181 13.3031 19.5851 13.2876 19.1852 13.6685L13.0003 19.5589Z" fill="currentColor" />
    </IconBase>
  );
};

export default DownSmall;

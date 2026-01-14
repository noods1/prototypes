import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type DownProps = Omit<IconProps, 'children'>;

/**
 * DownIcon
 * 
 * Converted from Arrows/Arrow/DownIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Down: React.FC<DownProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M13.008 20.3017L13.008 1.64258C13.008 1.09029 12.5603 0.642578 12.008 0.642578C11.4557 0.642578 11.008 1.09029 11.008 1.64258L11.008 20.3169L6.68966 16.2042C6.28973 15.8233 5.65676 15.8387 5.27587 16.2387C4.89498 16.6386 4.91041 17.2716 5.31034 17.6525L10.7931 22.8742C11.4689 23.5179 12.531 23.5179 13.2069 22.8742L18.6896 17.6525C19.0895 17.2716 19.105 16.6386 18.7241 16.2387C18.3432 15.8387 17.7102 15.8233 17.3103 16.2042L13.008 20.3017Z" fill="currentColor" />
    </IconBase>
  );
};

export default Down;

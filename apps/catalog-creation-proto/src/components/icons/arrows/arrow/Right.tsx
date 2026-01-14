import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type RightProps = Omit<IconProps, 'children'>;

/**
 * RightIcon
 * 
 * Converted from Arrows/Arrow/RightIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Right: React.FC<RightProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M20.3029 10.9927H1.64209C1.08981 10.9927 0.64209 11.4404 0.64209 11.9927C0.64209 12.545 1.08981 12.9927 1.64209 12.9927H20.3168L16.2048 17.3103C15.8239 17.7103 15.8393 18.3433 16.2392 18.7241C16.6392 19.105 17.2722 19.0896 17.653 18.6897L22.8747 13.2069C23.5184 12.531 23.5184 11.469 22.8747 10.7931L17.653 5.31035C17.2722 4.91042 16.6392 4.89498 16.2392 5.27586C15.8393 5.65675 15.8239 6.28973 16.2048 6.68966L20.3029 10.9927Z" fill="currentColor" />
    </IconBase>
  );
};

export default Right;

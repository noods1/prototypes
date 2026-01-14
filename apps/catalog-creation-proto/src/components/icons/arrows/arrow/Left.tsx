import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type LeftProps = Omit<IconProps, 'children'>;

/**
 * LeftIcon
 * 
 * Converted from Arrows/Arrow/LeftIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Left: React.FC<LeftProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M3.69718 10.9927H22.3575C22.9098 10.9927 23.3575 11.4404 23.3575 11.9927C23.3575 12.545 22.9098 12.9927 22.3575 12.9927H3.68322L7.79529 17.3103C8.17618 17.7103 8.16074 18.3433 7.76081 18.7241C7.36088 19.105 6.7279 19.0896 6.34702 18.6897L1.12533 13.2069C0.481658 12.531 0.48166 11.469 1.12534 10.7931L6.34702 5.31035C6.7279 4.91042 7.36088 4.89498 7.76081 5.27586C8.16074 5.65675 8.17618 6.28973 7.79529 6.68966L3.69718 10.9927Z" fill="currentColor" />
    </IconBase>
  );
};

export default Left;

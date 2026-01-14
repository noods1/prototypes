import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type ToTopProps = Omit<IconProps, 'children'>;

/**
 * ToTopIcon
 * 
 * Converted from Arrows/Movement/ToTopIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const ToTop: React.FC<ToTopProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M20.2498 2.50098C20.802 2.50098 21.2498 2.05326 21.2498 1.50098C21.2498 0.948692 20.802 0.500977 20.2498 0.500977H3.75C3.19772 0.500977 2.75 0.948692 2.75 1.50098C2.75 2.05326 3.19772 2.50098 3.75 2.50098H20.2498Z" fill="currentColor" />
      <path d="M10.7893 4.00718C11.4652 3.36349 12.5273 3.36349 13.2031 4.00718L20.0604 10.538C20.4603 10.9189 20.4758 11.5518 20.0949 11.9518C19.714 12.3517 19.081 12.3671 18.6811 11.9862L12.9944 6.5703L12.9944 22.4995C12.9944 23.0518 12.5467 23.4995 11.9944 23.4995C11.4421 23.4995 10.9944 23.0518 10.9944 22.4995L10.9944 6.57379L5.31137 11.9862C4.91144 12.3671 4.27846 12.3517 3.89757 11.9518C3.51669 11.5518 3.53212 10.9189 3.93205 10.538L10.7893 4.00718Z" fill="currentColor" />
    </IconBase>
  );
};

export default ToTop;

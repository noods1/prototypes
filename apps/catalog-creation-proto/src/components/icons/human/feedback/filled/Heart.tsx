import React from 'react';
import { IconBase, IconProps } from '../../../IconBase';

type HeartProps = Omit<IconProps, 'children'>;

/**
 * HeartIcon
 * 
 * Converted from Human/Feedback/Filled/HeartIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Heart: React.FC<HeartProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M12.0005 4.21191C14.4667 1.99818 18.2782 2.07183 20.6538 4.45215C23.0295 6.83273 23.1113 10.626 20.9019 13.0996L13.061 20.9521C12.4751 21.539 11.524 21.5391 10.938 20.9521L3.09814 13.0996C0.888744 10.626 0.970639 6.82673 3.34521 4.45215C5.72236 2.075 9.52704 1.99516 12.0005 4.21191Z" fill="currentColor" />
    </IconBase>
  );
};

export default Heart;

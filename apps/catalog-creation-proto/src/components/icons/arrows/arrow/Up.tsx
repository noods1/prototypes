import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type UpProps = Omit<IconProps, 'children'>;

/**
 * UpIcon
 * 
 * Converted from Arrows/Arrow/UpIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Up: React.FC<UpProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M10.994 3.69594L10.994 22.3569C10.994 22.9092 11.4417 23.3569 11.994 23.3569C12.5462 23.3569 12.994 22.9092 12.994 22.3569L12.994 3.68448L17.3103 7.79531C17.7102 8.1762 18.3432 8.16077 18.7241 7.76084C19.105 7.36091 19.0895 6.72793 18.6896 6.34704L13.2069 1.12534C12.531 0.481655 11.4689 0.481659 10.7931 1.12534L5.31034 6.34704C4.91041 6.72793 4.89498 7.36091 5.27587 7.76084C5.65676 8.16077 6.28973 8.1762 6.68966 7.79531L10.994 3.69594Z" fill="currentColor" />
    </IconBase>
  );
};

export default Up;

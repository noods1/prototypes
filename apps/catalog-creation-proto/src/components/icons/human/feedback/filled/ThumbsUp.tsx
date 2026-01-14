import React from 'react';
import { IconBase, IconProps } from '../../../IconBase';

type ThumbsUpProps = Omit<IconProps, 'children'>;

/**
 * ThumbsUpIcon
 * 
 * Converted from Human/Feedback/Filled/ThumbsUpIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const ThumbsUp: React.FC<ThumbsUpProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M9.40401 3.85063C9.63762 3.48724 10.04 3.26758 10.472 3.26758C11.8565 3.26758 12.9789 4.38998 12.9789 5.77454V8.51758H19.3775C20.4452 8.51758 21.2161 9.53957 20.9228 10.5662L18.3514 19.5662C18.1542 20.2562 17.5236 20.7319 16.8061 20.7319H6.44174L6.44174 8.45861L9.40401 3.85063Z" fill="currentColor" />
      <path d="M4.94142 8.51758H4.62179C3.73419 8.51758 3.01465 9.23712 3.01465 10.1247V19.1247C3.01465 20.0123 3.73419 20.7319 4.62179 20.7319H4.94142L4.94142 8.51758Z" fill="currentColor" />
    </IconBase>
  );
};

export default ThumbsUp;

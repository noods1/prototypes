import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type ThumbsUpProps = Omit<IconProps, 'children'>;

/**
 * ThumbsUpIcon
 * 
 * Converted from Human/Feedback/ThumbsUpIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const ThumbsUp: React.FC<ThumbsUpProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M10.7517 5.18829L7.87147 9.6687V18.875H16.6171L19.0457 10.375H11.1215V5.77481C11.1215 5.51622 10.9704 5.29291 10.7517 5.18829ZM9.28351 3.77366C9.5434 3.36938 9.99103 3.125 10.4716 3.125C11.9351 3.125 13.1215 4.31136 13.1215 5.77481V8.375H19.3771C20.5398 8.375 21.3792 9.48783 21.0598 10.6058L18.4884 19.6058C18.2737 20.357 17.587 20.875 16.8057 20.875H5.87147V9.0813L9.28351 3.77366Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M2.87158 10.1251C2.87158 9.15857 3.65508 8.37507 4.62158 8.37507H7.87157V20.8751H4.62158C3.65508 20.8751 2.87158 20.0916 2.87158 19.1251V10.1251ZM4.87158 10.3751V18.8751H5.87157V10.3751H4.87158Z" fill="currentColor" />
    </IconBase>
  );
};

export default ThumbsUp;

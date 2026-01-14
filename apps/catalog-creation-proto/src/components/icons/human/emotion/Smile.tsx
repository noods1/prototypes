import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type SmileProps = Omit<IconProps, 'children'>;

/**
 * SmileIcon
 * 
 * Converted from Human/Emotion/SmileIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Smile: React.FC<SmileProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M5.22047 12.793C5.611 12.4025 6.24416 12.4025 6.63469 12.793C8.3679 14.5262 10.1886 15.3126 11.9276 15.3126C13.6665 15.3126 15.4872 14.5262 17.2204 12.793C17.6109 12.4025 18.2441 12.4025 18.6346 12.793C19.0252 13.1835 19.0252 13.8167 18.6346 14.2072C16.6179 16.224 14.3136 17.3126 11.9276 17.3126C9.54147 17.3126 7.23724 16.224 5.22047 14.2072C4.82994 13.8167 4.82995 13.1835 5.22047 12.793Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M12 20.75C16.8324 20.75 20.7499 16.8325 20.7499 12C20.7499 7.16751 16.8324 3.25 12 3.25C7.16749 3.25 3.25 7.1675 3.25 12C3.25 16.8325 7.16749 20.75 12 20.75ZM22.7499 12C22.7499 17.9371 17.937 22.75 12 22.75C6.06291 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06291 1.25 12 1.25C17.937 1.25 22.7499 6.06295 22.7499 12Z" fill="currentColor" />
    </IconBase>
  );
};

export default Smile;

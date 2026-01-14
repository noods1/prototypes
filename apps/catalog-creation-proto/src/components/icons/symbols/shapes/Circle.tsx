import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type CircleProps = Omit<IconProps, 'children'>;

/**
 * CircleIcon
 * 
 * Converted from Symbols/Shapes/CircleIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Circle: React.FC<CircleProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 20.75C16.8324 20.75 20.7499 16.8325 20.7499 12C20.7499 7.16751 16.8324 3.25 12 3.25C7.16749 3.25 3.25 7.1675 3.25 12C3.25 16.8325 7.16749 20.75 12 20.75ZM22.7499 12C22.7499 17.9371 17.937 22.75 12 22.75C6.06291 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06291 1.25 12 1.25C17.937 1.25 22.7499 6.06295 22.7499 12Z" fill="currentColor" />
    </IconBase>
  );
};

export default Circle;

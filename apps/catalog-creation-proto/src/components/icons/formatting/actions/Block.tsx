import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type BlockProps = Omit<IconProps, 'children'>;

/**
 * BlockIcon
 * 
 * Converted from Formatting/Actions/BlockIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Block: React.FC<BlockProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 20.75C16.8324 20.75 20.7499 16.8325 20.7499 12C20.7499 7.16751 16.8324 3.25 12 3.25C7.16749 3.25 3.25 7.1675 3.25 12C3.25 16.8325 7.16749 20.75 12 20.75ZM22.7499 12C22.7499 17.9371 17.937 22.75 12 22.75C6.06291 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06291 1.25 12 1.25C17.937 1.25 22.7499 6.06295 22.7499 12Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M19.5868 4.34371C19.9773 4.73423 19.9773 5.3674 19.5868 5.75793L5.947 19.3979C5.55648 19.7884 4.92332 19.7885 4.53279 19.3979C4.14226 19.0074 4.14226 18.3742 4.53278 17.9837L18.1726 4.34372C18.5631 3.95319 19.1963 3.95319 19.5868 4.34371Z" fill="currentColor" />
    </IconBase>
  );
};

export default Block;

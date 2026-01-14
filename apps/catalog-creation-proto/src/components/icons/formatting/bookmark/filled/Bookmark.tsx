import React from 'react';
import { IconBase, IconProps } from '../../../IconBase';

type BookmarkProps = Omit<IconProps, 'children'>;

/**
 * BookmarkIcon
 * 
 * Converted from Formatting/Bookmark/Filled/BookmarkIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Bookmark: React.FC<BookmarkProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M4.78711 3.34401C4.78711 2.54726 5.433 1.90137 6.22975 1.90137H17.7709C18.5676 1.90137 19.2135 2.54726 19.2135 3.34401V18.7786C19.2135 20.04 17.7087 20.6939 16.7865 19.8333L12.3941 15.7336C12.1723 15.5266 11.8283 15.5266 11.6066 15.7336L7.21409 19.8333C6.29193 20.6939 4.78711 20.04 4.78711 18.7786V3.34401Z" fill="currentColor" />
    </IconBase>
  );
};

export default Bookmark;

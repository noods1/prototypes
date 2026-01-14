import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type AddBookmarkProps = Omit<IconProps, 'children'>;

/**
 * AddBookmarkIcon
 * 
 * Converted from Formatting/Bookmark/AddBookmarkIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const AddBookmark: React.FC<AddBookmarkProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M6.78662 4.83887V18.4335L10.2415 15.209C11.2316 14.2849 12.7681 14.2848 13.7582 15.209L17.213 18.4335V4.83887H6.78662ZM6.22926 2.83887C5.43251 2.83887 4.78662 3.48476 4.78662 4.28151V19.7161C4.78662 20.9775 6.29144 21.6314 7.21361 20.7708L11.6061 16.6711C11.8278 16.4641 12.1719 16.4641 12.3936 16.6711L16.7861 20.7708C17.7082 21.6314 19.213 20.9775 19.213 19.7161V4.28151C19.213 3.48476 18.5672 2.83887 17.7704 2.83887H6.22926Z" fill="currentColor" />
    </IconBase>
  );
};

export default AddBookmark;

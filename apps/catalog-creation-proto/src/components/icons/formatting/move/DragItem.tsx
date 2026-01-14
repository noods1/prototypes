import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type DragItemProps = Omit<IconProps, 'children'>;

/**
 * DragItemIcon
 * 
 * Converted from Formatting/Move/DragItemIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const DragItem: React.FC<DragItemProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M8.25001 13.75C7.28351 13.75 6.50002 12.9665 6.50002 12C6.50002 11.0335 7.28351 10.25 8.25001 10.25C9.2165 10.25 10 11.0335 10 12C10 12.9665 9.2165 13.75 8.25001 13.75Z" fill="currentColor" />
      <path d="M8.25001 21.25C7.28351 21.25 6.50002 20.4665 6.50002 19.5C6.50002 18.5335 7.28351 17.75 8.25001 17.75C9.2165 17.75 10 18.5335 10 19.5C10 20.4665 9.2165 21.25 8.25001 21.25Z" fill="currentColor" />
      <path d="M8.24999 6.25C7.2835 6.25 6.5 5.4665 6.5 4.5C6.5 3.5335 7.2835 2.75 8.24999 2.75C9.21649 2.75 9.99998 3.5335 9.99998 4.5C9.99998 5.4665 9.21649 6.25 8.24999 6.25Z" fill="currentColor" />
      <path d="M15.75 13.75C14.7835 13.75 14 12.9665 14 12C14 11.0335 14.7835 10.25 15.75 10.25C16.7165 10.25 17.5 11.0335 17.5 12C17.5 12.9665 16.7165 13.75 15.75 13.75Z" fill="currentColor" />
      <path d="M15.75 21.25C14.7835 21.25 14 20.4665 14 19.5C14 18.5335 14.7835 17.75 15.75 17.75C16.7165 17.75 17.5 18.5335 17.5 19.5C17.5 20.4665 16.7165 21.25 15.75 21.25Z" fill="currentColor" />
      <path d="M15.75 6.25C14.7835 6.25 14 5.4665 14 4.5C14 3.5335 14.7835 2.75 15.75 2.75C16.7165 2.75 17.5 3.5335 17.5 4.5C17.5 5.4665 16.7165 6.25 15.75 6.25Z" fill="currentColor" />
    </IconBase>
  );
};

export default DragItem;

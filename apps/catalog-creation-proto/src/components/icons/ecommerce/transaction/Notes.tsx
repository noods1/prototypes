import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type NotesProps = Omit<IconProps, 'children'>;

/**
 * NotesIcon
 * 
 * Converted from ECommerce/Transaction/NotesIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Notes: React.FC<NotesProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M5.75 3.5V20.5H18.2499V6.86248L14.7543 3.5H5.75ZM5.24999 1.5C4.42157 1.5 3.75 2.17157 3.75 2.99999V21C3.75 21.8284 4.42157 22.5 5.24999 22.5H18.7499C19.5784 22.5 20.2499 21.8284 20.2499 21V6.64966C20.2499 6.24174 20.0838 5.85141 19.7898 5.56862L15.9956 1.91895C15.7162 1.65015 15.3435 1.5 14.9558 1.5H5.24999Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M7.2293 8.26335C7.2293 7.71107 7.67702 7.26335 8.2293 7.26335L15.7359 7.26335C16.2881 7.26335 16.7359 7.71107 16.7359 8.26335C16.7359 8.81564 16.2881 9.26335 15.7359 9.26335L8.2293 9.26335C7.67702 9.26335 7.2293 8.81564 7.2293 8.26335Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M7.2293 12.0133C7.2293 11.461 7.67702 11.0133 8.2293 11.0133L15.7359 11.0133C16.2881 11.0133 16.7359 11.4611 16.7359 12.0133C16.7359 12.5656 16.2881 13.0133 15.7359 13.0133L8.2293 13.0133C7.67702 13.0133 7.2293 12.5656 7.2293 12.0133Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M7.2293 15.7633C7.2293 15.211 7.67702 14.7633 8.2293 14.7633H12.7249C13.2772 14.7633 13.7249 15.211 13.7249 15.7633C13.7249 16.3156 13.2772 16.7633 12.7249 16.7633H8.2293C7.67702 16.7633 7.2293 16.3156 7.2293 15.7633Z" fill="currentColor" />
    </IconBase>
  );
};

export default Notes;

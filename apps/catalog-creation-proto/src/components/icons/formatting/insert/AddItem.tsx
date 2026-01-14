import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type AddItemProps = Omit<IconProps, 'children'>;

/**
 * AddItemIcon
 * 
 * Converted from Formatting/Insert/AddItemIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const AddItem: React.FC<AddItemProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M5.75 3.5V20.5H18.2499V6.86248L14.7543 3.5H5.75ZM5.24999 1.5C4.42157 1.5 3.75 2.17157 3.75 2.99999V21C3.75 21.8284 4.42157 22.5 5.24999 22.5H18.7499C19.5784 22.5 20.2499 21.8284 20.2499 21V6.64966C20.2499 6.24174 20.0838 5.85141 19.7898 5.56862L15.9956 1.91895C15.7162 1.65015 15.3435 1.5 14.9558 1.5H5.24999Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M7.25343 12C7.25343 11.4477 7.70114 11 8.25343 11H15.7489C16.3012 11 16.7489 11.4477 16.7489 12C16.7489 12.5523 16.3012 13 15.7489 13H8.25343C7.70114 13 7.25343 12.5523 7.25343 12Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M12.0007 7.25222C12.5529 7.25222 13.0007 7.69994 13.0007 8.25222L13.0007 15.7477C13.0007 16.3 12.5529 16.7477 12.0007 16.7477C11.4484 16.7477 11.0007 16.3 11.0007 15.7477V8.25222C11.0007 7.69994 11.4484 7.25222 12.0007 7.25222Z" fill="currentColor" />
    </IconBase>
  );
};

export default AddItem;

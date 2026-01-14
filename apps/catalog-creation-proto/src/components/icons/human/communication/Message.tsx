import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type MessageProps = Omit<IconProps, 'children'>;

/**
 * MessageIcon
 * 
 * Converted from Human/Communication/MessageIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Message: React.FC<MessageProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M3.5 20.5H11.9999C16.6943 20.5 20.4999 16.6944 20.4999 12C20.4999 7.30558 16.6943 3.5 12 3.5C7.30556 3.5 3.5 7.30556 3.5 12V20.5ZM12 1.5C6.20099 1.5 1.5 6.20099 1.5 12V21C1.5 21.8284 2.17157 22.5 2.99999 22.5H11.9999C17.7989 22.5 22.4999 17.799 22.4999 12C22.4999 6.20101 17.7989 1.5 12 1.5Z" fill="currentColor" />
      <path d="M11.9823 13.6245C11.292 13.6245 10.7323 13.0649 10.7323 12.3745C10.7323 11.6842 11.292 11.1245 11.9823 11.1245C12.6727 11.1245 13.2323 11.6842 13.2323 12.3745C13.2323 13.0649 12.6727 13.6245 11.9823 13.6245Z" fill="currentColor" />
      <path d="M16.4823 13.6245C15.792 13.6245 15.2323 13.0649 15.2323 12.3745C15.2323 11.6842 15.792 11.1245 16.4823 11.1245C17.1727 11.1245 17.7323 11.6842 17.7323 12.3745C17.7323 13.0649 17.1727 13.6245 16.4823 13.6245Z" fill="currentColor" />
      <path d="M7.48244 13.6245C6.79208 13.6245 6.23244 13.0649 6.23244 12.3745C6.23244 11.6842 6.79208 11.1245 7.48244 11.1245C8.1728 11.1245 8.73244 11.6842 8.73244 12.3745C8.73244 13.0649 8.1728 13.6245 7.48244 13.6245Z" fill="currentColor" />
    </IconBase>
  );
};

export default Message;

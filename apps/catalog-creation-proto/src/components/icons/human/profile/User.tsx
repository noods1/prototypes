import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type UserProps = Omit<IconProps, 'children'>;

/**
 * UserIcon
 * 
 * Converted from Human/Profile/UserIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const User: React.FC<UserProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M11.9997 4.75C10.0667 4.75 8.49972 6.317 8.49972 8.25C8.49972 10.183 10.0667 11.75 11.9997 11.75C13.9327 11.75 15.4997 10.183 15.4997 8.25C15.4997 6.317 13.9327 4.75 11.9997 4.75ZM6.49972 8.25C6.49972 5.21244 8.96214 2.75 11.9997 2.75C15.0373 2.75 17.4997 5.21244 17.4997 8.25C17.4997 11.2876 15.0373 13.75 11.9997 13.75C8.96214 13.75 6.49972 11.2876 6.49972 8.25Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M11.9997 13.75C8.40988 13.75 5.5 16.6601 5.5 20.25C5.5 20.8023 5.05228 21.25 4.5 21.25C3.94772 21.25 3.5 20.8023 3.5 20.25C3.5 15.5556 7.3053 11.75 11.9997 11.75C16.6941 11.75 20.4999 15.5556 20.4999 20.25C20.4999 20.8023 20.0522 21.25 19.4999 21.25C18.9476 21.25 18.4999 20.8023 18.4999 20.25C18.4999 16.6601 15.5895 13.75 11.9997 13.75Z" fill="currentColor" />
    </IconBase>
  );
};

export default User;

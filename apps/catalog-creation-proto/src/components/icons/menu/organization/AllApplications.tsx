import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type AllApplicationsProps = Omit<IconProps, 'children'>;

/**
 * AllApplicationsIcon
 * 
 * Converted from Menu/Organization/AllApplicationsIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const AllApplications: React.FC<AllApplicationsProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M2 14.25C2 13.2835 2.7835 12.5 3.75 12.5H9.74997C10.7165 12.5 11.5 13.2835 11.5 14.25V20.25C11.5 21.2165 10.7165 22 9.74997 22H3.75C2.7835 22 2 21.2165 2 20.25V14.25ZM4 14.5V20H9.49997V14.5H4Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M12.5 14.25C12.5 13.2835 13.2835 12.5 14.2499 12.5H20.2499C21.2164 12.5 21.9999 13.2835 21.9999 14.25V20.25C21.9999 21.2165 21.2164 22 20.2499 22H14.2499C13.2835 22 12.5 21.2165 12.5 20.25V14.25ZM14.5 14.5V20H19.9999V14.5H14.5Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M2 3.75C2 2.7835 2.7835 2 3.75 2H9.74997C10.7165 2 11.5 2.7835 11.5 3.75V9.75C11.5 10.7165 10.7165 11.5 9.74997 11.5H3.75C2.7835 11.5 2 10.7165 2 9.75V3.75ZM4 4V9.5H9.49997V4H4Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M12.5 2H17.2499C19.8733 2 21.9999 4.12666 21.9999 6.75001C21.9999 9.37335 19.8733 11.5 17.2499 11.5C14.6266 11.5 12.5 9.37336 12.5 6.75002V2ZM14.5 4V6.75002C14.5 8.26879 15.7312 9.5 17.2499 9.5C18.7687 9.5 19.9999 8.26879 19.9999 6.75001C19.9999 5.23122 18.7687 4 17.2499 4H14.5Z" fill="currentColor" />
    </IconBase>
  );
};

export default AllApplications;

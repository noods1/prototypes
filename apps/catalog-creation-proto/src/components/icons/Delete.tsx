import React from 'react';
import { IconBase, IconProps } from '../IconBase';

type DeleteProps = Omit<IconProps, 'children'>;

/**
 * DeleteIcon
 * 
 * Converted from DeleteIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Delete: React.FC<DeleteProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M6.07031 8.4375H17.9307C18.2275 8.43751 18.4612 8.69365 18.4326 8.99121L17.1572 22.168C17.1321 22.4275 16.9143 22.625 16.6553 22.625H7.3457C7.08664 22.625 6.86887 22.4275 6.84375 22.168L5.56836 8.99121C5.53978 8.69362 5.77347 8.4375 6.07031 8.4375Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M10.123 18.9738V12.5557" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.8838 18.9738V12.5557" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.10303 4.4541H19.897C20.1752 4.45424 20.4007 4.67976 20.4009 4.95801V7.43848C20.4007 7.7167 20.1752 7.94224 19.897 7.94238H4.10303C3.82483 7.94218 3.59935 7.71666 3.59912 7.43848V4.95801C3.59932 4.6798 3.82482 4.4543 4.10303 4.4541Z" stroke="currentColor" strokeWidth="2" />
      <path d="M9.08154 3.68263L10.5859 1.375H13.4145L14.9188 3.68263" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </IconBase>
  );
};

export default Delete;

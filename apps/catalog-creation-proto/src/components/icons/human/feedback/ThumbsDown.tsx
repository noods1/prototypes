import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type ThumbsDownProps = Omit<IconProps, 'children'>;

/**
 * ThumbsDownIcon
 * 
 * Converted from Human/Feedback/ThumbsDownIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const ThumbsDown: React.FC<ThumbsDownProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M13.2471 18.8118L16.1273 14.3314V5.12509H7.38166L4.9531 13.6251H12.8773V18.2253C12.8773 18.4839 13.0284 18.7072 13.2471 18.8118ZM14.7153 20.2264C14.4554 20.6307 14.0078 20.8751 13.5272 20.8751C12.0637 20.8751 10.8773 19.6887 10.8773 18.2253V15.6251H4.62167C3.45901 15.6251 2.6196 14.5123 2.939 13.3943L5.51042 4.39433C5.72507 3.64305 6.41175 3.12509 7.19309 3.12509H18.1273V14.9188L14.7153 20.2264Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M21.1288 13.875C21.1288 14.8415 20.3453 15.625 19.3788 15.625H16.1288V3.125H19.3788C20.3453 3.125 21.1288 3.9085 21.1288 4.875V13.875ZM19.1288 13.625V5.125H18.1288V13.625H19.1288Z" fill="currentColor" />
    </IconBase>
  );
};

export default ThumbsDown;

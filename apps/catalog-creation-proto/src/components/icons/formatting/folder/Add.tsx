import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type AddProps = Omit<IconProps, 'children'>;

/**
 * AddIcon
 * 
 * Converted from Formatting/Folder/AddIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Add: React.FC<AddProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M3.50182 8.37542V19.3754H20.5017V8.37542H3.50182ZM3.00181 6.37542C2.17339 6.37542 1.50182 7.04699 1.50182 7.87541V19.8754C1.50182 20.7038 2.17339 21.3754 3.00181 21.3754H21.0017C21.8302 21.3754 22.5017 20.7038 22.5017 19.8754V7.87541C22.5017 7.04699 21.8302 6.37542 21.0017 6.37542H3.00181Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M6.7875 13.8753C6.7875 13.323 7.23521 12.8753 7.7875 12.8753H16.0375C16.5897 12.8753 17.0375 13.323 17.0375 13.8753C17.0375 14.4276 16.5897 14.8753 16.0375 14.8753H7.7875C7.23521 14.8753 6.7875 14.4276 6.7875 13.8753Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M11.9125 8.75028C12.4648 8.75028 12.9125 9.198 12.9125 9.75028V18.0003C12.9125 18.5526 12.4648 19.0003 11.9125 19.0003C11.3602 19.0003 10.9125 18.5526 10.9125 18.0003V9.75028C10.9125 9.19799 11.3602 8.75028 11.9125 8.75028Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M3.49854 4.625V5.875H13.4306L12.5649 4.625H3.49854ZM17.2485 7.875H1.49854V4.12499C1.49854 3.29657 2.1701 2.625 2.99853 2.625H12.8268C13.319 2.625 13.7798 2.8664 14.06 3.27098L17.2485 7.875Z" fill="currentColor" />
    </IconBase>
  );
};

export default Add;

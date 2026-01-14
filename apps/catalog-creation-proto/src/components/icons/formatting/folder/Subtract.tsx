import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type SubtractProps = Omit<IconProps, 'children'>;

/**
 * SubtractIcon
 * 
 * Converted from Formatting/Folder/SubtractIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Subtract: React.FC<SubtractProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M3.5 8.37782V19.3778H20.4999V8.37782H3.5ZM2.99999 6.37782C2.17157 6.37782 1.5 7.04939 1.5 7.87782V19.8778C1.5 20.7063 2.17157 21.3778 2.99999 21.3778H20.9999C21.8283 21.3778 22.4999 20.7063 22.4999 19.8778V7.87782C22.4999 7.04939 21.8283 6.37782 20.9999 6.37782H2.99999Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M5.68113 13.5181C5.68113 12.9658 6.12884 12.5181 6.68113 12.5181H17.1811C17.7334 12.5181 18.1811 12.9658 18.1811 13.5181C18.1811 14.0704 17.7334 14.5181 17.1811 14.5181H6.68113C6.12884 14.5181 5.68113 14.0704 5.68113 13.5181Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M3.5015 4.62207V5.87207H13.4335L12.5679 4.62207H3.5015ZM17.2514 7.87207H1.5015V4.12206C1.5015 3.29364 2.17307 2.62207 3.00149 2.62207H12.8298C13.3219 2.62207 13.7827 2.86347 14.0629 3.26805L17.2514 7.87207Z" fill="currentColor" />
    </IconBase>
  );
};

export default Subtract;

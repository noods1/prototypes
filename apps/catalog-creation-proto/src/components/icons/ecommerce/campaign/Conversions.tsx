import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type ConversionsProps = Omit<IconProps, 'children'>;

/**
 * ConversionsIcon
 * 
 * Converted from ECommerce/Campaign/ConversionsIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Conversions: React.FC<ConversionsProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M18.7094 8.29286C19.1 8.68338 19.1 9.31655 18.7094 9.70707L12.7523 15.6642L9.75236 12.6642L5.95949 16.4571C5.56896 16.8476 4.9358 16.8476 4.54527 16.4571C4.15475 16.0666 4.15475 15.4334 4.54527 15.0429L9.75236 9.83575L12.7523 12.8358L17.2952 8.29286C17.6857 7.90234 18.3189 7.90234 18.7094 8.29286Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M12.5015 9.00007C12.5015 8.44778 12.9492 8.00007 13.5015 8.00007H19.0015V13.5001C19.0015 14.0524 18.5538 14.5001 18.0015 14.5001C17.4492 14.5001 17.0015 14.0524 17.0015 13.5001V10.0001H13.5015C12.9492 10.0001 12.5015 9.55235 12.5015 9.00007Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M3.5 3.5V20.5H20.4999V3.5H3.5ZM2.99999 1.5C2.17157 1.5 1.5 2.17157 1.5 2.99999V21C1.5 21.8284 2.17157 22.5 2.99999 22.5H20.9999C21.8283 22.5 22.4999 21.8284 22.4999 21V2.99999C22.4999 2.17157 21.8283 1.5 20.9999 1.5H2.99999Z" fill="currentColor" />
    </IconBase>
  );
};

export default Conversions;

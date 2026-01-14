import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type CardProps = Omit<IconProps, 'children'>;

/**
 * CardIcon
 * 
 * Converted from ECommerce/Banking/CardIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Card: React.FC<CardProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M3.5 6.5V17.5H20.4999V6.5H3.5ZM2.99999 4.5C2.17157 4.5 1.5 5.17157 1.5 5.99999V18C1.5 18.8284 2.17157 19.5 2.99999 19.5H20.9999C21.8283 19.5 22.4999 18.8284 22.4999 18V5.99999C22.4999 5.17157 21.8283 4.5 20.9999 4.5H2.99999Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M18.9996 12.0001C18.9996 12.5524 18.5519 13.0001 17.9996 13.0001H13.4996C12.9473 13.0001 12.4996 12.5524 12.4996 12.0001C12.4996 11.4478 12.9473 11.0001 13.4996 11.0001H17.9996C18.5519 11.0001 18.9996 11.4478 18.9996 12.0001Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M22.0002 8.99999C22.0002 9.55227 21.5525 9.99999 21.0002 9.99999H3.00028C2.448 9.99999 2.00028 9.55227 2.00028 8.99999C2.00028 8.4477 2.448 7.99999 3.00028 7.99999H21.0002C21.5525 7.99999 22.0002 8.4477 22.0002 8.99999Z" fill="currentColor" />
    </IconBase>
  );
};

export default Card;

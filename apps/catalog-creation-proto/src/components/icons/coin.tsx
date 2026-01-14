import React from 'react';
import { IconBase, IconProps } from '../IconBase';

type coinProps = Omit<IconProps, 'children'>;

/**
 * coinIcon
 * 
 * Converted from coinIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const coin: React.FC<coinProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M12 10.7002C15.5899 10.7002 18.5 9.24512 18.5 7.4502C18.5 5.65527 15.5899 4.2002 12 4.2002C8.41015 4.2002 5.5 5.65527 5.5 7.4502C5.5 9.24512 8.41015 10.7002 12 10.7002Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.5 7.4502C5.5 7.4502 5.5 10.2053 5.5 12.0002C5.5 13.7951 8.41018 15.2502 12 15.2502C15.5898 15.2502 18.5 13.7951 18.5 12.0002C18.5 10.9371 18.5 7.4502 18.5 7.4502" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.5 12C5.5 12 5.5 14.7551 5.5 16.55C5.5 18.3449 8.41018 19.8 12 19.8C15.5898 19.8 18.5 18.3449 18.5 16.55C18.5 15.4869 18.5 12 18.5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </IconBase>
  );
};

export default coin;

import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type CouponProps = Omit<IconProps, 'children'>;

/**
 * CouponIcon
 * 
 * Converted from Menu/Incentive/CouponIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Coupon: React.FC<CouponProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M8.58674 11.1014H11.5709M8.58674 14.0857H15.5498M6.99922 6.9503L17.3778 2.79883L19.0386 6.9503M2.50879 6.9503H21.4911V9.79765C20.0674 9.79765 18.6438 10.7468 18.6438 12.4077C18.6438 14.0687 20.0674 15.4924 21.4911 15.4924V18.3397H2.50879V15.4924C3.93254 15.4924 5.35614 14.5432 5.35614 12.645C5.35614 10.7468 3.93246 9.79765 2.50879 9.79765V6.9503Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </IconBase>
  );
};

export default Coupon;

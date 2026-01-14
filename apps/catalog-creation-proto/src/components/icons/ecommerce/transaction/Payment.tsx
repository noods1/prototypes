import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type PaymentProps = Omit<IconProps, 'children'>;

/**
 * PaymentIcon
 * 
 * Converted from ECommerce/Transaction/PaymentIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Payment: React.FC<PaymentProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M16.2632 3.81302C16.6427 3.41169 17.2756 3.39392 17.6769 3.77333L22.4369 8.27333C22.7345 8.5547 22.8305 8.98912 22.6791 9.36968C22.5277 9.75024 22.1595 10 21.7499 10H2.25C1.69772 10 1.25 9.55229 1.25 9C1.25 8.44772 1.69772 8 2.25 8H19.2365L16.3029 5.22668C15.9016 4.84727 15.8838 4.21435 16.2632 3.81302Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M7.73621 20.1871C7.3568 20.5884 6.72388 20.6062 6.32255 20.2268L1.56256 15.7268C1.26494 15.4454 1.16898 15.011 1.32039 14.6305C1.4718 14.2499 1.83997 14.0001 2.24955 14.0001H21.7495C22.3017 14.0001 22.7495 14.4478 22.7495 15.0001C22.7495 15.5524 22.3017 16.0001 21.7495 16.0001H4.76296L7.69652 18.7735C8.09785 19.1529 8.11562 19.7858 7.73621 20.1871Z" fill="currentColor" />
    </IconBase>
  );
};

export default Payment;

import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type TabletProps = Omit<IconProps, 'children'>;

/**
 * TabletIcon
 * 
 * Converted from Media/Device/TabletIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Tablet: React.FC<TabletProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M20.9999 3.5C22.3806 3.5 23.4999 4.61929 23.4999 5.99999V18C23.4999 19.3807 22.3806 20.5 20.9999 20.5H2.99999C1.61928 20.5 0.5 19.3807 0.5 18L0.500001 5.99999C0.500001 4.61929 1.61929 3.5 2.99999 3.5L20.9999 3.5ZM21.4999 5.99999C21.4999 5.72385 21.2761 5.5 20.9999 5.5L2.99999 5.5C2.72385 5.5 2.5 5.72385 2.5 5.99999L2.5 18C2.5 18.2761 2.72385 18.5 2.99999 18.5L20.9999 18.5C21.2761 18.5 21.4999 18.2761 21.4999 18V5.99999Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M5.24643 9.86515C5.79872 9.86515 6.24643 10.3129 6.24643 10.8652L6.24643 13.8652C6.24643 14.4174 5.79872 14.8652 5.24643 14.8652C4.69415 14.8652 4.24643 14.4174 4.24643 13.8652V10.8652C4.24643 10.3129 4.69415 9.86515 5.24643 9.86515Z" fill="currentColor" />
    </IconBase>
  );
};

export default Tablet;

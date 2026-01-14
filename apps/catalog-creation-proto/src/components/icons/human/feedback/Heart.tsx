import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type HeartProps = Omit<IconProps, 'children'>;

/**
 * HeartIcon
 * 
 * Converted from Human/Feedback/HeartIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Heart: React.FC<HeartProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12.0018 6.89899L10.6659 5.70156C8.97904 4.1895 6.38187 4.24468 4.75981 5.86675C3.15162 7.47494 3.08362 10.0417 4.55616 11.7294L11.9997 19.1848L19.4434 11.7294C20.9155 10.0424 20.85 7.48039 19.2383 5.86529C17.6199 4.24352 15.018 4.19155 13.3368 5.70062L12.0018 6.89899ZM20.9017 13.0994L13.0612 20.9523C12.4752 21.5392 11.5242 21.5392 10.9382 20.9523L3.09783 13.0994C0.88843 10.6258 0.971017 6.82712 3.34559 4.45254C5.72286 2.07526 9.52741 1.99517 12.0008 4.21228C14.4671 1.99846 18.2784 2.07196 20.6539 4.45254C23.0296 6.83312 23.1112 10.6258 20.9017 13.0994Z" fill="currentColor" />
    </IconBase>
  );
};

export default Heart;

import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type BriefcaseProps = Omit<IconProps, 'children'>;

/**
 * BriefcaseIcon
 * 
 * Converted from Menu/Business/BriefcaseIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Briefcase: React.FC<BriefcaseProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M1.24965 8.99989C1.24965 8.03339 2.03315 7.24989 2.99965 7.24989H20.9996C21.9661 7.24989 22.7496 8.03339 22.7496 8.99989V19.4999C22.7496 20.4664 21.9661 21.2499 20.9996 21.2499H2.99965C2.03315 21.2499 1.24965 20.4664 1.24965 19.4999V8.99989ZM3.24965 9.24989V19.2499H20.7496V9.24989H3.24965Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M1.26128 11.8478C1.34526 11.302 1.85585 10.9276 2.40171 11.0115L11.9996 12.4881L21.5975 11.0115C22.1434 10.9276 22.6539 11.302 22.7379 11.8478C22.8219 12.3937 22.4475 12.9043 21.9016 12.9883L11.9996 14.5117L2.09759 12.9883C1.55173 12.9043 1.1773 12.3937 1.26128 11.8478Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M6.4999 8.23376C6.4999 5.20047 8.976 2.75 11.9999 2.75C15.0238 2.75 17.4999 5.20047 17.4999 8.23376C17.4999 8.79502 17.0449 9.25 16.4836 9.25H7.51615C6.95494 9.25 6.4999 8.79506 6.4999 8.23376ZM8.64223 7.25H15.3575C14.9296 5.80736 13.5855 4.75 11.9999 4.75C10.4142 4.75 9.07021 5.80736 8.64223 7.25Z" fill="currentColor" />
    </IconBase>
  );
};

export default Briefcase;

import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type LeadGenerationProps = Omit<IconProps, 'children'>;

/**
 * LeadGenerationIcon
 * 
 * Converted from Objects/Tools/LeadGenerationIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const LeadGeneration: React.FC<LeadGenerationProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M5.90068 21.6289C1.79285 19.2572 0.385403 14.0046 2.75706 9.89673L7.3032 2.02259C7.747 1.25391 8.72991 0.990534 9.4986 1.43433L11.8522 2.79317C12.6209 3.23697 12.8842 4.21989 12.4404 4.98857L7.89429 12.8627C7.1607 14.1333 7.59604 15.7581 8.86666 16.4916C10.1373 17.2252 11.762 16.7899 12.4956 15.5193L17.0417 7.64513C17.4855 6.87645 18.4684 6.61308 19.2371 7.05688L21.5907 8.41571C22.3594 8.85951 22.6228 9.84243 22.179 10.6111L17.6328 18.4853C15.2612 22.5931 10.0085 24.0005 5.90068 21.6289ZM4.24167 10.7539C2.34341 14.0418 3.46992 18.246 6.75782 20.1443C10.0457 22.0425 14.2499 20.916 16.1482 17.6281L20.6408 9.84676L18.4728 8.59506L13.9802 16.3764C12.7732 18.467 10.1001 19.1832 8.00951 17.9763C5.91897 16.7693 5.2027 14.0961 6.40967 12.0056L10.9022 4.22422L8.73424 2.97252L4.24167 10.7539Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M6.93946 4.33993L10.7161 6.52034L9.85891 8.00496L6.08232 5.82454L6.93946 4.33993Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M16.8966 10.0884L20.6732 12.2688L19.816 13.7534L16.0394 11.573L16.8966 10.0884Z" fill="currentColor" />
    </IconBase>
  );
};

export default LeadGeneration;

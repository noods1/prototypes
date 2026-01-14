import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type ClipProps = Omit<IconProps, 'children'>;

/**
 * ClipIcon
 * 
 * Converted from Media/Video/ClipIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Clip: React.FC<ClipProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M14.8187 12.7193L11.0882 9.96324C10.5931 9.59748 9.89254 9.95092 9.89254 10.5665V16.0786C9.89254 16.6941 10.5931 17.0476 11.0882 16.6818L14.8187 13.9258C15.2244 13.626 15.2244 13.0191 14.8187 12.7193Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M0.500488 4.74999C0.500488 3.36929 1.61977 2.25 3.00048 2.25H21.0004C22.3811 2.25 23.5004 3.36929 23.5004 4.74999V18.25C23.5004 19.6307 22.3811 20.75 21.0004 20.75H3.00048C1.61977 20.75 0.500488 19.6307 0.500488 18.25V4.74999ZM3.00048 4.25C2.72434 4.25 2.50049 4.47385 2.50049 4.74999V18.25C2.50049 18.5261 2.72434 18.75 3.00048 18.75H21.0004C21.2765 18.75 21.5004 18.5261 21.5004 18.25V4.74999C21.5004 4.47385 21.2765 4.25 21.0004 4.25H3.00048Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M21.7504 8.75H2.25047V6.75H21.7504V8.75Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M11.2586 4.08465L7.50865 8.40545L5.99819 7.09453L9.74817 2.77373L11.2586 4.08465Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M18.7562 4.08464L15.0062 8.40544L13.4958 7.09452L17.2458 2.77372L18.7562 4.08464Z" fill="currentColor" />
    </IconBase>
  );
};

export default Clip;

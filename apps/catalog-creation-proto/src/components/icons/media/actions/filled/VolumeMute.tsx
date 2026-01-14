import React from 'react';
import { IconBase, IconProps } from '../../../IconBase';

type VolumeMuteProps = Omit<IconProps, 'children'>;

/**
 * VolumeMuteIcon
 * 
 * Converted from Media/Actions/Filled/VolumeMuteIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const VolumeMute: React.FC<VolumeMuteProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M3.84863 7.92152C3.02021 7.92152 2.34863 8.5931 2.34863 9.42152V15.0049C2.34863 15.8333 3.02021 16.5049 3.84863 16.5049H5.94985C6.22679 16.5049 6.49133 16.6197 6.68043 16.822L11.1181 21.5699C11.7376 22.2328 12.8486 21.7944 12.8486 20.8871V3.11333C12.8486 2.1863 11.6964 1.75825 11.0912 2.46044L6.68318 7.57441C6.49322 7.7948 6.21668 7.92152 5.92573 7.92152H3.84863Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M13.9447 8.73436C14.3353 8.34384 14.9684 8.34384 15.359 8.73436L21.359 14.7344C21.7495 15.1249 21.7495 15.758 21.359 16.1486C20.9684 16.5391 20.3353 16.5391 19.9447 16.1486L13.9447 10.1486C13.5542 9.75805 13.5542 9.12489 13.9447 8.73436Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M13.9447 16.1486C13.5542 15.758 13.5542 15.1249 13.9447 14.7344L19.9447 8.73436C20.3353 8.34384 20.9684 8.34384 21.359 8.73436C21.7495 9.12488 21.7495 9.75805 21.359 10.1486L15.359 16.1486C14.9684 16.5391 14.3353 16.5391 13.9447 16.1486Z" fill="currentColor" />
    </IconBase>
  );
};

export default VolumeMute;

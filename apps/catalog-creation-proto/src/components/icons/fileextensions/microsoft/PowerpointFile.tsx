import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type PowerpointFileProps = Omit<IconProps, 'children'>;

/**
 * PowerpointFileIcon
 * 
 * Converted from FileExtensions/Microsoft/PowerpointFileIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const PowerpointFile: React.FC<PowerpointFileProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M23.222 0H0.778C0.348322 0 0 0.348322 0 0.778V23.222C0 23.6517 0.348322 24 0.778 24H23.222C23.6517 24 24 23.6517 24 23.222V0.778C24 0.348322 23.6517 0 23.222 0Z" fill="currentColor" />
      <path d="M9.84916 17.3331C9.92966 17.3331 9.99516 17.2676 9.99516 17.1871V13.5251H12.7152C15.0192 13.5251 16.2992 11.9571 16.2992 10.1011C16.2992 8.22913 15.0352 6.66113 12.7152 6.66113H8.16016C7.91866 6.66113 7.72266 6.85713 7.72266 7.09863V17.1871C7.72266 17.2676 7.78816 17.3331 7.86866 17.3331H9.84916ZM12.3952 11.5251H9.99516V8.66113H12.3952C13.2912 8.66113 13.9792 9.20513 13.9792 10.1011C13.9792 10.9811 13.2912 11.5251 12.3952 11.5251Z" fill="currentColor" />
    </IconBase>
  );
};

export default PowerpointFile;

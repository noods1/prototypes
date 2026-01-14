import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type ExcelFileProps = Omit<IconProps, 'children'>;

/**
 * ExcelFileIcon
 * 
 * Converted from FileExtensions/Microsoft/ExcelFileIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const ExcelFile: React.FC<ExcelFileProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M24 0H0V24H24V0Z" fill="currentColor" />
      <path d="M21.6667 0H2.33334C1.04467 0 0 1.04467 0 2.33334V21.6667C0 22.9554 1.04467 24 2.33334 24H21.6667C22.9554 24 24 22.9554 24 21.6667V2.33334C24 1.04467 22.9554 0 21.6667 0Z" fill="currentColor" />
      <path d="M16.2147 17.3331C16.5695 17.3331 16.7768 16.9332 16.5722 16.6434L13.1869 11.8451L16.3365 7.34963C16.5396 7.05968 16.3322 6.66113 15.9782 6.66113H14.3179C14.1711 6.66113 14.0342 6.73468 13.9531 6.85703L11.6669 10.3091L9.34886 6.85483C9.26761 6.73373 9.13141 6.66113 8.98561 6.66113H7.35411C7.00036 6.66113 6.79286 7.05913 6.99541 7.34913L10.1469 11.8611L6.76326 16.6428C6.55821 16.9326 6.76546 17.3331 7.12041 17.3331H8.74891C8.89291 17.3331 9.02761 17.2623 9.10926 17.1437L11.6669 13.4291L14.2086 17.1428C14.2901 17.2619 14.4252 17.3331 14.5696 17.3331H16.2147Z" fill="currentColor" />
    </IconBase>
  );
};

export default ExcelFile;

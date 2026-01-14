import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type UploadProps = Omit<IconProps, 'children'>;

/**
 * UploadIcon
 * 
 * Converted from Arrows/Transfer/UploadIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Upload: React.FC<UploadProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M3.24756 20H7.12364C7.67592 20 8.12364 20.4478 8.12364 21C8.12364 21.5523 7.67592 22 7.12364 22H2.99756C2.03106 22 1.24756 21.2165 1.24756 20.25V3.75C1.24756 2.7835 2.03106 2 2.99755 2H21.0019C21.9684 2 22.7519 2.7835 22.7519 3.75V20.25C22.7519 21.2165 21.9684 22 21.0019 22H16.8758C16.3235 22 15.8758 21.5523 15.8758 21C15.8758 20.4478 16.3235 20 16.8758 20H20.7519V4H3.24756V20Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M17.1876 13.4589C16.7972 13.8496 16.1644 13.8496 15.774 13.4589L11.2765 8.95725C10.8861 8.56656 10.8861 7.93312 11.2765 7.54242C11.6668 7.15173 12.2997 7.15173 12.69 7.54242L17.1876 12.0441C17.5779 12.4348 17.5779 13.0682 17.1876 13.4589Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M12.69 7.54242C13.0804 7.93312 13.0798 8.56653 12.6894 8.95723L8.19186 13.4589C7.80152 13.8496 7.16866 13.8496 6.77832 13.4589C6.38798 13.0682 6.38798 12.4347 6.77832 12.044L11.2765 7.54242C11.6668 7.15173 12.2997 7.15173 12.69 7.54242Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M11.9806 7.24408C12.531 7.24409 12.9772 7.69332 12.9772 8.24746L12.977 20.9974C12.977 21.5515 12.5307 22.0008 11.9803 22.0007C11.4299 22.0007 10.9837 21.5515 10.9837 20.9974L10.9839 8.24743C10.9839 7.69328 11.4302 7.24407 11.9806 7.24408Z" fill="currentColor" />
    </IconBase>
  );
};

export default Upload;

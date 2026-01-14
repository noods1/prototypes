import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type CropProps = Omit<IconProps, 'children'>;

/**
 * CropIcon
 * 
 * Converted from Formatting/Edit/CropIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Crop: React.FC<CropProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M5.62543 1.625C6.17772 1.625 6.62543 2.07272 6.62543 2.625V17.375H21.3754C21.9276 17.375 22.3754 17.8227 22.3754 18.375C22.3754 18.9273 21.9276 19.375 21.3754 19.375H5.62543C5.07315 19.375 4.62543 18.9273 4.62543 18.375V2.625C4.62543 2.07272 5.07315 1.625 5.62543 1.625Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M18.3749 22.3751C17.8226 22.3751 17.3749 21.9274 17.3749 21.3751V6.6251H2.625C2.07271 6.6251 1.625 6.17739 1.625 5.6251C1.625 5.07282 2.07271 4.6251 2.625 4.6251H18.3749C18.9272 4.6251 19.3749 5.07282 19.3749 5.6251V21.3751C19.3749 21.9274 18.9272 22.3751 18.3749 22.3751Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M21.3325 2.66789C21.723 3.05842 21.723 3.69158 21.3325 4.08211L6.33254 19.0821C5.94202 19.4726 5.30885 19.4726 4.91833 19.0821C4.5278 18.6916 4.5278 18.0584 4.91832 17.6679L19.9183 2.6679C20.3088 2.27737 20.9419 2.27737 21.3325 2.66789Z" fill="currentColor" />
    </IconBase>
  );
};

export default Crop;

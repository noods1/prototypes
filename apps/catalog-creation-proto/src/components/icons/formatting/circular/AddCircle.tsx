import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type AddCircleProps = Omit<IconProps, 'children'>;

/**
 * AddCircleIcon
 * 
 * Converted from Formatting/Circular/AddCircleIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const AddCircle: React.FC<AddCircleProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M4.99896 11.9925C4.99896 11.4402 5.44667 10.9925 5.99896 10.9925H17.9989C18.5512 10.9925 18.9989 11.4402 18.9989 11.9925C18.9989 12.5448 18.5512 12.9925 17.9989 12.9925H5.99896C5.44667 12.9925 4.99896 12.5448 4.99896 11.9925Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M11.9993 4.99257C12.5515 4.99257 12.9993 5.44029 12.9993 5.99257L12.9993 17.9926C12.9993 18.5449 12.5515 18.9926 11.9993 18.9926C11.447 18.9926 10.9993 18.5449 10.9993 17.9926L10.9993 5.99257C10.9993 5.44029 11.447 4.99257 11.9993 4.99257Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M3.5 12C3.5 16.6944 7.30557 20.5 12 20.5C16.6943 20.5 20.4999 16.6944 20.4999 12C20.4999 7.30559 16.6943 3.5 12 3.5C7.30557 3.5 3.5 7.30559 3.5 12ZM12 1.5C6.20099 1.5 1.5 6.20103 1.5 12C1.5 17.799 6.20099 22.5 12 22.5C17.7989 22.5 22.4999 17.799 22.4999 12C22.4999 6.20103 17.7989 1.5 12 1.5Z" fill="currentColor" />
    </IconBase>
  );
};

export default AddCircle;

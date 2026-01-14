import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type SignInProps = Omit<IconProps, 'children'>;

/**
 * SignInIcon
 * 
 * Converted from Arrows/Authentication/SignInIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const SignIn: React.FC<SignInProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M20.5002 3C20.5002 2.0335 19.7167 1.25 18.7502 1.25H5.25029C4.28379 1.25 3.50029 2.0335 3.50029 3V4.5C3.50029 5.05229 3.948 5.5 4.50029 5.5C5.05257 5.5 5.50029 5.05229 5.50029 4.5V3.25H18.5002V20.75H5.50029V19.5C5.50029 18.9477 5.05257 18.5 4.50029 18.5C3.948 18.5 3.50029 18.9477 3.50029 19.5V21C3.50029 21.9665 4.28379 22.75 5.25029 22.75H18.7502C19.7167 22.75 20.5002 21.9665 20.5002 21V3Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M12.7936 8.29252C13.1841 7.902 13.8173 7.902 14.2078 8.29252L17.2082 11.2929C17.5987 11.6834 17.5987 12.3166 17.2082 12.7071L14.2078 15.7075C13.8173 16.098 13.1841 16.098 12.7936 15.7075C12.4031 15.3169 12.4031 14.6838 12.7936 14.2933L14.0868 13H4.5C3.94772 13 3.5 12.5523 3.5 12C3.5 11.4477 3.94772 11 4.5 11H14.0868L12.7936 9.70673C12.4031 9.31621 12.4031 8.68304 12.7936 8.29252Z" fill="currentColor" />
    </IconBase>
  );
};

export default SignIn;

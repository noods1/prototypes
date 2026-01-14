import React from 'react';
import { IconBase, IconProps } from '../../../IconBase';

type Volume-downProps = Omit<IconProps, 'children'>;

/**
 * Volume-downIcon
 * 
 * Converted from Media/Actions/Filled/Volume-downIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Volume-down: React.FC<Volume-downProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M5.5 6.81019C4.67157 6.81019 4 7.48177 4 8.31019V13.8935C4 14.722 4.67157 15.3935 5.5 15.3935H7.60122C7.87816 15.3935 8.14269 15.5084 8.33179 15.7107L12.7694 20.4586C13.3889 21.1214 14.5 20.6831 14.5 19.7758V2.00201C14.5 1.07497 13.3478 0.646926 12.7425 1.34911L8.33455 6.46308C8.14458 6.68347 7.86805 6.81019 7.57709 6.81019H5.5Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M15.9785 6.77087C16.369 6.38035 17.0022 6.38035 17.3927 6.77087C20.0017 9.37983 20.0017 13.6098 17.3927 16.2187C17.0022 16.6093 16.369 16.6093 15.9785 16.2187C15.588 15.8282 15.588 15.1951 15.9785 14.8045C17.8064 12.9766 17.8064 10.013 15.9785 8.18508C15.588 7.79456 15.588 7.1614 15.9785 6.77087Z" fill="currentColor" />
    </IconBase>
  );
};

export default Volume-down;

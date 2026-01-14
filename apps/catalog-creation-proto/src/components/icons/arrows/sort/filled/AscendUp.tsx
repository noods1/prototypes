import React from 'react';
import { IconBase, IconProps } from '../../../IconBase';

type AscendUpProps = Omit<IconProps, 'children'>;

/**
 * AscendUpIcon
 * 
 * Converted from Arrows/Sort/Filled/AscendUpIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const AscendUp: React.FC<AscendUpProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M11.9981 0.604492C12.2731 0.604494 12.536 0.717758 12.7249 0.917639L20.0485 8.66713C20.3228 8.95736 20.3981 9.38294 20.2401 9.74967C20.0821 10.1164 19.721 10.354 19.3217 10.354H4.67434C4.27501 10.354 3.91396 10.1164 3.75595 9.74967C3.59795 9.38293 3.67327 8.95735 3.94755 8.66712L11.2713 0.917631C11.4602 0.717752 11.7231 0.604491 11.9981 0.604492Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M12.0024 23.3941C12.2774 23.3941 12.5403 23.2808 12.7292 23.0809L20.0528 15.3314C20.3271 15.0412 20.4024 14.6156 20.2444 14.2489C20.0864 13.8822 19.7253 13.6446 19.326 13.6446H4.67866C4.27934 13.6446 3.91829 13.8822 3.76028 14.2489C3.60227 14.6156 3.67759 15.0412 3.95188 15.3315L11.2756 23.0809C11.4645 23.2808 11.7274 23.3941 12.0024 23.3941ZM6.99964 15.6446H17.0051L12.0024 20.9382L6.99964 15.6446Z" fill="currentColor" />
    </IconBase>
  );
};

export default AscendUp;

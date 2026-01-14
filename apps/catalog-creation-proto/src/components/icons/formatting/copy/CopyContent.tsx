import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type CopyContentProps = Omit<IconProps, 'children'>;

/**
 * CopyContentIcon
 * 
 * Converted from Formatting/Copy/CopyContentIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const CopyContent: React.FC<CopyContentProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M3.375 3.375V16.25H16.2499V3.375H3.375ZM2.87499 1.375C2.04657 1.375 1.375 2.04657 1.375 2.87499V16.75C1.375 17.5784 2.04657 18.25 2.87499 18.25H16.7499C17.5784 18.25 18.2499 17.5784 18.2499 16.75V2.87499C18.2499 2.04657 17.5784 1.375 16.7499 1.375H2.87499Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M20.6246 7.43756H17.9965V5.43756H20.8746C21.8411 5.43756 22.6246 6.22106 22.6246 7.18755V20.8751C22.6246 21.8416 21.8411 22.6251 20.8746 22.6251H7.18721C6.22071 22.6251 5.43721 21.8416 5.43721 20.8751V17.9969H7.43721V20.6251H20.6246V7.43756Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M5.43589 9.81245C5.43589 9.26016 5.88361 8.81245 6.43589 8.81245H13.1859C13.7381 8.81245 14.1859 9.26016 14.1859 9.81245C14.1859 10.3647 13.7381 10.8124 13.1859 10.8124H6.43589C5.88361 10.8124 5.43589 10.3647 5.43589 9.81245Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M9.81087 5.43743C10.3632 5.43743 10.8109 5.88515 10.8109 6.43743V13.1874C10.8109 13.7397 10.3632 14.1874 9.81087 14.1874C9.25859 14.1874 8.81087 13.7397 8.81087 13.1874L8.81087 6.43743C8.81087 5.88515 9.25859 5.43743 9.81087 5.43743Z" fill="currentColor" />
    </IconBase>
  );
};

export default CopyContent;

import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type CarouselProps = Omit<IconProps, 'children'>;

/**
 * CarouselIcon
 * 
 * Converted from Media/Video/CarouselIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Carousel: React.FC<CarouselProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M11.3385 9.0359L14.3227 11.2406C14.7284 11.5404 14.7284 12.1473 14.3227 12.4471L11.3385 14.6518C10.8434 15.0175 10.1428 14.6641 10.1428 14.0485V9.63913C10.1428 9.02359 10.8434 8.67014 11.3385 9.0359Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M16.4948 1.5C17.238 1.5 17.855 2.04055 17.974 2.74996L19.4947 2.74996C20.4612 2.74996 21.2447 3.53346 21.2447 4.49996L21.2447 19.5C21.2447 20.4665 20.4612 21.25 19.4947 21.25H17.974C17.855 21.9594 17.238 22.5 16.4948 22.5H7.4948C6.75154 22.5 6.13454 21.9594 6.01554 21.25H4.50488C3.53838 21.25 2.75488 20.4665 2.75488 19.5V4.49996C2.75488 3.53346 3.53838 2.74996 4.50488 2.74996H6.01556C6.13459 2.04055 6.75157 1.5 7.4948 1.5H16.4948ZM15.9948 3.5L15.9948 20.5H7.99481L7.99481 3.5L15.9948 3.5ZM17.9948 19.25L17.9948 4.74996L19.2447 4.74996L19.2447 19.25H17.9948ZM4.75488 19.25L4.75488 4.74996H5.99481L5.99481 19.25H4.75488Z" fill="currentColor" />
    </IconBase>
  );
};

export default Carousel;

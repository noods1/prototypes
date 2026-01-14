import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type TikTokBlackProps = Omit<IconProps, 'children'>;

/**
 * TikTokBlackIcon
 * 
 * Converted from Brands/TikTok/TikTokBlackIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const TikTokBlack: React.FC<TikTokBlackProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M21.5294 6.75C18.6512 6.75 16.318 4.39949 16.318 1.5H12.8438V15.7917C12.8438 17.5636 11.4179 19 9.65901 19C7.90012 19 6.47426 17.5636 6.47426 15.7917C6.47426 14.0198 7.90012 12.5833 9.65901 12.5833C9.91968 12.5833 10.1708 12.6145 10.4098 12.6726C10.4494 12.6822 10.4886 12.6926 10.5276 12.7036V9.14008C10.2427 9.1026 9.95275 9.08333 9.65901 9.08333C5.98134 9.08333 3 12.0868 3 15.7917C3 19.4966 5.98134 22.5 9.65901 22.5C13.3367 22.5 16.318 19.4966 16.318 15.7917V8.50064C17.7697 9.5991 19.5741 10.25 21.5294 10.25V6.75Z" fill="currentColor" />
    </IconBase>
  );
};

export default TikTokBlack;

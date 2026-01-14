import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type HashtagProps = Omit<IconProps, 'children'>;

/**
 * HashtagIcon
 * 
 * Converted from Symbols/Tag/HashtagIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Hashtag: React.FC<HashtagProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M2.56937 8.13057C2.56937 7.65718 2.95312 7.27343 3.4265 7.27343H20.574C21.0473 7.27343 21.4311 7.65718 21.4311 8.13057C21.4311 8.60395 21.0473 8.98771 20.574 8.98771H3.4265C2.95312 8.98771 2.56937 8.60395 2.56937 8.13057Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M2.56934 15.8693C2.56934 15.3959 2.95309 15.0121 3.42647 15.0121H20.5739C21.0473 15.0121 21.4311 15.3959 21.4311 15.8693C21.4311 16.3427 21.0473 16.7264 20.5739 16.7264H3.42647C2.95309 16.7264 2.56934 16.3427 2.56934 15.8693Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M14.2321 21.2876C13.7659 21.2054 13.4546 20.7608 13.5368 20.2946L16.5144 3.40766C16.5966 2.94147 17.0412 2.63018 17.5074 2.71238C17.9736 2.79459 18.2849 3.23915 18.2027 3.70534L15.225 20.5923C15.1428 21.0585 14.6983 21.3698 14.2321 21.2876Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M6.49336 21.2876C6.02717 21.2054 5.71588 20.7608 5.79808 20.2946L8.77571 3.40766C8.85791 2.94147 9.30247 2.63018 9.76867 2.71238C10.2349 2.79459 10.5461 3.23915 10.4639 3.70534L7.48632 20.5923C7.40412 21.0585 6.95955 21.3698 6.49336 21.2876Z" fill="currentColor" />
    </IconBase>
  );
};

export default Hashtag;

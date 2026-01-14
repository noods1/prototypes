import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type TopicTagProps = Omit<IconProps, 'children'>;

/**
 * TopicTagIcon
 * 
 * Converted from Symbols/Topic/TopicTagIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const TopicTag: React.FC<TopicTagProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M4.5681 8.96096C4.5681 8.54675 4.90389 8.21097 5.3181 8.21097H18.818C19.2322 8.21097 19.568 8.54675 19.568 8.96096C19.568 9.37518 19.2322 9.71096 18.818 9.71096H5.3181C4.90389 9.71096 4.5681 9.37518 4.5681 8.96096Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M4.5681 15.0536C4.5681 14.6394 4.90389 14.3036 5.3181 14.3036H18.818C19.2322 14.3036 19.568 14.6394 19.568 15.0536C19.568 15.4678 19.2322 15.8036 18.818 15.8036H5.3181C4.90389 15.8036 4.5681 15.4678 4.5681 15.0536Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M13.8121 19.3933C13.4042 19.3214 13.1318 18.9324 13.2037 18.5245L15.548 5.22963C15.6199 4.82171 16.0089 4.54933 16.4168 4.62126C16.8247 4.69319 17.0971 5.08218 17.0252 5.4901L14.6809 18.7849C14.609 19.1929 14.22 19.4652 13.8121 19.3933Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M7.71983 19.3933C7.31191 19.3214 7.03954 18.9324 7.11147 18.5245L9.45571 5.22961C9.52763 4.82169 9.91663 4.54932 10.3245 4.62124C10.7325 4.69317 11.0048 5.08216 10.9329 5.49008L8.58867 18.7849C8.51674 19.1928 8.12775 19.4652 7.71983 19.3933Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M20.9999 2.99999H2.99999L2.99999 20.9999H20.9999V2.99999ZM2.99999 1.5C2.17157 1.5 1.5 2.17157 1.5 2.99999V20.9999C1.5 21.8283 2.17157 22.4999 2.99999 22.4999H20.9999C21.8283 22.4999 22.4999 21.8283 22.4999 20.9999V2.99999C22.4999 2.17157 21.8283 1.5 20.9999 1.5H2.99999Z" fill="currentColor" />
    </IconBase>
  );
};

export default TopicTag;

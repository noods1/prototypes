import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type TrendingProps = Omit<IconProps, 'children'>;

/**
 * TrendingIcon
 * 
 * Converted from ECommerce/Trending/TrendingIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Trending: React.FC<TrendingProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M13.7495 6.77832C13.7495 6.22604 14.1973 5.77832 14.7495 5.77832H21.75C22.3023 5.77832 22.75 6.22604 22.75 6.77832V13.7894C22.75 14.3417 22.3023 14.7894 21.75 14.7894C21.1977 14.7894 20.75 14.3417 20.75 13.7894V9.19256L14.2322 15.7105C14.0446 15.898 13.7903 16.0034 13.525 16.0034C13.2598 16.0034 13.0055 15.898 12.8179 15.7105L8.99697 11.8894L2.9571 17.9293C2.56658 18.3198 1.93341 18.3198 1.54289 17.9293C1.15237 17.5387 1.15237 16.9056 1.5429 16.515L8.28987 9.76811C8.47741 9.58058 8.73176 9.47522 8.99698 9.47522C9.2622 9.47522 9.51655 9.58058 9.70409 9.76812L13.5251 13.5892L19.3358 7.77832H14.7495C14.1973 7.77832 13.7495 7.33061 13.7495 6.77832Z" fill="currentColor" />
    </IconBase>
  );
};

export default Trending;

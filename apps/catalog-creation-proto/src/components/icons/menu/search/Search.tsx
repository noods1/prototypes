import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type SearchProps = Omit<IconProps, 'children'>;

/**
 * SearchIcon
 * 
 * Converted from Menu/Search/SearchIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Search: React.FC<SearchProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M9.99996 17C13.8659 17 16.9999 13.866 16.9999 10C16.9999 6.134 13.8659 3 9.99996 3C6.134 3 3 6.134 3 10C3 13.866 6.134 17 9.99996 17ZM9.99996 19C14.9705 19 18.9999 14.9706 18.9999 10C18.9999 5.02944 14.9705 1 9.99996 1C5.02942 1 1 5.02944 1 10C1 14.9706 5.02942 19 9.99996 19Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M10.623 4.84154C10.807 4.32082 11.3783 4.0479 11.899 4.23195C12.5832 4.47377 13.2044 4.84658 13.7327 5.31943C14.4128 5.92809 14.9412 6.70456 15.2526 7.58548C15.4366 8.1062 15.1637 8.67752 14.643 8.86157C14.1223 9.04561 13.5509 8.77269 13.3669 8.25197C13.1695 7.69351 12.8335 7.19866 12.3989 6.8097C12.0616 6.50779 11.6662 6.2709 11.2326 6.11763C10.7118 5.93358 10.4389 5.36225 10.623 4.84154Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M15.9999 14.5858L22.707 21.2929C23.0975 21.6834 23.0975 22.3165 22.707 22.7071C22.3165 23.0976 21.6833 23.0976 21.2928 22.7071L14.5857 16L15.9999 14.5858Z" fill="currentColor" />
    </IconBase>
  );
};

export default Search;

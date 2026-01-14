import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type EraseProps = Omit<IconProps, 'children'>;

/**
 * EraseIcon
 * 
 * Converted from Formatting/Edit/EraseIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Erase: React.FC<EraseProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M9.18103 21.084C9.18103 20.5318 9.62875 20.084 10.181 20.084L22.3824 20.084C22.9347 20.084 23.3824 20.5318 23.3824 21.084C23.3824 21.6363 22.9347 22.084 22.3824 22.084L10.181 22.084C9.62875 22.084 9.18103 21.6363 9.18103 21.084Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M5.06247 10.5809C5.45299 10.1903 6.08616 10.1903 6.47668 10.5809L14.6195 18.7236C15.01 19.1142 15.01 19.7473 14.6195 20.1378C14.2289 20.5284 13.5958 20.5284 13.2052 20.1378L5.06247 11.9951C4.67194 11.6045 4.67194 10.9714 5.06247 10.5809Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M2.82388 15.2616L7.64002 20.0778H11.9071L20.9139 11.071L13.9642 4.12125L2.82388 15.2616ZM1.05765 14.1994L12.902 2.35501C13.4886 1.76838 14.4398 1.76838 15.0264 2.35501L22.6801 10.0088C23.2668 10.5954 23.2668 11.5465 22.6801 12.1332L13.1755 21.6378C12.8938 21.9195 12.5118 22.0778 12.1134 22.0778H7.43381C7.03541 22.0778 6.65333 21.9195 6.37162 21.6378L1.05765 16.3238C0.471018 15.7372 0.471018 14.7861 1.05765 14.1994Z" fill="currentColor" />
    </IconBase>
  );
};

export default Erase;

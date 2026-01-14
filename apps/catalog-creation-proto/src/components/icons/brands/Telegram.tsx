import React from 'react';
import { IconBase, IconProps } from '../IconBase';

type TelegramProps = Omit<IconProps, 'children'>;

/**
 * TelegramIcon
 * 
 * Converted from Brands/TelegramIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Telegram: React.FC<TelegramProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M6.51634 11.4946L13.9622 8.43131C14.6972 8.11221 17.1898 7.09111 17.1898 7.09111C17.1898 7.09111 18.3402 6.64438 18.2443 7.7293C18.2124 8.17603 17.9567 9.73959 17.7011 11.4308L16.9022 16.4406C16.9022 16.4406 16.8382 17.1745 16.295 17.3021C15.7517 17.4298 14.857 16.8554 14.6972 16.7278C14.5693 16.632 12.3004 15.1961 11.4696 14.4941C11.2459 14.3026 10.9902 13.9197 11.5015 13.473C12.652 12.42 14.0261 11.1117 14.857 10.2821C15.2404 9.89914 15.6239 9.00568 14.0261 10.0906L9.52024 13.122C9.52024 13.122 9.00894 13.4411 8.05025 13.1539C7.09156 12.8667 5.97309 12.4838 5.97309 12.4838C5.97309 12.4838 5.20613 12.0052 6.51634 11.4946Z" fill="currentColor" />
    </IconBase>
  );
};

export default Telegram;

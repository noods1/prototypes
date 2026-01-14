import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type CheckMarkProps = Omit<IconProps, 'children'>;

/**
 * CheckMarkIcon
 * 
 * Converted from Symbols/Check/CheckMarkIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const CheckMark: React.FC<CheckMarkProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M21.4792 3.92313C21.7978 4.18782 21.8415 4.66067 21.5768 4.97928L9.11534 19.9792C8.97285 20.1507 8.76143 20.2499 8.53845 20.2499C8.31547 20.2499 8.10405 20.1507 7.96156 19.9792L2.42313 13.3126C2.15844 12.994 2.20215 12.5211 2.52075 12.2564C2.83936 11.9917 3.31222 12.0354 3.57691 12.354L8.53845 18.3263L20.423 4.02075C20.6877 3.70215 21.1606 3.65844 21.4792 3.92313Z" fill="currentColor" />
    </IconBase>
  );
};

export default CheckMark;

import React from 'react';
import { IconBase, IconProps } from '../../../IconBase';

type UnmarkedFlagProps = Omit<IconProps, 'children'>;

/**
 * UnmarkedFlagIcon
 * 
 * Converted from Formatting/Flag/Filled/UnmarkedFlagIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const UnmarkedFlag: React.FC<UnmarkedFlagProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M6.93613 3.08592C7.35034 3.08592 7.68612 3.4217 7.68612 3.83591V4.89256C7.76773 4.89263 7.85131 4.90626 7.93424 4.93528L19.9139 9.12817C20.5835 9.36255 20.5835 10.3096 19.9139 10.544L7.93424 14.7368C7.85131 14.7659 7.76773 14.7795 7.68612 14.7796V20.5173H9.18647C9.60069 20.5173 9.93647 20.8531 9.93647 21.2673C9.93647 21.6815 9.60069 22.0173 9.18647 22.0173H4.68649C4.27228 22.0173 3.9365 21.6815 3.9365 21.2673C3.9365 20.8531 4.27228 20.5173 4.68649 20.5173H6.18613L6.18613 3.83591C6.18613 3.4217 6.52192 3.08592 6.93613 3.08592Z" fill="currentColor" />
      <path d="M3.764 3.22102C3.49416 2.90676 3.53017 2.43326 3.84443 2.16342C4.15869 1.89358 4.6322 1.92959 4.90203 2.24385L17.3491 16.74C17.6189 17.0543 17.5829 17.5278 17.2687 17.7976C16.9544 18.0674 16.4809 18.0314 16.2111 17.7172L3.764 3.22102Z" fill="currentColor" />
    </IconBase>
  );
};

export default UnmarkedFlag;

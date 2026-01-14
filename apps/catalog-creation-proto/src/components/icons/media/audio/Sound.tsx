import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type SoundProps = Omit<IconProps, 'children'>;

/**
 * SoundIcon
 * 
 * Converted from Media/Audio/SoundIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Sound: React.FC<SoundProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M7.374 21C9.16891 21 10.624 19.545 10.624 17.75C10.624 15.9551 9.16891 14.5 7.374 14.5C5.5791 14.5 4.12402 15.9551 4.12402 17.75C4.12402 19.545 5.5791 21 7.374 21ZM7.374 23C10.2735 23 12.624 20.6495 12.624 17.75C12.624 14.8505 10.2735 12.5 7.374 12.5C4.47452 12.5 2.12402 14.8505 2.12402 17.75C2.12402 20.6495 4.47452 23 7.374 23Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M14.7201 3C14.4652 3 14.251 3.19186 14.2231 3.4453L12.5594 18.5639C12.499 19.1128 12.005 19.5089 11.456 19.4485C10.9071 19.3881 10.511 18.8941 10.5714 18.3451L12.2351 3.22653C12.3746 1.9593 13.4453 1 14.7201 1H20.8761C21.4284 1 21.8761 1.44772 21.8761 2C21.8761 2.55228 21.4284 3 20.8761 3H14.7201Z" fill="currentColor" />
    </IconBase>
  );
};

export default Sound;

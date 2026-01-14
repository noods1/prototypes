import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type PlayProps = Omit<IconProps, 'children'>;

/**
 * PlayIcon
 * 
 * Converted from Media/Actions/PlayIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Play: React.FC<PlayProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2.25C6.6152 2.25 2.25 6.61522 2.25 12C2.25 17.3848 6.6152 21.75 12 21.75C17.3847 21.75 21.7499 17.3848 21.7499 12C21.7499 6.61523 17.3847 2.25 12 2.25ZM10.5665 6.75621L16.675 11.2692C17.0808 11.569 17.0808 12.1759 16.675 12.4756L10.5665 16.9886C10.0714 17.3544 9.37085 17.0009 9.37085 16.3854V7.35944C9.37085 6.7439 10.0714 6.39045 10.5665 6.75621Z" fill="currentColor" fillOpacity="0.5" />
    </IconBase>
  );
};

export default Play;

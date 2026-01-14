import React from 'react';
import { IconBase, IconProps } from '../../../IconBase';

type PlayProps = Omit<IconProps, 'children'>;

/**
 * PlayIcon
 * 
 * Converted from Media/Actions/Filled/PlayIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Play: React.FC<PlayProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M19.978 10.6249L6.05361 0.337642C4.92508 -0.496123 3.32813 0.309561 3.32812 1.71269V22.2873C3.32812 23.6904 4.92508 24.4961 6.05362 23.6624L19.978 13.3751C20.9029 12.6917 20.9029 11.3083 19.978 10.6249Z" fill="currentColor" />
    </IconBase>
  );
};

export default Play;

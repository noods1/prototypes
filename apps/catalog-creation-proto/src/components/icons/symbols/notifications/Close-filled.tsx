import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type Close-filledProps = Omit<IconProps, 'children'>;

/**
 * Close-filledIcon
 * 
 * Converted from Symbols/Notifications/Close-filledIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Close-filled: React.FC<Close-filledProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M22 11.8984C22 17.4213 17.5228 21.8984 12 21.8984C6.47715 21.8984 2 17.4213 2 11.8984C2 6.37559 6.47715 1.89844 12 1.89844C17.5228 1.89844 22 6.37559 22 11.8984Z" fill="currentColor" />
      <path d="M8.18598 7.28186C7.9493 7.04276 7.56556 7.04276 7.32888 7.28186C7.0922 7.52096 7.0922 7.90861 7.32888 8.14771L11.1428 12.0005L7.32888 15.8533C7.0922 16.0924 7.0922 16.48 7.32888 16.7191C7.56556 16.9582 7.9493 16.9582 8.18598 16.7191L11.9999 12.8663L15.8137 16.7191C16.0504 16.9582 16.4341 16.9582 16.6708 16.7191C16.9075 16.48 16.9075 16.0924 16.6708 15.8533L12.857 12.0005L16.6708 8.14771C16.9075 7.90861 16.9075 7.52096 16.6708 7.28186C16.4341 7.04277 16.0504 7.04277 15.8137 7.28186L11.9999 11.1347L8.18598 7.28186Z" fill="currentColor" />
    </IconBase>
  );
};

export default Close-filled;

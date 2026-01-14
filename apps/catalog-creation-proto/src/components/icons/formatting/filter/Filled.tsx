import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type FilledProps = Omit<IconProps, 'children'>;

/**
 * FilledIcon
 * 
 * Converted from Formatting/Filter/FilledIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Filled: React.FC<FilledProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M19.8292 2.28125C22.0746 2.45592 23.0968 5.27091 21.3838 6.83984L14.9004 12.7764C14.7972 12.8711 14.7383 13.0054 14.7383 13.1455V19.7275C14.738 21.1165 13.3633 22.0681 12.0782 21.6152L11.9542 21.5674L10.8233 21.085C9.85445 20.6721 9.22494 19.7204 9.22466 18.667V13.1104C9.22462 12.9705 9.16554 12.8368 9.06256 12.7422L2.61724 6.83984C0.849004 5.22025 1.99493 2.2717 4.39263 2.27148H19.6085L19.8292 2.28125Z" fill="currentColor" />
    </IconBase>
  );
};

export default Filled;

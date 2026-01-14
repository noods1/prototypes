import React from 'react';
import { IconBase, IconProps } from '../IconBase';

type PinProps = Omit<IconProps, 'children'>;

/**
 * PinIcon
 * 
 * Converted from Formatting/PinIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Pin: React.FC<PinProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M15.0254 4.05078C15.5776 4.05089 16.0254 4.49856 16.0254 5.05078V10.6533L17.71 12.3496C17.8957 12.5369 17.9999 12.79 18 13.0537V14.9805C18 15.5328 17.5523 15.9805 17 15.9805H12.9902V18.875L12.0078 19.9502L11.0127 18.8779V15.9805H7C6.44772 15.9805 6 15.5328 6 14.9805V13.0469L6.00488 12.9443C6.02915 12.7083 6.13709 12.4873 6.31055 12.3223L8.02637 10.6904V5.05078C8.02637 4.49863 8.47427 4.051 9.02637 4.05078H15.0254ZM10.0264 11.1191C10.0263 11.3929 9.91421 11.655 9.71582 11.8438L8 13.4756V13.9805H16V13.4658L14.3154 11.7695C14.1296 11.5823 14.0255 11.3292 14.0254 11.0654V6.05078H10.0264V11.1191Z" fill="currentColor" />
    </IconBase>
  );
};

export default Pin;

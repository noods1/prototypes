import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type RTLAllApplicationsProps = Omit<IconProps, 'children'>;

/**
 * RTL/Menu/RTLAllApplications
 * 
 * This icon component is auto-generated from Figma.
 * TODO: Replace placeholder SVG with actual icon paths from Figma.
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const RTLAllApplications: React.FC<RTLAllApplicationsProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} {...props}>
      {/* TODO: Add actual SVG paths from Figma */}
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </IconBase>
  );
};

export default RTLAllApplications;

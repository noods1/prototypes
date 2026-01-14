import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type CompareProps = Omit<IconProps, 'children'>;

/**
 * CompareIcon
 * 
 * Converted from Arrows/Datepicker/CompareIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Compare: React.FC<CompareProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M17.1115 8.18522C17.502 7.79503 18.1351 7.79503 18.5256 8.18522L21.4953 11.1559C22.0028 11.6636 22.0028 12.4862 21.4953 12.9938L18.5256 15.9635C18.1351 16.3541 17.5021 16.3541 17.1115 15.9635C16.7211 15.573 16.7211 14.94 17.1115 14.5495L18.5862 13.0749H5.4133L6.88889 14.5505C7.27941 14.941 7.2794 15.574 6.88889 15.9645C6.49837 16.355 5.86535 16.355 5.47483 15.9645L2.5051 12.9948C1.99763 12.4872 1.99767 11.6646 2.5051 11.1569L5.47483 8.1862C5.86531 7.79588 6.49841 7.79588 6.88889 8.1862C7.27936 8.57667 7.27925 9.20972 6.88889 9.60026L5.41526 11.0749H18.5862L17.1115 9.60026C16.721 9.20973 16.721 8.57574 17.1115 8.18522Z" fill="currentColor" />
    </IconBase>
  );
};

export default Compare;

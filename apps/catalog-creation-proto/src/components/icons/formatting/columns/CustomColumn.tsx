import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type CustomColumnProps = Omit<IconProps, 'children'>;

/**
 * CustomColumnIcon
 * 
 * Converted from Formatting/Columns/CustomColumnIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const CustomColumn: React.FC<CustomColumnProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M20.2314 3.56348C21.336 3.56348 22.2314 4.45988 22.2314 5.56445V19.502C22.2312 20.6063 21.3359 21.502 20.2314 21.502H3.73145C2.62702 21.5019 1.73168 20.6063 1.73145 19.502V5.56445C1.73145 4.45989 2.62688 3.56349 3.73145 3.56348H20.2314ZM3.73145 19.502H7.96484V5.56445H3.73145V19.502ZM16.0703 19.502H20.2314V5.56445H16.0703V19.502ZM9.96484 19.502H14.0703V5.56445H9.96484V19.502Z" fill="currentColor" />
    </IconBase>
  );
};

export default CustomColumn;

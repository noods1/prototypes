import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type ApplyFilterProps = Omit<IconProps, 'children'>;

/**
 * ApplyFilterIcon
 * 
 * Converted from Formatting/Filter/ApplyFilterIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const ApplyFilter: React.FC<ApplyFilterProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M3.8981 4.36523C3.44005 4.36523 3.2231 4.92992 3.56331 5.23661L10.3638 11.367C10.8896 11.8411 11.1898 12.5159 11.1898 13.2239V18.8583C11.1898 19.0613 11.3126 19.2442 11.5006 19.3211L12.1681 19.5941C12.4971 19.7286 12.8574 19.4867 12.8574 19.1313V13.1808C12.8574 12.4728 13.1576 11.798 13.6835 11.3239L20.4361 5.23661C20.7763 4.92992 20.5594 4.36523 20.1013 4.36523H3.8981ZM2.22418 6.72211C0.523115 5.18865 1.60788 2.36523 3.8981 2.36523H20.1013C22.3915 2.36523 23.4763 5.18865 21.7752 6.72211L15.0226 12.8094C14.9174 12.9042 14.8574 13.0392 14.8574 13.1808V19.1313C14.8574 20.9082 13.0557 22.1179 11.411 21.4453L10.7435 21.1722C9.80379 20.7879 9.18985 19.8735 9.18985 18.8583V13.2239C9.18985 13.0823 9.12981 12.9473 9.02463 12.8525L2.22418 6.72211Z" fill="currentColor" />
    </IconBase>
  );
};

export default ApplyFilter;

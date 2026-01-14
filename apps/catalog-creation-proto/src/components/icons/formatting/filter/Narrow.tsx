import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type NarrowProps = Omit<IconProps, 'children'>;

/**
 * NarrowIcon
 * 
 * Converted from Formatting/Filter/NarrowIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Narrow: React.FC<NarrowProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M7.96609 4.15569C7.96609 3.20892 8.73361 2.44141 9.68039 2.44141H19.9662C20.9129 2.44141 21.6805 3.20892 21.6805 4.15569V14.4414C21.6805 15.3881 20.9129 16.1557 19.9662 16.1557H16.0342V19.8448C16.0342 20.7916 15.2667 21.5591 14.3199 21.5591H4.03412C3.08734 21.5591 2.31982 20.7916 2.31982 19.8448V9.55911C2.31982 8.61234 3.08734 7.84483 4.03412 7.84483H7.96609V4.15569ZM4.31983 9.84483H7.96582V14.4416C7.96582 15.3883 8.73332 16.1559 9.68008 16.1559H14.0342V19.5591H4.31983V9.84483ZM16.0338 14.1557H19.6804V4.4414H9.96611V7.84497H14.3195C15.2663 7.84497 16.0338 8.61249 16.0338 9.55927V14.1557Z" fill="currentColor" />
    </IconBase>
  );
};

export default Narrow;

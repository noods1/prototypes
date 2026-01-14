import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type AnalyticsProps = Omit<IconProps, 'children'>;

/**
 * AnalyticsIcon
 * 
 * Converted from ECommerce/Campaign/AnalyticsIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Analytics: React.FC<AnalyticsProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M11.24 4.5198C6.68916 4.5198 3 8.20899 3 12.7598C3 17.3106 6.68916 20.9998 11.24 20.9998C15.7908 20.9998 19.4799 17.3106 19.4799 12.7598H21.4799C21.4799 18.4152 16.8953 22.9998 11.24 22.9998C5.58458 22.9998 1 18.4152 1 12.7598C1 7.10443 5.58458 2.5198 11.24 2.5198V4.5198Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M11.2398 1V12.76H22.9998C22.9998 12.0782 22.9418 11.41 22.8304 10.76C21.9922 5.86781 18.132 2.00757 13.2398 1.16938C12.5898 1.05802 11.9216 1 11.2398 1ZM13.2398 3.20511V10.76H20.7947C20.0063 6.97459 17.0252 3.99344 13.2398 3.20511Z" fill="currentColor" />
    </IconBase>
  );
};

export default Analytics;

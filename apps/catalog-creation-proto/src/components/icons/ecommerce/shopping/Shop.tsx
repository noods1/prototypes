import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type ShopProps = Omit<IconProps, 'children'>;

/**
 * ShopIcon
 * 
 * Converted from ECommerce/Shopping/ShopIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Shop: React.FC<ShopProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M2.92428 21.0001V8.75095H4.92428V20.7501H19.078V8.75095H21.078V21.0001C21.078 21.9666 20.2945 22.7501 19.328 22.7501H4.67427C3.70778 22.7501 2.92428 21.9666 2.92428 21.0001Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M9.38673 14.6256H3.92523V12.6256H9.63674C10.6032 12.6256 11.3867 13.4091 11.3867 14.3756V16.1254C11.3867 17.0919 10.6032 17.8754 9.63674 17.8754H3.92523V15.8754H9.38673V14.6256Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M1.89129 2.60647C2.07454 1.81245 2.78158 1.25 3.59647 1.25H20.4031C21.218 1.25 21.9251 1.81246 22.1083 2.60647L23.2621 7.60604C23.5152 8.70262 22.6824 9.74956 21.557 9.74956H2.44265C1.31724 9.74956 0.484399 8.70262 0.737472 7.60604L1.89129 2.60647ZM3.79535 3.25L2.75692 7.74956H21.2427L20.2043 3.25H3.79535Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M15.2313 8.50637C15.7835 8.50637 16.2313 8.95409 16.2313 9.50637V21.6931C16.2313 22.2453 15.7835 22.6931 15.2313 22.6931C14.679 22.6931 14.2313 22.2453 14.2313 21.6931V9.50637C14.2313 8.95409 14.679 8.50637 15.2313 8.50637Z" fill="currentColor" />
    </IconBase>
  );
};

export default Shop;

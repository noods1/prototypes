import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type HomeProps = Omit<IconProps, 'children'>;

/**
 * HomeIcon
 * 
 * Converted from Menu/Home/HomeIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Home: React.FC<HomeProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M18.9999 10.4607L12 4.62742L5 10.4607L5 19.524H18.9999V10.4607ZM20.9999 10.2266C20.9999 9.78139 20.8022 9.35922 20.4602 9.07423L12.9602 2.82423C12.404 2.36067 11.596 2.36067 11.0397 2.82423L3.53972 9.07423C3.19773 9.35922 3 9.78139 3 10.2266L3 20.024C3 20.8524 3.67157 21.524 4.49999 21.524H19.4999C20.3283 21.524 20.9999 20.8524 20.9999 20.024V10.2266Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M7.81835 17.144C7.81835 16.5917 8.26606 16.144 8.81835 16.144H15.1823C15.7346 16.144 16.1823 16.5917 16.1823 17.144C16.1823 17.6963 15.7346 18.144 15.1823 18.144H8.81835C8.26606 18.144 7.81835 17.6963 7.81835 17.144Z" fill="currentColor" />
    </IconBase>
  );
};

export default Home;

import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type CartProps = Omit<IconProps, 'children'>;

/**
 * CartIcon
 * 
 * Converted from ECommerce/Shopping/CartIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Cart: React.FC<CartProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M4.31201 6.49994C4.31202 5.53345 5.09552 4.74997 6.062 4.74997H20.9378C22.0103 4.74997 22.8305 5.70597 22.6674 6.76604L21.3983 15.016C21.267 15.8698 20.5324 16.5 19.6687 16.5H6.06186C5.09536 16.5 4.31185 15.7165 4.31187 14.7499L4.31201 6.49994ZM6.312 6.74997L6.31187 14.5H19.4542L20.6464 6.74997H6.312Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M1.66439 1.23808C2.08519 0.880394 2.71629 0.931565 3.07397 1.35237L5.89542 4.67173C6.16436 4.98813 6.31202 5.38986 6.31202 5.80511V17.5H20.312C20.8642 17.5 21.312 17.9477 21.312 18.5C21.312 19.0523 20.8642 19.5 20.312 19.5H6.06201C5.09552 19.5 4.31202 18.7165 4.31202 17.75V5.89701L1.55009 2.64767C1.19241 2.22686 1.24358 1.59576 1.66439 1.23808Z" fill="currentColor" />
      <path d="M6.81202 21.5C6.81202 22.3284 6.14045 23 5.31203 23C4.4836 23 3.81203 22.3284 3.81203 21.5C3.81203 20.6716 4.4836 20 5.31203 20C6.14045 20 6.81202 20.6716 6.81202 21.5Z" fill="currentColor" />
      <path d="M21.8119 21.5C21.8119 22.3284 21.1404 23 20.312 23C19.4835 23 18.812 22.3284 18.812 21.5C18.812 20.6716 19.4835 20 20.312 20C21.1404 20 21.8119 20.6716 21.8119 21.5Z" fill="currentColor" />
    </IconBase>
  );
};

export default Cart;

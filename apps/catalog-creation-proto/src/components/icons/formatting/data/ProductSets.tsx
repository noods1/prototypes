import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type ProductSetsProps = Omit<IconProps, 'children'>;

/**
 * ProductSets
 *
 * Icon for Product Sets menu item
 *
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const ProductSets: React.FC<ProductSetsProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 16 16" {...props}>
      <path d="M1.3335 3.97176L8.00016 6.33366L14.6668 3.97176L8.00016 1.66699L1.3335 3.97176Z" fill="currentColor" stroke="currentColor" strokeWidth="1.33333" strokeLinejoin="round"/>
      <path d="M1.33252 6.66699L7.99919 9.00033L14.6659 6.66699" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M1.33252 9.33301L7.99919 11.6663L14.6659 9.33301" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M1.33252 12L7.99919 14.3333L14.6659 12" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </IconBase>
  );
};

export default ProductSets;


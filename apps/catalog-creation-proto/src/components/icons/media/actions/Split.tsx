import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type SplitProps = Omit<IconProps, 'children'>;

/**
 * SplitIcon
 * 
 * Converted from Media/Actions/SplitIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Split: React.FC<SplitProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M10.3799 21.0001H5.12988C4.30146 21.0001 3.62988 20.3285 3.62988 19.5001L3.62988 4.50012C3.62988 3.6717 4.30146 3.00012 5.12988 3.00012H10.3799V4.50012L5.12988 4.50012L5.12988 19.5001H10.3799V21.0001Z" fill="currentColor" />
      <path d="M13.6206 21.0001H18.8706C19.699 21.0001 20.3706 20.3285 20.3706 19.5001L20.3706 4.50012C20.3706 3.6717 19.699 3.00012 18.8706 3.00012H13.6206V4.50012L18.8706 4.50012L18.8706 19.5001H13.6206V21.0001Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M11.2502 22.7885L11.2502 1.21191L12.7502 1.21191L12.7502 22.7885H11.2502Z" fill="currentColor" />
    </IconBase>
  );
};

export default Split;

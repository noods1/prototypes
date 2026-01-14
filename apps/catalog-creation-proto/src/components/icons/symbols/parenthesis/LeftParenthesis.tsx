import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type LeftParenthesisProps = Omit<IconProps, 'children'>;

/**
 * LeftParenthesisIcon
 * 
 * Converted from Symbols/Parenthesis/LeftParenthesisIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const LeftParenthesis: React.FC<LeftParenthesisProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M8.48633 12.0003C8.48635 6.43971 11.5658 3.2564 14.0137 1.84307C14.492 1.56693 15.1037 1.73101 15.3799 2.20928C15.656 2.68758 15.492 3.29935 15.0137 3.57549C13.0486 4.71012 10.4864 7.29862 10.4863 12.0003C10.4863 16.7199 12.7297 19.1064 15.0137 20.4251C15.4919 20.7012 15.656 21.313 15.3799 21.7913C15.1037 22.2696 14.492 22.4337 14.0137 22.1575C11.2109 20.5393 8.48633 17.543 8.48633 12.0003Z" fill="currentColor" />
    </IconBase>
  );
};

export default LeftParenthesis;

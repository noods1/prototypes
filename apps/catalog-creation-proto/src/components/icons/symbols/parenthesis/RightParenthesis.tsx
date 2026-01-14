import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type RightParenthesisProps = Omit<IconProps, 'children'>;

/**
 * RightParenthesisIcon
 * 
 * Converted from Symbols/Parenthesis/RightParenthesisIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const RightParenthesis: React.FC<RightParenthesisProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M13.5139 12.0003C13.5139 7.29844 10.9517 4.71003 8.9866 3.57547C8.50833 3.29934 8.34431 2.68754 8.62039 2.20926C8.89651 1.73099 9.50832 1.56697 9.9866 1.84304C12.4345 3.25634 15.5139 6.4396 15.5139 12.0003C15.5139 17.5431 12.7895 20.5393 9.9866 22.1575C9.50831 22.4336 8.89653 22.2696 8.62039 21.7913C8.34438 21.313 8.50836 20.7012 8.9866 20.4251C11.2706 19.1064 13.5139 16.72 13.5139 12.0003Z" fill="currentColor" />
    </IconBase>
  );
};

export default RightParenthesis;

import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type EditContentProps = Omit<IconProps, 'children'>;

/**
 * EditContentIcon
 * 
 * Converted from Formatting/Edit/EditContentIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const EditContent: React.FC<EditContentProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M20.2109 3.23487C21.6738 4.69777 21.6738 7.06962 20.2109 8.53251L10.0796 18.6636C9.97529 18.7679 9.83426 18.8273 9.68672 18.829L6.13022 18.8696C5.29506 18.8791 4.61297 18.2046 4.61311 17.3694L4.6137 13.7573C4.61372 13.6074 4.67333 13.4636 4.7794 13.3577L14.9148 3.23341C16.3779 1.77189 18.7486 1.77254 20.2109 3.23487ZM6.6136 14.3524L6.61319 16.8639L9.07903 16.8358L16.9876 8.92733L14.5174 6.45723L6.6136 14.3524ZM18.7967 7.11828L18.4018 7.51313L15.9324 5.04379L16.3282 4.64841C17.0101 3.9672 18.1151 3.9675 18.7967 4.64908C19.4785 5.33093 19.4785 6.43643 18.7967 7.11828Z" fill="currentColor" />
      <path d="M3.69141 19.8627C3.13912 19.8627 2.69141 20.3104 2.69141 20.8627C2.69141 21.415 3.13912 21.8627 3.69141 21.8627H20.1913C20.7436 21.8627 21.1913 21.415 21.1913 20.8627C21.1913 20.3104 20.7436 19.8627 20.1913 19.8627H3.69141Z" fill="currentColor" />
    </IconBase>
  );
};

export default EditContent;

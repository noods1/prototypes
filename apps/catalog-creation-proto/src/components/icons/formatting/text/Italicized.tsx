import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type ItalicizedProps = Omit<IconProps, 'children'>;

/**
 * ItalicizedIcon
 * 
 * Converted from Formatting/Text/ItalicizedIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Italicized: React.FC<ItalicizedProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M14.1031 2.56405H8.81482C8.26254 2.56405 7.81482 3.01176 7.81482 3.56405C7.81482 4.11633 8.26254 4.56405 8.81482 4.56405H12.8273L8.7584 19.4512H4.90137C4.34908 19.4512 3.90137 19.8989 3.90137 20.4512C3.90137 21.0035 4.34908 21.4512 4.90137 21.4512H9.50004C9.51495 21.4515 9.52983 21.4515 9.54466 21.4512H15.1871C15.7394 21.4512 16.1871 21.0035 16.1871 20.4512C16.1871 19.8989 15.7394 19.4512 15.1871 19.4512H10.8318L14.9006 4.56405H19.1005C19.6528 4.56405 20.1005 4.11633 20.1005 3.56405C20.1005 3.01176 19.6528 2.56405 19.1005 2.56405H14.1704C14.1479 2.56328 14.1255 2.56329 14.1031 2.56405Z" fill="currentColor" />
    </IconBase>
  );
};

export default Italicized;

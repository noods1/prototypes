import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type FoldProps = Omit<IconProps, 'children'>;

/**
 * FoldIcon
 * 
 * Converted from Arrows/Sort/FoldIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Fold: React.FC<FoldProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M2 19.0629C2 19.6152 2.44772 20.0629 3 20.0629H20.9999C21.5522 20.0629 21.9999 19.6152 21.9999 19.0629C21.9999 18.5106 21.5522 18.0629 20.9999 18.0629H3C2.44772 18.0629 2 18.5106 2 19.0629Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M9.50029 11.5C9.50029 12.0523 9.948 12.5 10.5003 12.5H21.0002C21.5525 12.5 22.0002 12.0523 22.0002 11.5C22.0002 10.9477 21.5525 10.5 21.0002 10.5H10.5003C9.948 10.5 9.50029 10.9477 9.50029 11.5Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M9.50029 4C9.50029 4.55228 9.948 5 10.5003 5H21.0002C21.5525 5 22.0002 4.55228 22.0002 4C22.0002 3.44772 21.5525 3 21.0002 3H10.5003C9.948 3 9.50029 3.44772 9.50029 4Z" fill="currentColor" />
      <path d="M8.43529 7.04102L4.31939 3.80197C3.77315 3.37211 3.0002 3.78749 3.0002 4.51091V10.989C3.0002 11.7124 3.77315 12.1278 4.31939 11.698L8.43529 8.45891C8.88299 8.10658 8.88299 7.39335 8.43529 7.04102Z" fill="currentColor" />
    </IconBase>
  );
};

export default Fold;

import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type FolderProps = Omit<IconProps, 'children'>;

/**
 * FolderIcon
 * 
 * Converted from Menu/Organization/FolderIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Folder: React.FC<FolderProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M3.5038 4.62207V5.87207H13.4358L12.5702 4.62207H3.5038ZM17.2537 7.87207H1.5038V4.12206C1.5038 3.29364 2.17537 2.62207 3.00379 2.62207H12.8321C13.3242 2.62207 13.785 2.86347 14.0652 3.26805L17.2537 7.87207Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M3.5 8.37805V19.3781H20.4999V8.37805H3.5ZM2.99999 6.37805C2.17157 6.37805 1.5 7.04962 1.5 7.87805V19.8781C1.5 20.7065 2.17157 21.3781 2.99999 21.3781H20.9999C21.8283 21.3781 22.4999 20.7065 22.4999 19.8781V7.87805C22.4999 7.04962 21.8283 6.37805 20.9999 6.37805H2.99999Z" fill="currentColor" />
    </IconBase>
  );
};

export default Folder;

import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type FolderProps = Omit<IconProps, 'children'>;

/**
 * FolderIcon
 * 
 * Converted from FileExtensions/LocalFiles/FolderIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Folder: React.FC<FolderProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M23.222 0H0.778C0.348322 0 0 0.348322 0 0.778V23.222C0 23.6517 0.348322 24 0.778 24H23.222C23.6517 24 24 23.6517 24 23.222V0.778C24 0.348322 23.6517 0 23.222 0Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M4.2002 10.1657C4.2002 9.26373 4.9317 8.53223 5.8337 8.53223H18.1672C19.0692 8.53223 19.8007 9.26323 19.8007 10.1657V17.1657C19.8003 17.5988 19.6281 18.0141 19.3218 18.3203C19.0156 18.6266 18.6003 18.7988 18.1672 18.7992H5.8337C5.40059 18.7988 4.98533 18.6266 4.67908 18.3203C4.37282 18.0141 4.20059 17.5988 4.2002 17.1657V10.1657ZM6.4667 10.7992V16.5327H17.5332V10.7992H6.4667Z" fill="currentColor" />
      <path opacity="0.55" fillRule="evenodd" clipRule="evenodd" d="M4.2002 6.83272C4.2002 5.93072 4.9317 5.19922 5.8337 5.19922H11.4192C12.0472 5.19922 12.6197 5.55922 12.8917 6.12572L15.1352 10.7992H4.2002V6.83272ZM6.4667 7.46622V8.53272H11.5322L11.0202 7.46622H6.4667Z" fill="currentColor" />
    </IconBase>
  );
};

export default Folder;

import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type UndoProps = Omit<IconProps, 'children'>;

/**
 * UndoIcon
 * 
 * Converted from Arrows/Revisions/UndoIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Undo: React.FC<UndoProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M5.76467 10.8709C6.15519 10.4804 6.15519 9.84725 5.76467 9.45672L3.01033 6.70236C2.6198 6.31184 1.98664 6.31184 1.59612 6.70236C1.20559 7.09289 1.20559 7.72605 1.59612 8.11658L4.35046 10.8709C4.74098 11.2615 5.37415 11.2615 5.76467 10.8709Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M1.59612 8.11658C1.98664 8.5071 2.61898 8.50727 3.0095 8.11674L5.76384 5.36238C6.15437 4.97186 6.15437 4.33869 5.76384 3.94817C5.37332 3.55764 4.74016 3.55764 4.34963 3.94817L1.59612 6.70236C1.20559 7.09289 1.20559 7.72605 1.59612 8.11658Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M22.6966 13.3453C22.6966 9.47993 19.5631 6.34642 15.6977 6.34642H2.71245C2.16017 6.34642 1.71245 6.79413 1.71245 7.34642C1.71245 7.8987 2.16017 8.34642 2.71245 8.34642H15.6977C18.4585 8.34642 20.6966 10.5845 20.6966 13.3453C20.6966 16.1061 18.4585 18.3442 15.6977 18.3442H5.19665C4.64436 18.3442 4.19665 18.7919 4.19665 19.3442C4.19665 19.8965 4.64436 20.3442 5.19665 20.3442H15.6977C19.563 20.3442 22.6966 17.2107 22.6966 13.3453Z" fill="currentColor" />
    </IconBase>
  );
};

export default Undo;

import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type MoveOneProps = Omit<IconProps, 'children'>;

/**
 * MoveOneIcon
 * 
 * Converted from Arrows/Movement/MoveOneIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const MoveOne: React.FC<MoveOneProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M2.76228 3.66639C2.42488 2.1443 4.09614 0.974057 5.41104 1.8117L20.469 11.4042C21.9154 12.3256 21.3109 14.5618 19.5972 14.6288L12.6036 14.9026L9.95444 21.3808C9.30531 22.9682 6.99727 22.7715 6.62613 21.0972L2.76228 3.66639ZM4.84549 3.82277L8.40576 19.884L10.8133 13.9967C11.0729 13.3619 11.6794 12.9372 12.3647 12.9104L18.7204 12.6616L4.84549 3.82277Z" fill="currentColor" />
    </IconBase>
  );
};

export default MoveOne;

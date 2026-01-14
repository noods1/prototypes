import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type RedoProps = Omit<IconProps, 'children'>;

/**
 * RedoIcon
 * 
 * Converted from Arrows/Revisions/RedoIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Redo: React.FC<RedoProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M19.0451 8.69104H7.9989C5.23808 8.69104 3 10.9291 3 13.6899C3 16.4508 5.23809 18.6888 7.99891 18.6888H18.4999C19.0522 18.6888 19.4999 19.1366 19.4999 19.6888C19.4999 20.2411 19.0522 20.6888 18.4999 20.6888H7.99891C4.13352 20.6888 1 17.5553 1 13.6899C1 9.82455 4.13351 6.69104 7.9989 6.69104H18.9181L17.9342 5.70711C17.5437 5.31659 17.5437 4.68342 17.9342 4.29289C18.3247 3.90237 18.9579 3.90237 19.3484 4.29289L22.0888 7.03328L22.1031 7.04729C22.4936 7.43781 22.4936 8.07098 22.1031 8.4615L19.3487 11.2159C18.9582 11.6064 18.325 11.6064 17.9345 11.2159C17.544 10.8253 17.544 10.1922 17.9345 9.80165L19.0451 8.69104Z" fill="currentColor" />
    </IconBase>
  );
};

export default Redo;

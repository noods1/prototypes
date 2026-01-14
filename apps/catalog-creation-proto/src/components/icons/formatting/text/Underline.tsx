import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type UnderlineProps = Omit<IconProps, 'children'>;

/**
 * UnderlineIcon
 * 
 * Converted from Formatting/Text/UnderlineIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Underline: React.FC<UnderlineProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M7.10577 1.90234C7.65806 1.90234 8.10577 2.35006 8.10577 2.90234V12.7839C8.10577 14.9348 9.84943 16.6784 12.0003 16.6784C14.1513 16.6784 15.8949 14.9348 15.8949 12.7839V2.90234C15.8949 2.35006 16.3426 1.90234 16.8949 1.90234C17.4472 1.90234 17.8949 2.35006 17.8949 2.90234V12.7839C17.8949 16.0393 15.2558 18.6784 12.0003 18.6784C8.74486 18.6784 6.10577 16.0393 6.10577 12.7839V2.90234C6.10577 2.35006 6.55349 1.90234 7.10577 1.90234Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M3.28613 21.0968C3.28613 20.5445 3.73385 20.0968 4.28613 20.0968H19.7147C20.267 20.0968 20.7147 20.5445 20.7147 21.0968C20.7147 21.6491 20.267 22.0968 19.7147 22.0968H4.28613C3.73385 22.0968 3.28613 21.6491 3.28613 21.0968Z" fill="currentColor" />
    </IconBase>
  );
};

export default Underline;

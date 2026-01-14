import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type More-HorizontalProps = Omit<IconProps, 'children'>;

/**
 * More-HorizontalIcon
 * 
 * Converted from Menu/Actions/More-HorizontalIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const More-Horizontal: React.FC<More-HorizontalProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M13.7499 12C13.7499 12.9664 12.9664 13.7499 11.9999 13.7499C11.0335 13.7499 10.25 12.9664 10.25 12C10.25 11.0335 11.0335 10.25 11.9999 10.25C12.9664 10.25 13.7499 11.0335 13.7499 12Z" fill="currentColor" />
      <path d="M19.7499 12C19.7499 12.9664 18.9664 13.7499 17.9999 13.7499C17.0335 13.7499 16.25 12.9664 16.25 12C16.25 11.0335 17.0335 10.25 17.9999 10.25C18.9664 10.25 19.7499 11.0335 19.7499 12Z" fill="currentColor" />
      <path d="M7.74989 12C7.74989 12.9664 6.96641 13.7499 5.99994 13.7499C5.03348 13.7499 4.25 12.9664 4.25 12C4.25 11.0335 5.03348 10.25 5.99994 10.25C6.96641 10.25 7.74989 11.0335 7.74989 12Z" fill="currentColor" />
    </IconBase>
  );
};

export default More-Horizontal;

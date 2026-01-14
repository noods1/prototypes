import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type More-VerticalProps = Omit<IconProps, 'children'>;

/**
 * More-VerticalIcon
 * 
 * Converted from Menu/Actions/More-VerticalIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const More-Vertical: React.FC<More-VerticalProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M12.0001 13.75C11.0336 13.75 10.2501 12.9665 10.2501 12C10.2501 11.0335 11.0336 10.25 12.0001 10.25C12.9666 10.25 13.7501 11.0335 13.7501 12C13.7501 12.9665 12.9666 13.75 12.0001 13.75Z" fill="currentColor" />
      <path d="M12.0001 19.8751C11.0336 19.8751 10.2501 19.0916 10.2501 18.1251C10.2501 17.1586 11.0336 16.375 12.0001 16.375C12.9666 16.375 13.7501 17.1586 13.7501 18.1251C13.7501 19.0916 12.9666 19.8751 12.0001 19.8751Z" fill="currentColor" />
      <path d="M12 7.62502C11.0335 7.62502 10.25 6.84151 10.25 5.87501C10.25 4.9085 11.0335 4.125 12 4.125C12.9665 4.125 13.75 4.90851 13.75 5.87501C13.75 6.84151 12.9665 7.62502 12 7.62502Z" fill="currentColor" />
    </IconBase>
  );
};

export default More-Vertical;

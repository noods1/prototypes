import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type FilledProps = Omit<IconProps, 'children'>;

/**
 * FilledIcon
 * 
 * Converted from Formatting/Pin/FilledIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Filled: React.FC<FilledProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M15.0254 4.00586C15.5776 4.00597 16.0254 4.45364 16.0254 5.00586V10.6084L17.71 12.3047C17.8957 12.4919 17.9999 12.745 18 13.0088V14.9355C18 15.4878 17.5523 15.9355 17 15.9355H12.9902V18.918L12.0078 19.9932L11.0127 18.9219V15.9355H7C6.44772 15.9355 6 15.4878 6 14.9355V13.002L6.00488 12.8994C6.02915 12.6634 6.13709 12.4424 6.31055 12.2773L8.02637 10.6455V5.00586C8.02637 4.45371 8.47427 4.00608 9.02637 4.00586H15.0254Z" fill="currentColor" />
    </IconBase>
  );
};

export default Filled;

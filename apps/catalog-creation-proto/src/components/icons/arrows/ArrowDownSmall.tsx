import React from 'react';
import { IconBase, IconProps } from '../IconBase';

type ArrowDownSmallProps = Omit<IconProps, 'children'>;

const ArrowDownSmall: React.FC<ArrowDownSmallProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} {...props}>
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </IconBase>
  );
};

export default ArrowDownSmall;


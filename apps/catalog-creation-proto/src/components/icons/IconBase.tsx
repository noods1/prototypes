import React from 'react';

export type IconSize = '8' | '12' | '14' | '16' | '24' | '32' | '48' | '64';

export interface IconProps {
  size?: IconSize;
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  'aria-label'?: string;
  'aria-hidden'?: boolean;
}

export interface IconComponentProps extends IconProps {
  children: React.ReactNode;
  viewBox?: string;
}

export const IconBase: React.FC<IconComponentProps> = ({
  size = '16',
  className = '',
  style = {},
  color,
  children,
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden = true,
  viewBox = '0 0 16 16',
}) => {
  const sizeMap: Record<IconSize, string> = {
    '8': '8px',
    '12': '12px',
    '14': '14px',
    '16': '16px',
    '24': '24px',
    '32': '32px',
    '48': '48px',
    '64': '64px',
  };

  const iconSize = sizeMap[size];

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ color, ...style }}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      role={ariaLabel ? 'img' : 'presentation'}
    >
      {children}
    </svg>
  );
};


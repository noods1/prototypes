import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type GridLayoutProps = Omit<IconProps, 'children'>;

/**
 * GridLayoutIcon
 * 
 * Converted from Formatting/Layout/GridLayoutIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const GridLayout: React.FC<GridLayoutProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M1.25 18.7501C1.25 20.1308 2.36928 21.2501 3.74999 21.2501H20.2499C21.6306 21.2501 22.7499 20.1308 22.7499 18.7501V5.25006C22.7499 3.86935 21.6306 2.75007 20.2499 2.75007H3.74999C2.36929 2.75007 1.25 3.86935 1.25 5.25006V18.7501ZM3.74999 19.2501C3.47386 19.2501 3.25 19.0262 3.25 18.7501V5.25006C3.25 4.97393 3.47385 4.75007 3.74999 4.75007H20.2499C20.526 4.75007 20.7499 4.97392 20.7499 5.25006V18.7501C20.7499 19.0262 20.526 19.2501 20.2499 19.2501H3.74999Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M11.7471 12.75C11.7471 13.3023 12.1948 13.75 12.7471 13.75L20.9971 13.75C21.5493 13.75 21.9971 13.3023 21.9971 12.75C21.9971 12.1977 21.5493 11.75 20.9971 11.75L12.7471 11.75C12.1948 11.75 11.7471 12.1977 11.7471 12.75Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M12.7471 21.25C13.2994 21.25 13.7471 20.8023 13.7471 20.25L13.7471 3.75C13.7471 3.19771 13.2994 2.75 12.7471 2.75C12.1948 2.75 11.7471 3.19771 11.7471 3.75L11.7471 20.25C11.7471 20.8023 12.1948 21.25 12.7471 21.25Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M13.2734 21.1003C13.743 20.8096 13.8881 20.1932 13.5974 19.7236L3.8474 3.97365C3.55671 3.50406 2.94037 3.35904 2.47078 3.64973C2.0012 3.94043 1.85618 4.55676 2.14687 5.02635L11.8968 20.7764C12.1875 21.2459 12.8039 21.391 13.2734 21.1003Z" fill="currentColor" />
    </IconBase>
  );
};

export default GridLayout;

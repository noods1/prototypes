import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type PreviewProps = Omit<IconProps, 'children'>;

/**
 * PreviewIcon
 * 
 * Converted from Human/Actions/PreviewIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Preview: React.FC<PreviewProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M11.9997 7C8.33626 7 5.21603 9.18243 3.9212 12.2528C3.70659 12.7617 3.12009 13.0003 2.6112 12.7857C2.10232 12.5711 1.86376 11.9845 2.07836 11.4757C3.6854 7.66496 7.53115 5 11.9997 5C16.4683 5 20.3141 7.66496 21.9211 11.4757C22.1357 11.9845 21.8972 12.5711 21.3883 12.7857C20.8794 13.0003 20.2929 12.7617 20.0783 12.2528C18.7834 9.18243 15.6632 7 11.9997 7Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M21.3565 10.93C21.8725 11.1271 22.1309 11.7051 21.9338 12.221C20.4184 16.1876 16.538 18.9999 11.9997 18.9999C7.46145 18.9999 3.58107 16.1876 2.06564 12.221C1.86853 11.7051 2.12697 11.1271 2.64289 10.93C3.1588 10.7329 3.73682 10.9913 3.93393 11.5072C5.15795 14.711 8.3032 16.9999 11.9997 16.9999C15.6962 16.9999 18.8415 14.711 20.0655 11.5072C20.2626 10.9913 20.8406 10.7329 21.3565 10.93Z" fill="currentColor" />
      <path d="M15.2486 12C15.2486 13.7949 13.7936 15.25 11.9987 15.25C10.2037 15.25 8.74867 13.7949 8.74867 12C8.74867 10.2051 10.2037 8.75 11.9987 8.75C13.7936 8.75 15.2486 10.2051 15.2486 12Z" fill="currentColor" />
    </IconBase>
  );
};

export default Preview;

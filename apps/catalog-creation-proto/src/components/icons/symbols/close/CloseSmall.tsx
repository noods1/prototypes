import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type CloseSmallProps = Omit<IconProps, 'children'>;

/**
 * CloseSmallIcon
 * 
 * Converted from Symbols/Close/CloseSmallIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const CloseSmall: React.FC<CloseSmallProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M6.14363 6.14363C6.47836 5.80889 7.02107 5.80889 7.35581 6.14363L17.8558 16.6436C18.1905 16.9783 18.1905 17.521 17.8558 17.8558C17.521 18.1905 16.9783 18.1905 16.6436 17.8558L6.14363 7.35581C5.8089 7.02107 5.8089 6.47836 6.14363 6.14363Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M6.14363 17.8558C5.80889 17.521 5.80889 16.9783 6.14363 16.6436L16.6436 6.14363C16.9783 5.80889 17.521 5.80889 17.8558 6.14363C18.1905 6.47836 18.1905 7.02107 17.8558 7.35581L7.35581 17.8558C7.02107 18.1905 6.47836 18.1905 6.14363 17.8558Z" fill="currentColor" />
    </IconBase>
  );
};

export default CloseSmall;

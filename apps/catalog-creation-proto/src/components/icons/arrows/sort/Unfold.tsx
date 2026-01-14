import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type UnfoldProps = Omit<IconProps, 'children'>;

/**
 * UnfoldIcon
 * 
 * Converted from Arrows/Sort/UnfoldIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Unfold: React.FC<UnfoldProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M2 19.0629C2 19.6151 2.44772 20.0629 3 20.0629H20.9999C21.5522 20.0629 21.9999 19.6151 21.9999 19.0629C21.9999 18.5106 21.5522 18.0629 20.9999 18.0629H3C2.44772 18.0629 2 18.5106 2 19.0629Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M2 11.5001C2 12.0523 2.44772 12.5001 3 12.5001H13.5C14.0522 12.5001 14.5 12.0523 14.5 11.5001C14.5 10.9478 14.0522 10.5001 13.5 10.5001H3C2.44772 10.5001 2 10.9478 2 11.5001Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M2 4C2 4.55228 2.44772 5 3 5H13.5C14.0522 5 14.5 4.55228 14.5 4C14.5 3.44772 14.0522 3 13.5 3H3C2.44772 3 2 3.44772 2 4Z" fill="currentColor" />
      <path d="M15.5679 7.04108L19.6838 3.80203C20.23 3.37217 21.003 3.78756 21.003 4.51097V10.9891C21.003 11.7125 20.23 12.1279 19.6838 11.698L15.5679 8.45897C15.1202 8.10664 15.1202 7.39341 15.5679 7.04108Z" fill="currentColor" />
    </IconBase>
  );
};

export default Unfold;

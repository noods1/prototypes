import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type ExpandProps = Omit<IconProps, 'children'>;

/**
 * ExpandIcon
 * 
 * Converted from Formatting/Filter/ExpandIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Expand: React.FC<ExpandProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M10.8365 10.8368H4.50928V19.4911H13.1636V13.164H19.4907V4.50977H10.8365V10.8368ZM8.83646 4.09155C8.83646 3.21795 9.54465 2.50977 10.4182 2.50977H19.909C20.7825 2.50977 21.4907 3.21795 21.4907 4.09155V13.5823C21.4907 14.4559 20.7825 15.164 19.909 15.164H15.1636V19.9093C15.1636 20.7829 14.4554 21.4911 13.5818 21.4911H4.09106C3.21746 21.4911 2.50928 20.7829 2.50928 19.9093V10.4186C2.50928 9.54503 3.21747 8.83684 4.09106 8.83684H8.83646V4.09155Z" fill="currentColor" />
    </IconBase>
  );
};

export default Expand;

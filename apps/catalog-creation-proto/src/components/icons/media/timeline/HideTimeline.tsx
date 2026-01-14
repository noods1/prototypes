import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type HideTimelineProps = Omit<IconProps, 'children'>;

/**
 * HideTimelineIcon
 * 
 * Converted from Media/Timeline/HideTimelineIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const HideTimeline: React.FC<HideTimelineProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M12.718 7.98123C12.3275 8.37175 11.6944 8.37175 11.3038 7.98123L5.80705 2.48445C5.41653 2.09393 5.41653 1.46076 5.80705 1.07024C6.19758 0.679715 6.83074 0.679714 7.22127 1.07024L12.0109 5.85991L16.8006 1.07024C17.1911 0.679712 17.8243 0.679713 18.2148 1.07024C18.6054 1.46076 18.6054 2.09393 18.2148 2.48445L12.718 7.98123Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M0.856934 11.2224C0.856934 10.2756 1.62445 9.50809 2.57122 9.50809H21.4284C22.3751 9.50809 23.1426 10.2756 23.1426 11.2224V21.5081C23.1426 22.4549 22.3751 23.2224 21.4284 23.2224H2.57122C1.62445 23.2224 0.856934 22.4549 0.856934 21.5081V11.2224ZM2.85693 21.2224V11.5081H21.1426V21.2224H2.85693Z" fill="currentColor" />
    </IconBase>
  );
};

export default HideTimeline;

import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type ShowTimelineProps = Omit<IconProps, 'children'>;

/**
 * ShowTimelineIcon
 * 
 * Converted from Media/Timeline/ShowTimelineIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const ShowTimeline: React.FC<ShowTimelineProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path d="M12.718 1.07024C12.3275 0.679713 11.6944 0.679713 11.3038 1.07024L5.80705 6.56701C5.41653 6.95753 5.41653 7.5907 5.80705 7.98122C6.19758 8.37175 6.83074 8.37175 7.22127 7.98122L12.0109 3.19156L16.8006 7.98123C17.1911 8.37175 17.8243 8.37175 18.2148 7.98123C18.6054 7.5907 18.6054 6.95754 18.2148 6.56701L12.718 1.07024Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M0.856934 11.2224C0.856934 10.2756 1.62445 9.50809 2.57122 9.50809H21.4284C22.3751 9.50809 23.1426 10.2756 23.1426 11.2224V21.5081C23.1426 22.4549 22.3751 23.2224 21.4284 23.2224H2.57122C1.62445 23.2224 0.856934 22.4549 0.856934 21.5081V11.2224ZM2.85693 21.2224V11.5081H21.1426V21.2224H2.85693Z" fill="currentColor" />
    </IconBase>
  );
};

export default ShowTimeline;

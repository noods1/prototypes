import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type LocalProps = Omit<IconProps, 'children'>;

/**
 * LocalIcon
 * 
 * Converted from Human/Location/LocalIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Local: React.FC<LocalProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 20.2631L17.008 14.4737C19.283 11.8439 19.1414 7.90141 16.6839 5.44191C14.0968 2.8527 9.90308 2.8527 7.31602 5.44191C4.85856 7.90141 4.71694 11.8439 6.99188 14.4737L12 20.2631ZM18.0987 4.02829C14.7305 0.657237 9.26946 0.657237 5.90121 4.02829C2.70278 7.22939 2.51862 12.3597 5.47929 15.7822L10.8261 21.9632C11.4453 22.6789 12.5546 22.6789 13.1738 21.9632L18.5206 15.7822C21.4813 12.3597 21.2971 7.22939 18.0987 4.02829Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M11.9969 11.6007C12.9072 11.6007 13.648 10.8617 13.648 9.94654C13.648 9.03139 12.9072 8.29236 11.9969 8.29236C11.0866 8.29236 10.3458 9.03139 10.3458 9.94654C10.3458 10.8617 11.0866 11.6007 11.9969 11.6007ZM11.9969 13.6007C14.0134 13.6007 15.648 11.9647 15.648 9.94654C15.648 7.92839 14.0134 6.29236 11.9969 6.29236C9.98045 6.29236 8.34578 7.92839 8.34578 9.94654C8.34578 11.9647 9.98045 13.6007 11.9969 13.6007Z" fill="currentColor" />
    </IconBase>
  );
};

export default Local;

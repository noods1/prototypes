import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type PauseProps = Omit<IconProps, 'children'>;

/**
 * PauseIcon
 * 
 * Converted from Media/Actions/PauseIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Pause: React.FC<PauseProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2.25C6.6152 2.25 2.25 6.61522 2.25 12C2.25 17.3848 6.6152 21.75 12 21.75C17.3847 21.75 21.7499 17.3848 21.7499 12C21.7499 6.61523 17.3847 2.25 12 2.25ZM16.0546 8.62487C16.0546 7.79645 15.3831 7.12488 14.5546 7.12488C13.7262 7.12488 13.0546 7.79645 13.0546 8.62487V15.3749C13.0546 16.2033 13.7262 16.8749 14.5546 16.8749C15.3831 16.8749 16.0546 16.2033 16.0546 15.3749V8.62487ZM10.8074 8.62502C10.8074 7.7966 10.1358 7.12503 9.30737 7.12503C8.47894 7.12503 7.80737 7.7966 7.80737 8.62502V15.375C7.80737 16.2034 8.47894 16.875 9.30737 16.875C10.1358 16.875 10.8074 16.2034 10.8074 15.375V8.62502Z" fill="currentColor" fillOpacity="0.5" />
    </IconBase>
  );
};

export default Pause;

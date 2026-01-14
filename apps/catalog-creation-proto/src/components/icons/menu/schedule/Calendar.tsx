import React from 'react';
import { IconBase, IconProps } from '../../IconBase';

type CalendarProps = Omit<IconProps, 'children'>;

/**
 * CalendarIcon
 * 
 * Converted from Menu/Schedule/CalendarIcon.js
 * 
 * Available sizes: 8, 12, 14, 16, 24, 32, 48, 64
 */
const Calendar: React.FC<CalendarProps> = ({ size = '16', ...props }) => {
  return (
    <IconBase size={size} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M3.5 6.06143V20.0614H20.4999V6.06143H3.5ZM2.99999 4.06143C2.17157 4.06143 1.5 4.733 1.5 5.56143V20.5614C1.5 21.3899 2.17157 22.0614 2.99999 22.0614H20.9999C21.8283 22.0614 22.4999 21.3899 22.4999 20.5614V5.56143C22.4999 4.733 21.8283 4.06143 20.9999 4.06143H2.99999Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M7.49925 1.93848C8.05154 1.93846 8.49926 2.38617 8.49928 2.93845L8.49937 6.69697C8.49938 7.24925 8.05168 7.69698 7.4994 7.697C6.94711 7.69701 6.49939 7.2493 6.49937 6.69702L6.49928 2.9385C6.49927 2.38622 6.94697 1.93849 7.49925 1.93848Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M16.5028 1.9386C17.0551 1.93858 17.5028 2.38629 17.5028 2.93858L17.5029 6.69709C17.5029 7.24938 17.0552 7.6971 16.5029 7.69712C15.9506 7.69713 15.5029 7.24943 15.5029 6.69714L15.5028 2.93863C15.5028 2.38634 15.9505 1.93861 16.5028 1.9386Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M21.7523 11.0615H2.25244V9.06153H21.7523V11.0615Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M5.00235 13.769C5.00235 13.2168 5.45006 12.769 6.00235 12.769H12.0023C12.5546 12.769 13.0023 13.2168 13.0023 13.769C13.0023 14.3213 12.5546 14.769 12.0023 14.769H6.00235C5.45006 14.769 5.00235 14.3213 5.00235 13.769Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M5.00235 17.5356C5.00235 16.9834 5.45006 16.5356 6.00235 16.5356L16.5023 16.5356C17.0546 16.5356 17.5023 16.9834 17.5023 17.5356C17.5023 18.0879 17.0546 18.5356 16.5023 18.5356L6.00235 18.5356C5.45006 18.5356 5.00235 18.0879 5.00235 17.5356Z" fill="currentColor" />
    </IconBase>
  );
};

export default Calendar;

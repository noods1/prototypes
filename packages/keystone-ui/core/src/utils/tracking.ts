import { COMMON_TRACKING_EVENT_NAME, DURATION_TRACKING_EVENT_NAME } from '@src/plugins/plugin-tracking/constants';
import type { CommonEventParams, DurationEventParams } from '@src/plugins/plugin-tracking/types';

type CommonActionEventType =
  | 'link'
  | 'change'
  | 'click'
  | 'blur'
  | 'focus'
  | 'play'
  | 'next'
  | 'confirm'
  | 'scroll'
  | 'error'
  | 'cancel'
  | 'close';
// type FormActionEventType = 'submit' | 'reset';
type TableActionEventType = 'select' | 'drag';

type ActionEventType = CommonActionEventType | TableActionEventType;
type ExposeEventType = 'popup' | 'common' | 'visible' | 'hover' | 'error';
type DurationEventType = 'common' | 'popup';

const getTrackingEvent =
  <T extends CommonEventParams>(
    eventName: typeof COMMON_TRACKING_EVENT_NAME | typeof DURATION_TRACKING_EVENT_NAME,
    type: T['type'],
  ) =>
  <E extends HTMLElement>(el: E, params: Omit<T, 'type'>) => {
    el.dispatchEvent(
      new CustomEvent<T>(eventName, {
        detail: { type, ...params } as T,
      }),
    );
  };

/**
 * Send action type tracking event.
 *
 * @param el - HTMLElement instance
 * @param params - See {@link CommonEventParams}
 */
export const sendActionTracking = getTrackingEvent<CommonEventParams<ActionEventType>>(
  COMMON_TRACKING_EVENT_NAME,
  'action',
);
/**
 * Send expose type tracking event.
 *
 * @param el - HTMLElement instance
 * @param params - See {@link CommonEventParams}
 */
export const sendExposeTracking = getTrackingEvent<CommonEventParams<ExposeEventType>>(
  COMMON_TRACKING_EVENT_NAME,
  'expose',
);
/**
 * Send duration type tracking event.
 *
 * @param el - HTMLElement instance
 * @param params - See {@link DurationEventParams}
 */
export const sendDurationTracking = getTrackingEvent<DurationEventParams<DurationEventType>>(
  DURATION_TRACKING_EVENT_NAME,
  'duration',
);

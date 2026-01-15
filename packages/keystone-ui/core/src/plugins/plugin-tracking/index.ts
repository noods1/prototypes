import { merge } from 'lodash-es';
import { name, version } from '@src/../package.json';
import { COMMON_TRACKING_EVENT_NAME, DURATION_TRACKING_EVENT_NAME } from './constants';

import type { Plugin } from '@src/plugins';
import type { CommonEventParams, DurationEventParams, TrackingEventParams, TrackerConfig } from './types';

const BTM_ATTRIBUTE_NAME = 'data-btm';
const BTM_CONFIG_ATTRIBUTE_NAME = 'data-btm-config';

export const pluginTracking = (
  defaultConfig: TrackerConfig = {
    ignoreComponents: [],
    ignoreTrackingTypes: [],
  },
): Plugin => {
  let trackerConfig: TrackerConfig = {};
  let configProvider: HTMLKsConfigProviderElement;

  const durationTimerMap = new WeakMap<HTMLElement, Map<symbol, number>>();

  const report = (params: TrackingEventParams) => {
    if (
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      trackerConfig.ignoreTrackingTypes.includes(params.type) ||
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      trackerConfig.ignoreComponents.includes(params.componentName)
    )
      return;

    if (configProvider.tracker?.isInited) {
      configProvider.tracker?.componentLibEvent?.(params);
    }
  };

  const handleReportCommonTracking = (event: CustomEvent<CommonEventParams>) => {
    event.stopPropagation();

    const trackingParams = getCommonTrackingParams(event);

    report(trackingParams);
  };

  const handleReportDurationTracking = (event: CustomEvent<DurationEventParams>) => {
    event.stopPropagation();

    let timer = durationTimerMap.get(event.target as HTMLElement);
    if (timer === undefined) {
      durationTimerMap.set(event.target as HTMLElement, (timer = new Map()));
    }

    let duration = timer.get(getDurationTimerMapKey(event));
    // Reset indicates resetting the current timer without reporting.
    // Typically used on first call.
    if (event.detail.reset) {
      timer.set(getDurationTimerMapKey(event), (duration = performance.now()));
      return;
    }

    // If duration is invalid, it means resetting has never called in the component.
    // In this case, the duration would be inaccurate, so we avoid reporting incorrect tracking data.
    if (typeof duration !== 'number') return;

    const trackingParams = getCommonTrackingParams(event);
    trackingParams.duration = Math.round(performance.now() - duration);

    report(trackingParams);
  };

  return {
    name: 'tracking',
    lifecycle: ({ componentInstance, componentName, lifecycle }) => {
      if (componentName !== 'KsConfigProvider') return;

      if (lifecycle === 'init') {
        configProvider = componentInstance as HTMLKsConfigProviderElement;
        trackerConfig = merge(defaultConfig, configProvider.trackerConfig);
      }

      if (lifecycle === 'componentDidLoad') {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        configProvider.addEventListener(COMMON_TRACKING_EVENT_NAME, handleReportCommonTracking, true);
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        configProvider.addEventListener(DURATION_TRACKING_EVENT_NAME, handleReportDurationTracking, true);
      }

      if (lifecycle === 'disconnectedCallback') {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        configProvider.removeEventListener(COMMON_TRACKING_EVENT_NAME, handleReportCommonTracking, true);
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        configProvider.removeEventListener(DURATION_TRACKING_EVENT_NAME, handleReportDurationTracking, true);
      }
    },
  };
};

const getCommonTrackingParams = (event: CustomEvent<CommonEventParams>): TrackingEventParams => {
  const instance = event.target as HTMLElement;
  const instanceName = instance.constructor.name;
  const instanceBtmAttribute = instance.getAttribute(BTM_ATTRIBUTE_NAME);
  const instanceBtmConfigAttribute = instance.getAttribute(BTM_CONFIG_ATTRIBUTE_NAME);

  return {
    ...event.detail,
    target: instance,
    componentLibrary: name,
    libraryVersion: version,
    componentName: instanceName,
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    databtm: instanceBtmAttribute,
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    btmConfig: instanceBtmConfigAttribute,
  };
};

const getDurationTimerMapKey = ({ detail: { eventType, subEventType = '' } }: CustomEvent<DurationEventParams>) =>
  Symbol.for(subEventType === '' ? `ks:duration:${eventType}` : `ks:duration:${eventType}:${subEventType}`);

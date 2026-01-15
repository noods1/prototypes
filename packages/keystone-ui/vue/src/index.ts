import { isVue2, Vue2 } from 'vue-demi';
import '@fe-infra/keystone/dist/keystone/keystone.css';

export * from './components/modal';
export * from './components/toast';

export {
  ks,
  setGlobalConfig,
  TreeMap,
  type Entities,
  type Components,
  type JSX as ComponentProps,
} from '@fe-infra/keystone';

// @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
export async function createElement(vnode) {
  if (isVue2) {
    const element = document.createElement('div');
    const component = Vue2.extend(
      vnode.constructor.name === 'VNode'
        ? {
            render() {
              return vnode;
            },
          }
        : vnode,
    );
    return new component().$mount?.(element)?.$el;
  } else {
    // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error, @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const ele = await import('vue-demi').then(({ render }) => {
      const element = document.createElement('div');
      render(vnode, element);
      return element.children[0];
    });
    return ele;
  }
}

export { useFormItemContext, useFormListContext } from './hooks';
export { formItemMixin, formListMixin } from './mixins';

// TODO(nisitao): auto generate in the hydration layer
export { default as KsAlertBanner } from './components/KsGlobalAlert';
export { default as KsGlobalAlert } from './components/KsGlobalAlert';
export { default as KsAnchor } from './components/KsAnchor';
export { default as KsAssetTile } from './components/KsAssetTile';
export { default as KsAvatar } from './components/KsAvatar';
export { default as KsAvatarGroup } from './components/KsAvatarGroup';
export { default as KsBadge } from './components/KsBadge';
export { default as KsBreadcrumb } from './components/KsBreadcrumb';
export { default as KsBulletinTile } from './components/KsBulletinTile';
export { default as KsButton } from './components/KsButton';
export { default as KsButtonGroup } from './components/KsButtonGroup';
export { default as KsButtonGroupItem } from './components/KsButtonGroupItem';
export { default as KsCalendar } from './components/KsCalendar';
export { default as KsCard } from './components/KsCard';
export { default as KsCarousel } from './components/KsCarousel';
export { default as KsCarouselItem } from './components/KsCarouselItem';
export { default as KsCascader } from './components/KsCascader';
export { default as KsCascaderColumns } from './components/KsCascaderColumns';
export { default as KsCheckbox } from './components/KsCheckbox';
export { default as KsCheckboxGroup } from './components/KsCheckboxGroup';
export { default as KsChip } from './components/KsChip';
export { default as KsCollapseTransition } from './components/KsCollapseTransition';
export { default as KsConfigProvider } from './components/KsConfigProvider';
export { default as KsCrop } from './components/KsCrop';
export { default as KsDateComparisonPicker } from './components/KsDateComparisonPicker';
export { default as KsDatePicker } from './components/KsDatePicker';
export { default as KsDateRangePicker } from './components/KsDateRangePicker';
export { default as KsDateTimePanel } from './components/KsDateTimePanel';
export { default as KsDateTimePicker } from './components/KsDateTimePicker';
export { default as KsDateTimeRangePanel } from './components/KsDateTimeRangePanel';
export { default as KsDateTimeRangePicker } from './components/KsDateTimeRangePicker';
export { default as KsDivider } from './components/KsDivider';
export { default as KsDrawer } from './components/KsDrawer';
export { default as KsDropdownButton } from './components/KsDropdownButton';
export { default as KsDropdownMenu } from './components/KsDropdownMenu';
export { default as KsEmptyStates } from './components/KsEmptyStates';
export { default as KsFieldsPresenter } from './components/KsFieldsPresenter';
export { default as KsForm } from './components/KsForm';
export { default as KsFormItem } from './components/KsFormItem';
export { default as KsGuidance } from './components/KsGuidance';
export { default as KsInlineAlert } from './components/KsInlineAlert';
export { default as KsInput } from './components/KsInput';
export { default as KsInputNumber } from './components/KsInputNumber';
export { default as KsInputPassword } from './components/KsInputPassword';
export { default as KsInputSelector } from './components/KsInputSelector';
export { default as KsLink } from './components/KsLink';
export { default as KsMenuItem } from './components/KsMenuItem';
export { default as KsMenuItemGroup } from './components/KsMenuItemGroup';
export { default as KsModal } from './components/KsModal';
export { default as KsMonthPicker } from './components/KsMonthPicker';
export { default as KsMonthRangePanel } from './components/KsMonthRangePanel';
export { default as KsMonthRangePicker } from './components/KsMonthRangePicker';
export { default as KsMultipleAlertBanner } from './components/KsMultipleGlobalAlert';
export { default as KsMultipleGlobalAlert } from './components/KsMultipleGlobalAlert';
export { default as KsMultipleCascader } from './components/KsMultipleCascader';
export { default as KsMultipleDatePicker } from './components/KsMultipleDatePicker';
export { default as KsMultipleInput } from './components/KsMultipleInput';
export { default as KsMultipleMonthPicker } from './components/KsMultipleMonthPicker';
export { default as KsMultipleMonthRangePanel } from './components/KsMultipleMonthRangePanel';
export { default as KsMultipleQuarterPanel } from './components/KsMultipleQuarterPanel';
export { default as KsMultipleQuarterPicker } from './components/KsMultipleQuarterPicker';
export { default as KsMultipleWeekPicker } from './components/KsMultipleWeekPicker';
export { default as KsMultipleYearPicker } from './components/KsMultipleYearPicker';
export { default as KsNuxPopover } from './components/KsNuxPopover';
export { default as KsOverlay } from './components/KsOverlay';
export { default as KsPagination } from './components/KsPagination';
export { default as KsPopover } from './components/KsPopover';
export { default as KsProgress } from './components/KsProgress';
export { default as KsQuarterPanel } from './components/KsQuarterPanel';
export { default as KsQuarterPicker } from './components/KsQuarterPicker';
export { default as KsRadio } from './components/KsRadio';
export { default as KsRadioGroup } from './components/KsRadioGroup';
export { default as KsScrollbar } from './components/KsScrollbar';
export { default as KsSearch } from './components/KsSearch';
export { default as KsSegmentedGroup } from './components/KsSegmentedGroup';
export { default as KsSegmentedItem } from './components/KsSegmentedItem';
export { default as KsSideNavigation } from './components/KsSideNavigation';
export { default as KsSkeletonAvatar } from './components/KsSkeletonAvatar';
export { default as KsSkeletonButton } from './components/KsSkeletonButton';
export { default as KsSkeletonCard } from './components/KsSkeletonCard';
export { default as KsSkeletonText } from './components/KsSkeletonText';
export { default as KsSkeletonTile } from './components/KsSkeletonTile';
export { default as KsSlider } from './components/KsSlider';
export { default as KsSpace } from './components/KsSpace';
export { default as KsSpinner } from './components/KsSpinner';
export { default as KsStatusIcon } from './components/KsStatusIcon';
export { default as KsStatusIndicator } from './components/KsStatusIndicator';
export { default as KsStatusMessage } from './components/KsStatusMessage';
export { default as KsStepper } from './components/KsStepper';
export { default as KsStep } from './components/KsStep';
export { default as KsSubMenu } from './components/KsSubMenu';
export { default as KsSwitch } from './components/KsSwitch';
export { default as KsTable } from './components/KsTable';
export { default as KsTabs } from './components/KsTabs';
export { default as KsTabsItem } from './components/KsTabsItem';
export { default as KsTag } from './components/KsTag';
export { default as KsText } from './components/KsText';
export { default as KsTextField } from './components/KsTextField';
export { default as KsThumbnail } from './components/KsThumbnail';
export { default as KsTile } from './components/KsTile';
export { default as KsTileMetric } from './components/KsTileMetric';
export { default as KsTimeline } from './components/KsTimeline';
export { default as KsTimePicker } from './components/KsTimePicker';
export { default as KsToast } from './components/KsToast';
export { default as KsToastBox } from './components/KsToastBox';
export { default as KsTooltip } from './components/KsTooltip';
export { default as KsTransition } from './components/KsTransition';
export { default as KsTreeView } from './components/KsTreeView';
export { default as KsUpload } from './components/KsUpload';
export { default as KsUploadAvatar } from './components/KsUploadAvatar';
export { default as KsUploadDrop } from './components/KsUploadDrop';
export { default as KsWeekPicker } from './components/KsWeekPicker';
export { default as KsYearPicker } from './components/KsYearPicker';

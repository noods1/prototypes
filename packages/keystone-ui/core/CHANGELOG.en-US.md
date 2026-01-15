# @fe-infra/keystone

## [0.19.24] - 2026-01-14

### Added

- (KsTimePicker) Added `hasTimezone` prop (default: true) to control the visibility of the timezone indicator - ([19148ebe3](https://code.byted.org/ad/byted-web-components/commit/19148ebe3)).

### Changed

- (input) count font-size to labelSm - ([1fa31b5d8](https://code.byted.org/ad/byted-web-components/commit/1fa31b5d8)).

## [0.19.23] - 2026-01-13

### Changed

- Updated dependencies - ([fb01aa2c5](https://code.byted.org/ad/byted-web-components/commit/fb01aa2c5)).
  - @fe-infra/keystone-design-tokens@2.0.20

## [0.19.22] - 2026-01-12

### Changed

- Updated dependencies - ([41ddd4556](https://code.byted.org/ad/byted-web-components/commit/41ddd4556)).
  - @fe-infra/keystone-icons@0.7.2

### Fixed

- (tooltip) patched floating-ui leak issue - ([e5562b4a0](https://code.byted.org/ad/byted-web-components/commit/e5562b4a0)).
- (guidance) fixed icon leak issue - ([e5562b4a0](https://code.byted.org/ad/byted-web-components/commit/e5562b4a0)).

## [0.19.21] - 2025-12-31

### Changed

- (KsBreadcrumb) Expose `trigger` and `children[].id` API for more granular control of dropdown items in KsBreadcrumb - ([223aeeadb](https://code.byted.org/ad/byted-web-components/commit/223aeeadb)).

### Fixed

- (KsInlineAlert) Fix the inline alert style issue that the width is 2px larger than expected because of additional border-width - ([c4eb6935a](https://code.byted.org/ad/byted-web-components/commit/c4eb6935a)).

## [0.19.20] - 2025-12-24

## [0.19.19] - 2025-12-23

## [0.19.17] - 2025-12-17

### Fixed

- (KsProgress) Fix the color within KsProgress - ([42793952a](https://code.byted.org/ad/byted-web-components/commit/42793952a)).

## [0.19.16] - 2025-12-12

### Added

- (KsProgress) Added `color` prop to allow customizing the progress indicator color, which overrides the status-based color if provided - ([60669f71c](https://code.byted.org/ad/byted-web-components/commit/60669f71c)).

## [0.19.15] - 2025-12-12

### Changed

- Updated dependencies - ([6c8b32a7a](https://code.byted.org/ad/byted-web-components/commit/6c8b32a7a)).
  /change Updated dependencies - ([f43263938](https://code.byted.org/ad/byted-web-components/commit/f43263938)).
  - @fe-infra/keystone-icons@0.7.1

## [0.19.14] - 2025-12-05

### Changed

- Updated dependencies - ([92aed1d9f](https://code.byted.org/ad/byted-web-components/commit/92aed1d9f)).
  - @fe-infra/keystone-icons@0.7.0

### Fixed

- (KsPagination) fix the padding style of KsPagination to make it tidier - ([7815be2d1](https://code.byted.org/ad/byted-web-components/commit/7815be2d1)).

## [0.19.13] - 2025-12-03

### Fixed

- (KsSlider) Fixed tooltip body wrap to not capture pointer events by setting `pointer-events: none` on the `bodywrap` part - ([d9cb3bebe](https://code.byted.org/ad/byted-web-components/commit/d9cb3bebe)).

## [0.19.12] - 2025-12-03

### Changed

- Updated dependencies - ([2b9996b32](https://code.byted.org/ad/byted-web-components/commit/2b9996b32)).
  - @fe-infra/keystone-icons@0.6.13

## [0.19.11] - 2025-11-27

### Changed

- (KsText) Changed value of `hideOnAnchorExit` prop from false to true in KsTooltip - ([b2a79f3e9](https://code.byted.org/ad/byted-web-components/commit/b2a79f3e9)).

## [0.19.10] - 2025-11-27

### Changed

- (side navigation): change styles for design features - ([5da553245](https://code.byted.org/ad/byted-web-components/commit/5da553245)).

### Fixed

- : Fixed global store gc - ([7dd3074df](https://code.byted.org/ad/byted-web-components/commit/7dd3074df)).

## [0.19.9] - 2025-11-24

### Added

- (KsChip) Added `prefix` slot to support adding content before the chip label, with automatic spacing applied between the prefix content and label - ([0c94915e8](https://code.byted.org/ad/byted-web-components/commit/0c94915e8)).

### Fixed

- (KsUpload) Fixed merged file list not being updated when the max file count condition was not met - ([35a55ea0f](https://code.byted.org/ad/byted-web-components/commit/35a55ea0f)).

## [0.19.8] - 2025-11-24

### Fixed

- (KsForm): fixed form value sync when path change issue - ([774505c58](https://code.byted.org/ad/byted-web-components/commit/774505c58)).

## [0.19.7] - 2025-11-19

### Changed

- Updated dependencies - ([4183deb0a](https://code.byted.org/ad/byted-web-components/commit/4183deb0a)).
  /change Updated dependencies - ([4183deb0a](https://code.byted.org/ad/byted-web-components/commit/4183deb0a)).
  - @fe-infra/keystone-icons@0.6.12
  - @fe-infra/keystone-design-tokens@2.0.19

## [0.19.6] - 2025-11-17

### Changed

- Updated dependencies - ([a4f68753f](https://code.byted.org/ad/byted-web-components/commit/a4f68753f)).
  - @fe-infra/keystone-icons@0.6.11

## [0.19.5] - 2025-11-12

### Fixed

- (KsSelect): fixed the issue that the selected option may not exist in option list, trigger change will throw error - ([8271b124e](https://code.byted.org/ad/byted-web-components/commit/8271b124e)).
- (KsValueField): fixed the issue when enableInput is not true, the value field will still be wrapped bug - ([8271b124e](https://code.byted.org/ad/byted-web-components/commit/8271b124e)).
- (KsForm): fixed validation logics. When validation catch error is not from validator, should throw error directly - ([8271b124e](https://code.byted.org/ad/byted-web-components/commit/8271b124e)).

## [0.19.4] - 2025-11-06

### Added

- (KsProgress) Added `percentText` slot to allow customization of the percent text display - ([96dddc9d5](https://code.byted.org/ad/byted-web-components/commit/96dddc9d5)).
- (KsSlider) Added `tooltipVisible` prop to control whether the tooltip is disabled - ([96dddc9d5](https://code.byted.org/ad/byted-web-components/commit/96dddc9d5)).
- (KsSlider) Added `ksChangeComplete` event that emits when the slider's value change operation completes - ([96dddc9d5](https://code.byted.org/ad/byted-web-components/commit/96dddc9d5)).
- (KsSlider) Added auto-generated localized percent value as tooltip content when `tooltipContent` is not provided - ([96dddc9d5](https://code.byted.org/ad/byted-web-components/commit/96dddc9d5)).
- (KsUploadDrop) Added default slot to allow customization of the upload drag area content - ([96dddc9d5](https://code.byted.org/ad/byted-web-components/commit/96dddc9d5)).

### Changed

- (KsSlider) Changed default tooltip visibility behavior from always shown to hidden initially (tooltip now requires hover to display) - ([96dddc9d5](https://code.byted.org/ad/byted-web-components/commit/96dddc9d5)).
- (KsUploadDrop) Removed `isExceededMax` condition from the error state styling logic (error state now only applies when `isError` is true) - ([96dddc9d5](https://code.byted.org/ad/byted-web-components/commit/96dddc9d5)).

### Fixed

- (KsInlineAlert) Fixed the UI issue where the text and icon mis-aligned - ([d082b7ff2](https://code.byted.org/ad/byted-web-components/commit/d082b7ff2)).

## [0.19.3] - 2025-11-06

### Added

- (KsThumbnail): KsThumbnail supports `playing` state and `pause` event - ([e83db5e9d](https://code.byted.org/ad/byted-web-components/commit/e83db5e9d)).

### Fixed

- (KsLink): KsLink should use a thinner underline in `"sm"` size - ([e83db5e9d](https://code.byted.org/ad/byted-web-components/commit/e83db5e9d)).

## [0.19.2] - 2025-10-29

### Fixed

- (KsSwitch): disabled form binding - ([c8ca5f5cc](https://code.byted.org/ad/byted-web-components/commit/c8ca5f5cc)).

## [0.19.1] - 2025-10-27

## [0.19.0] - 2025-10-24

### Added

- (KsUpload, KsUploadDrag) Added `maxLength` prop to limit the maximum number of files that can be uploaded - ([4efd9bc69](https://code.byted.org/ad/byted-web-components/commit/4efd9bc69)).

### Changed

- (KsUpload) Enhanced error handling to properly manage file upload failures and exceeded maximum limit scenarios - ([4efd9bc69](https://code.byted.org/ad/byted-web-components/commit/4efd9bc69)).
- feat (KsSelect, KsInputSelector) Added field slot to KsSelect and KsInputSelector, allowing custom presentation of selected values - ([4f24b4f93](https://code.byted.org/ad/byted-web-components/commit/4f24b4f93)).
- Updated dependencies - ([cd4343037](https://code.byted.org/ad/byted-web-components/commit/cd4343037)).
  - @fe-infra/keystone-icons@0.6.9

### Fixed

- (KsUpload) Fixed upload list error message layout by removing fixed height constraint - ([4efd9bc69](https://code.byted.org/ad/byted-web-components/commit/4efd9bc69)).
- Add exports in package.json to improve Vitest compatibility - ([16386e374](https://code.byted.org/ad/byted-web-components/commit/16386e374)).
- (KsTooltip) Improved compatibility with popover polyfills to ensure the tooltip hides correctly in old browsers - ([df92619f9](https://code.byted.org/ad/byted-web-components/commit/df92619f9)).
- (KsFieldsPresenter) Fixed placeholder text color to use proper disabled state color instead of regular surface color - ([a7d425100](https://code.byted.org/ad/byted-web-components/commit/a7d425100)).

## [0.18.12] - 2025-10-22

### Added

- (KsTileMetric) Added `title` slot to allow for custom title content - ([543810b55](https://code.byted.org/ad/byted-web-components/commit/543810b55)).

### Changed

- (KsCarousel) **[BREAKING]** Changed the positioning of arrow pagination from absolute to static, it will now be displayed below the carousel content instead of overlapping it - ([1cc6b38b8](https://code.byted.org/ad/byted-web-components/commit/1cc6b38b8)).
- Support customizing field style of KsInput, KsSelect, KsDatePicker through ::part(field) - ([3578f9792](https://code.byted.org/ad/byted-web-components/commit/3578f9792)).

## [0.18.11] - 2025-10-17

### Changed

- (KsLink) Support line-wrap in KsLink when `<KsLink display="inline">` - ([999c993c4](https://code.byted.org/ad/byted-web-components/commit/999c993c4)).
- (KsDropdownMenu, KsPopover, KsTooltip) Changed default `elementContext` prop from 'reference' to 'floating'，the floating element is the one being checked for overflow，t you can also change the context to 'reference' to instead check its overflow relative to its clipping boundary - ([ea5e82a3e](https://code.byted.org/ad/byted-web-components/commit/ea5e82a3e)).
- (KsDatePicker) Optimize the performance of KsDatePicker by reducing unnecessary `disabledDate` calculations - ([801a2dd34](https://code.byted.org/ad/byted-web-components/commit/801a2dd34)).

## [0.18.10] - 2025-10-15

### Changed

- Updated dependencies - ([0b3c682fd](https://code.byted.org/ad/byted-web-components/commit/0b3c682fd)).
  - @fe-infra/keystone-icons@0.6.7

### Fixed

- (KsTreeView) Fixed alignment issue between selectable expanded nodes and non-selectable nodes - ([4fb93bb1b](https://code.byted.org/ad/byted-web-components/commit/4fb93bb1b)).

## [0.18.8] - 2025-10-10

### Added

- (KsTreeView) Added popover support for tree nodes through `renderOptions.popover` configuration - ([7a47a0b40](https://code.byted.org/ad/byted-web-components/commit/7a47a0b40)).
- (KsCascader) Added form integration with automatic value synchronization when used inside form items - ([8571bb6d7](https://code.byted.org/ad/byted-web-components/commit/8571bb6d7)).
- (KsMultipleCascader) Added form integration with automatic value synchronization when used inside form items - ([8571bb6d7](https://code.byted.org/ad/byted-web-components/commit/8571bb6d7)).
- (KsCheckboxGroup) Added form integration with automatic value synchronization when used inside form items - ([8571bb6d7](https://code.byted.org/ad/byted-web-components/commit/8571bb6d7)).
- (KsCheckbox) Added form integration with automatic value synchronization when used inside form items - ([8571bb6d7](https://code.byted.org/ad/byted-web-components/commit/8571bb6d7)).
- (KsDatePicker) Added form integration with automatic value synchronization when used inside form items - ([8571bb6d7](https://code.byted.org/ad/byted-web-components/commit/8571bb6d7)).
- (KsMonthRangePicker) Added form integration with automatic value synchronization when used inside form items - ([8571bb6d7](https://code.byted.org/ad/byted-web-components/commit/8571bb6d7)).
- (KsDateRangePicker) Added form integration with automatic value synchronization when used inside form items - ([8571bb6d7](https://code.byted.org/ad/byted-web-components/commit/8571bb6d7)).
- (KsFieldsPresenter) Added form integration with automatic value synchronization when used inside form items - ([8571bb6d7](https://code.byted.org/ad/byted-web-components/commit/8571bb6d7)).
- (KsFormItem) Refactored to use new form context system with improved validation and state management - ([8571bb6d7](https://code.byted.org/ad/byted-web-components/commit/8571bb6d7)).
- (KsFormList) Added new component for managing dynamic lists in forms with add, remove, and move operations - ([8571bb6d7](https://code.byted.org/ad/byted-web-components/commit/8571bb6d7)).
- (KsForm) Completely redesigned form system with new validation architecture and context-based state management - ([8571bb6d7](https://code.byted.org/ad/byted-web-components/commit/8571bb6d7)).
- (KsInputSelector) Added form integration with automatic value synchronization when used inside form items - ([8571bb6d7](https://code.byted.org/ad/byted-web-components/commit/8571bb6d7)).
- (KsInput) Added form integration with automatic value synchronization and blur event handling when used inside form items - ([8571bb6d7](https://code.byted.org/ad/byted-web-components/commit/8571bb6d7)).
- (KsMultipleInput) Added form integration with automatic value synchronization when used inside form items - ([8571bb6d7](https://code.byted.org/ad/byted-web-components/commit/8571bb6d7)).
- (KsRadioGroup) Added form integration with automatic value synchronization when used inside form items - ([8571bb6d7](https://code.byted.org/ad/byted-web-components/commit/8571bb6d7)).
- (KsRadio) Added form integration with automatic value synchronization when used inside form items - ([8571bb6d7](https://code.byted.org/ad/byted-web-components/commit/8571bb6d7)).
- (KsTimePicker) Added form integration with automatic value synchronization when used inside form items - ([8571bb6d7](https://code.byted.org/ad/byted-web-components/commit/8571bb6d7)).
- Added comprehensive form utility functions and context value reconciliation system - ([8571bb6d7](https://code.byted.org/ad/byted-web-components/commit/8571bb6d7)).
- Added React hooks for form context integration: `useFormItemContext`, `useFormListContext`, and `useWatch` - ([8571bb6d7](https://code.byted.org/ad/byted-web-components/commit/8571bb6d7)).

### Fixed

- (KsTable) The render rendering logic of the KsTable component has been fixed, ensuring that the render function is triggered normally when the columns changes - ([08e6beca4](https://code.byted.org/ad/byted-web-components/commit/08e6beca4)).

## [0.18.7] - 2025-10-08

### Added

- (KsIcon) Added `divide` and `qr-code` icons to iconography - ([f66fd51b6](https://code.byted.org/ad/byted-web-components/commit/f66fd51b6)).
- (KsDrawer) Added `expandable` prop to enable expandable functionality when `withSideNav` is true - ([b11a4943b](https://code.byted.org/ad/byted-web-components/commit/b11a4943b)).
- (KsDrawer) Added `ksExpandChange` event that emits when the drawer expand state changes - ([b11a4943b](https://code.byted.org/ad/byted-web-components/commit/b11a4943b)).
- (KsDrawer) Added `expand` method to programmatically control the drawer's expanded state - ([b11a4943b](https://code.byted.org/ad/byted-web-components/commit/b11a4943b)).

### Changed

- Updated dependencies - ([f66fd51b6](https://code.byted.org/ad/byted-web-components/commit/f66fd51b6)).
- (KsAvatar) Added `xs` size option to support extra small avatar variants - ([b11a4943b](https://code.byted.org/ad/byted-web-components/commit/b11a4943b)).
- (KsDrawer) Added smooth width transition animation when expanding/collapsing - ([b11a4943b](https://code.byted.org/ad/byted-web-components/commit/b11a4943b)).
- (KsDrawer) Restructured side navigation layout to support expand/collapse button positioning - ([b11a4943b](https://code.byted.org/ad/byted-web-components/commit/b11a4943b)).
- (KsText) Updated default text decoration thickness from 4% to 6% for better visual emphasis on definition text - ([8b25cfee7](https://code.byted.org/ad/byted-web-components/commit/8b25cfee7)).
- (KsCard) Update the border radius of card to match the design specification - ([3b040e338](https://code.byted.org/ad/byted-web-components/commit/3b040e338)).
  - @fe-infra/keystone-icons@0.6.5

### Fixed

- (KsGuidance) Fixed runtime error when `guidanceContent` is undefined - ([f66fd51b6](https://code.byted.org/ad/byted-web-components/commit/f66fd51b6)).

## [0.18.5] - 2025-10-07

### Added

- (KsStatusIcon) Added `disapproval` and `limitedApproval` variants to support additional status states - ([5bc6e43a5](https://code.byted.org/ad/byted-web-components/commit/5bc6e43a5)).

### Changed

- Updated dependencies - ([5bc6e43a5](https://code.byted.org/ad/byted-web-components/commit/5bc6e43a5)).
  - @fe-infra/keystone-icons@0.6.4

### Fixed

- (KsInlineAlert) Fixed content alignment to properly center items vertically within the alert container - ([aaea5288e](https://code.byted.org/ad/byted-web-components/commit/aaea5288e)).
- (KsInlineAlert) Fixed potential runtime error when `items` prop is not properly defined - ([aaea5288e](https://code.byted.org/ad/byted-web-components/commit/aaea5288e)).

## [0.18.4] - 2025-09-29

### Fixed

- (KsTable) The render rendering logic of the KsTable component has been fixed, ensuring that the render function is triggered normally when the datasource changes - ([4db3229ec](https://code.byted.org/ad/byted-web-components/commit/4db3229ec)).

## [0.18.3] - 2025-09-26 [YANKED]

### Changed

- (KsText) Improve tooltip width of the `definition` to better fit the content - ([4e7f43395](https://code.byted.org/ad/byted-web-components/commit/4e7f43395)).
- (KsTooltip) When `autoShift` is enabled, tooltip will keep a small margin when it is close to the screen edge for better visual effect - ([4e7f43395](https://code.byted.org/ad/byted-web-components/commit/4e7f43395)).
- (KsTable) Enhanced grouped cell rendering to support dynamic slot-based custom content in group headers - ([9f2dd0792](https://code.byted.org/ad/byted-web-components/commit/9f2dd0792)).

## [0.18.2] - 2025-09-25 [YANKED]

### Added

- (KsSimpleTable) Added new simple table component as prerelease version of redesigned table with TanStack Table integration - ([37bb60096](https://code.byted.org/ad/byted-web-components/commit/37bb60096)).

## [0.18.1] - 2025-09-24 [YANKED]

### Changed

- (KsText) Improve tooltip width of the `definition` to better fit the content - ([12c12548b](https://code.byted.org/ad/byted-web-components/commit/12c12548b)).
- (KsTooltip) When `autoShift` is enabled, tooltip will keep a small margin when it is close to the screen edge for better visual effect - ([12c12548b](https://code.byted.org/ad/byted-web-components/commit/12c12548b)).

## [0.18.0] - 2025-09-24 [YANKED]

### Added

- (KsTreeView) Added support for custom node content through dynamic slots when `label` is not a string - ([253a330a6](https://code.byted.org/ad/byted-web-components/commit/253a330a6)).

### Changed

- Updated dependencies - ([3fc4ca200](https://code.byted.org/ad/byted-web-components/commit/3fc4ca200)).
  - @fe-infra/keystone-icons@0.6.2

### Fixed

- (KsGlobalAlert) **[BREAKING]** Rename previous `KsAlertBanner` to `KsGlobalAlert`, deprecated its vertical variant and related APIs. Also renamed `KsMultipleAlertBanner` to `KsMultipleGlobalAlert` - ([66ae1fa18](https://code.byted.org/ad/byted-web-components/commit/66ae1fa18)).
- (KsTextField) Fixed text field color issue when disabled, status is warning or error - ([8d9dd707a](https://code.byted.org/ad/byted-web-components/commit/8d9dd707a)).

## [0.17.17] - 2025-09-19

### Fixed

- (KsTooltip) Fixed watcher target from `innerVisible` to `innerVisibleByAnchor` for proper visibility state management - ([4a5f20237](https://code.byted.org/ad/byted-web-components/commit/4a5f20237)).
- (KsTooltip) Fixed display style logic to only apply when `deprecatedDisableTopLayer` is enabled - ([4a5f20237](https://code.byted.org/ad/byted-web-components/commit/4a5f20237)).

## [0.17.16] - 2025-09-19 [YANKED]

### Added

- (KsTimePicker) Add min-width, to prevent content overflow in insufficient space - ([f3870a921](https://code.byted.org/ad/byted-web-components/commit/f3870a921)).
- (KsInput) Added `autoFocus` prop to automatically focus the input field when the page loads - ([98352f9e1](https://code.byted.org/ad/byted-web-components/commit/98352f9e1)).
- (KsInput) Added `readOnly` prop to make the input field read-only when true - ([98352f9e1](https://code.byted.org/ad/byted-web-components/commit/98352f9e1)).
- (KsInput) Added `autoComplete` prop to control browser autocomplete behavior - ([98352f9e1](https://code.byted.org/ad/byted-web-components/commit/98352f9e1)).
- (KsInput) Added `ksClick` event that triggers when the input field is clicked (does not emit when disabled) - ([98352f9e1](https://code.byted.org/ad/byted-web-components/commit/98352f9e1)).
- (KsInput) Added `ksKeydownEnter` event that triggers when the Enter key is pressed in the input field - ([98352f9e1](https://code.byted.org/ad/byted-web-components/commit/98352f9e1)).
- (KsTextField) Added `autoFocus` prop to automatically focus the textarea when the page loads - ([98352f9e1](https://code.byted.org/ad/byted-web-components/commit/98352f9e1)).
- (KsTextField) Added `readOnly` prop to make the textarea read-only when true - ([98352f9e1](https://code.byted.org/ad/byted-web-components/commit/98352f9e1)).
- (KsTextField) Added `autoComplete` prop to control browser autocomplete behavior - ([98352f9e1](https://code.byted.org/ad/byted-web-components/commit/98352f9e1)).
- (KsTextField) Added `ksClick` event that triggers when the textarea is clicked - ([98352f9e1](https://code.byted.org/ad/byted-web-components/commit/98352f9e1)).
- (KsTextField) Added `ksKeydownEnter` event that triggers when the Enter key is pressed in the textarea - ([98352f9e1](https://code.byted.org/ad/byted-web-components/commit/98352f9e1)).
- (KsTextField) Added `height` prop to customize textarea height with string, number, or object with min/max values - ([98352f9e1](https://code.byted.org/ad/byted-web-components/commit/98352f9e1)).
- (KsTextField) Added automatic height adjustment based on content and configuration - ([98352f9e1](https://code.byted.org/ad/byted-web-components/commit/98352f9e1)).
- (KsNuxPopover) Added `hideOnAnchorExit` prop to control popover visibility when reference element is hidden - ([c5e82675b](https://code.byted.org/ad/byted-web-components/commit/c5e82675b)).
- (KsPopover) Added `hideOnAnchorExit` prop to control popover visibility when reference element is hidden - ([c5e82675b](https://code.byted.org/ad/byted-web-components/commit/c5e82675b)).
- (KsTooltip) Added `hideOnAnchorExit` prop to control tooltip visibility when reference element is hidden - ([c5e82675b](https://code.byted.org/ad/byted-web-components/commit/c5e82675b)).

### Changed

- (KsCascader) Reorganized slot arrangement by wrapping `suffix` and `show-icon` slots in a dedicated suffix container for improved layout consistency - ([f3870a921](https://code.byted.org/ad/byted-web-components/commit/f3870a921)).
- (KsModal) Updated type definitions for `beforeOpen`, `beforeClose`, `confirmCallback`, and `cancelCallback` props to support void return types - ([c5e82675b](https://code.byted.org/ad/byted-web-components/commit/c5e82675b)).
- (Core) Improve compatibility for legacy iPadOS Safari 16.4 - ([f10bf6c83](https://code.byted.org/ad/byted-web-components/commit/f10bf6c83)).
- Updated dependencies - ([f10bf6c83](https://code.byted.org/ad/byted-web-components/commit/f10bf6c83)).
  - @fe-infra/keystone-design-tokens@2.0.18
  - @fe-infra/keystone-icons@0.6.1

### Fixed

- (KsMonthPicker) Fixed date parsing to prevent timezone offset issues when using non-ISO string values - ([f3870a921](https://code.byted.org/ad/byted-web-components/commit/f3870a921)).
- (KsTimePicker) Fixed panel value display animation to ensure proper display when changing values - ([f3870a921](https://code.byted.org/ad/byted-web-components/commit/f3870a921)).
- (KsNuxPopover) Fixed body interaction blocking to only apply when `preventInteraction` prop is enabled - ([f3870a921](https://code.byted.org/ad/byted-web-components/commit/f3870a921)).
- (KsDateRangePicker, KsDateTimeRangePicker) Fixed clear functionality to properly emit both `onKsClear` and `onKsChange` events with empty values - ([e488afc27](https://code.byted.org/ad/byted-web-components/commit/e488afc27)).
- (KsButton) Fixed slot content visibility issue when `shape` is set to "square" and `loading` is true - now properly hides the default slot content to prevent layout conflicts - ([4013ffccd](https://code.byted.org/ad/byted-web-components/commit/4013ffccd)).

## [0.17.15] - 2025-09-17

### Added

- (KsButtonGroup) Added `htmlName` prop for form integration support - ([1b553bf37](https://code.byted.org/ad/byted-web-components/commit/1b553bf37)).
- (KsButtonGroup) Added `multiple` prop to replace deprecated `isMultiple` prop - ([1b553bf37](https://code.byted.org/ad/byted-web-components/commit/1b553bf37)).
- (KsButtonGroupItem) Added `hideCheckmark` prop to control checkmark visibility in multiple selection mode - ([1b553bf37](https://code.byted.org/ad/byted-web-components/commit/1b553bf37)).
- (KsBreadcrumb) Added `size` prop to control breadcrumb text size with 'md' and 'lg' options - ([1d7f5687a](https://code.byted.org/ad/byted-web-components/commit/1d7f5687a)).

### Changed

- (KsButton) Added default slot to loading state to support descriptive text in loading state - ([93a986351](https://code.byted.org/ad/byted-web-components/commit/93a986351)).
- (KsPopover) Updated popover styling with enhanced visual design including shadow, background color, and border radius - ([cdbc3e396](https://code.byted.org/ad/byted-web-components/commit/cdbc3e396)).
- (KsInput) Refactored internal state management to use uncontrollable pattern for better controlled/uncontrolled component behavior - ([61670dcc7](https://code.byted.org/ad/byted-web-components/commit/61670dcc7)).
- (KsInput) Improved performance by replacing lifecycle methods with more efficient state watchers - ([61670dcc7](https://code.byted.org/ad/byted-web-components/commit/61670dcc7)).

### Fixed

- (KsButton) Fixed incorrect display colors for some Button variants - ([93a986351](https://code.byted.org/ad/byted-web-components/commit/93a986351)).
- (KsInput) Fixed cursor position restoration after value changes in controlled mode - ([61670dcc7](https://code.byted.org/ad/byted-web-components/commit/61670dcc7)).
- (KsTreeView) Fixed tree node state synchronization when `checkedKeys` prop changes - ([de5ba7d7b](https://code.byted.org/ad/byted-web-components/commit/de5ba7d7b)).

## [0.17.14] - 2025-09-12

### Added

- (KsTable) Added `tableLayout` prop to control table layout behavior with options 'auto' and 'fixed', defaults to 'fixed' - ([190efceb8](https://code.byted.org/ad/byted-web-components/commit/190efceb8)).
- (KsTable) Added support for `minWidth` and `maxWidth` properties in column configuration for flexible column sizing - ([190efceb8](https://code.byted.org/ad/byted-web-components/commit/190efceb8)).

### Changed

- (KsTable) Updated fixed column validation to also check for `minWidth` when `width` is not specified - ([190efceb8](https://code.byted.org/ad/byted-web-components/commit/190efceb8)).

## [0.17.13] - 2025-09-09

### Fixed

- (KsInputNumber) revert input number control mode fix, Fixed input value synchronization behavior to ensure proper value updates during user interaction - ([82fbad7ee](https://code.byted.org/ad/byted-web-components/commit/82fbad7ee)).

## [0.17.11] - 2025-09-05

### Changed

- (KsInputSelector) Changed default host element width from inline-block auto-sizing to 100% width - ([db5a0ea15](https://code.byted.org/ad/byted-web-components/commit/db5a0ea15)).
- (KsInputSelector) **[BREAKING]** Removed default value 'auto' for `width` prop, now requires explicit width specification - ([db5a0ea15](https://code.byted.org/ad/byted-web-components/commit/db5a0ea15)).

### Fixed

- (KsButtonGroup) Fixed `disabled` prop type definition to be explicitly typed as boolean - ([7ce92fb0c](https://code.byted.org/ad/byted-web-components/commit/7ce92fb0c)).
- (KsButtonGroup) Fixed initialization logic to handle undefined `defaultValue` by defaulting to empty array - ([7ce92fb0c](https://code.byted.org/ad/byted-web-components/commit/7ce92fb0c)).
- (KsCrop) Fixed crop area boundary calculation to prevent cropping area from extending outside container bounds during resize operations - ([84685f550](https://code.byted.org/ad/byted-web-components/commit/84685f550)).

## [0.17.10] - 2025-09-05

### Added

- (KsBreadcrumb) Added `BreadcrumbDropdownItem` support to allow dropdown menu items within breadcrumb navigation - ([373124e7e](https://code.byted.org/ad/byted-web-components/commit/373124e7e)).
- (KsBreadcrumb) Added `ksClickDropdownItem` event that emits when a dropdown item is clicked, providing the selected item's value - ([373124e7e](https://code.byted.org/ad/byted-web-components/commit/373124e7e)).
- (KsPagination) Added `dropdown` size option to display pagination as a dropdown selector with prev/next buttons - ([c9fce15ca](https://code.byted.org/ad/byted-web-components/commit/c9fce15ca)).

### Changed

- (KsCheckbox) Updated checked state styling to use semantic color tokens with proper hover and active states - ([4cded2caa](https://code.byted.org/ad/byted-web-components/commit/4cded2caa)).
- (KsSwitch) Updated handle color to use semantic neutral color token for better theme consistency - ([4cded2caa](https://code.byted.org/ad/byted-web-components/commit/4cded2caa)).
- (KsInput) Improved cursor position restoration performance by replacing setTimeout with requestAnimationFrame - ([da94e6970](https://code.byted.org/ad/byted-web-components/commit/da94e6970)).

### Fixed

- (KsInputNumber) Fixed controlled component behavior to prevent internal state updates when `value` prop is provided - ([da94e6970](https://code.byted.org/ad/byted-web-components/commit/da94e6970)).

## [0.17.9] - 2025-08-29

### Added

- (KsCrop) Added `circle` prop to enable circular crop area highlighting - ([a888d92e2](https://code.byted.org/ad/byted-web-components/commit/a888d92e2)).
- Added new icons: `blocked-video`, `invalid-conversion`, `lipsync`, `pending-conversion`, `placeholder`, `private-video`, `unapproved-conversion`, and `voice-speed` - ([a888d92e2](https://code.byted.org/ad/byted-web-components/commit/a888d92e2)).
- (KsCheckbox) Added `status` prop to support error states and visual feedback - ([a888d92e2](https://code.byted.org/ad/byted-web-components/commit/a888d92e2)).
- (KsRadio) Added `status` prop to support error states and visual feedback - ([a888d92e2](https://code.byted.org/ad/byted-web-components/commit/a888d92e2)).

### Changed

- (KsCrop) **[BREAKING]** Changed `CropRect` interface to make `x` and `y` properties optional - ([a888d92e2](https://code.byted.org/ad/byted-web-components/commit/a888d92e2)).
- (KsCrop) Modified crop area positioning to auto-center when `x` or `y` coordinates are not provided - ([a888d92e2](https://code.byted.org/ad/byted-web-components/commit/a888d92e2)).
- Updated `help` icon with improved design and positioning - ([a888d92e2](https://code.byted.org/ad/byted-web-components/commit/a888d92e2)).
- (KsText) Added pointer cursor for text elements with definitions to improve user experience - ([a888d92e2](https://code.byted.org/ad/byted-web-components/commit/a888d92e2)).
- (KsSwitch) Updated handle background color for better visual contrast - ([a888d92e2](https://code.byted.org/ad/byted-web-components/commit/a888d92e2)).

### Fixed

- (KsTooltip) Fixed arrow positioning to properly handle screen overflow and improve visual alignment - ([a888d92e2](https://code.byted.org/ad/byted-web-components/commit/a888d92e2)).
- (KsUpload) Fixed the bug where the fileList update did not take effect - ([a888d92e2](https://code.byted.org/ad/byted-web-components/commit/a888d92e2)).
- (KsCascader) Fixed potential null reference error in datasource watcher - ([a888d92e2](https://code.byted.org/ad/byted-web-components/commit/a888d92e2)).

## [0.17.8] - 2025-08-27

### Changed

- (KsText) Added pointer cursor for text elements with definitions to improve user experience - ([48ad6574b](https://code.byted.org/ad/byted-web-components/commit/48ad6574b)).
- Updated dependencies - ([48ad6574b](https://code.byted.org/ad/byted-web-components/commit/48ad6574b)).
  /change Updated dependencies - ([48ad6574b](https://code.byted.org/ad/byted-web-components/commit/48ad6574b)).
  - @fe-infra/keystone-icons@0.6.0

### Fixed

- (KsTooltip) Fixed arrow positioning to properly handle screen overflow and improve visual alignment - ([48ad6574b](https://code.byted.org/ad/byted-web-components/commit/48ad6574b)).
- (KsUpload) Fixed the bug where the fileList update did not take effect - ([48ad6574b](https://code.byted.org/ad/byted-web-components/commit/48ad6574b)).

## [0.17.7] - 2025-08-22

### Added

- (KsCrop) Added `sizeMode` prop to control how image size is limited by container (height or width), defaults to 'width' - ([2b19f7fee](https://code.byted.org/ad/byted-web-components/commit/2b19f7fee)).
- (KsCrop) Added `fixedRect` prop to disable crop rectangle resizing when set to true - ([2b19f7fee](https://code.byted.org/ad/byted-web-components/commit/2b19f7fee)).
- (KsDropdownMenu) Added `listHeader` slot for custom list header content within the dropdown panel - ([75c92a4ee](https://code.byted.org/ad/byted-web-components/commit/75c92a4ee)).
- (KsInputSelector) Added `header` slot for custom header content within the dropdown panel - ([75c92a4ee](https://code.byted.org/ad/byted-web-components/commit/75c92a4ee)).
- (KsInputSelector) Added `listHeader` slot for custom list header content within the dropdown panel - ([75c92a4ee](https://code.byted.org/ad/byted-web-components/commit/75c92a4ee)).
- (KsTable) Added `rowClassName` prop to apply custom CSS classes to all table rows - ([d66394502](https://code.byted.org/ad/byted-web-components/commit/d66394502)).

### Changed

- (KsCrop) Updated layout to use flexbox for better image centering and alignment - ([2b19f7fee](https://code.byted.org/ad/byted-web-components/commit/2b19f7fee)).
- (KsCrop) Modified `imageQuality` default value from 0.92 to 0.9 - ([2b19f7fee](https://code.byted.org/ad/byted-web-components/commit/2b19f7fee)).
- (KsTreeView) **[BREAKING]** Changed the behavior of KsTreeView to include all selected values in the result, whereas previously child selections were filtered out when parent nodes were selected - ([c06c65ae6](https://code.byted.org/ad/byted-web-components/commit/c06c65ae6)).
- Visual improvements for `filled-chevron-down`, `filled-chevron-up`, `filled-chevron-left` and `filled-chevron-right` - ([83a4a5c2e](https://code.byted.org/ad/byted-web-components/commit/83a4a5c2e)).
- Updated dependencies - ([83a4a5c2e](https://code.byted.org/ad/byted-web-components/commit/83a4a5c2e)).
  - @fe-infra/keystone-icons@0.5.3

### Fixed

- (KsTreeView) Fixed the issue where disabled items unexpectedly followed parental selection changes - ([c06c65ae6](https://code.byted.org/ad/byted-web-components/commit/c06c65ae6)).
- (KsThumbnail) Fixed rendering issues when used in Vue applications - ([684512efc](https://code.byted.org/ad/byted-web-components/commit/684512efc)).

## [0.17.6] - 2025-08-20

### Added

- (KsCheckbox) Added `forceIgnoreGroup` prop to allow KsCheckbox to operate independently even when nested within a KsCheckboxGroup - ([721e951a7](https://code.byted.org/ad/byted-web-components/commit/721e951a7)).

## [0.17.5] - 2025-08-20

### Added

- (KsText) Added `definition` prop to style text as a definition term with dotted underline and tooltip support - ([84669c384](https://code.byted.org/ad/byted-web-components/commit/84669c384)).
- (KsText) Added `definition` slot to provide custom content for the definition tooltip - ([84669c384](https://code.byted.org/ad/byted-web-components/commit/84669c384)).
- (KsStatusIcon) Added support for `inProgress` status variant - ([65a556a86](https://code.byted.org/ad/byted-web-components/commit/65a556a86)).
- (KsTile) Added primary color border for none selection tile - ([8941ff522](https://code.byted.org/ad/byted-web-components/commit/8941ff522)).
- (KsAssetTile) Added progress ring for 1:1 ratio - ([8941ff522](https://code.byted.org/ad/byted-web-components/commit/8941ff522)).
- (KsTable) Added `grouping` prop to support grouping table rows by specified columns - ([14890f83a](https://code.byted.org/ad/byted-web-components/commit/14890f83a)).
- (KsTable) Added `enableHiding` property to column configuration for conditionally hiding columns - ([14890f83a](https://code.byted.org/ad/byted-web-components/commit/14890f83a)).
- (KsTable) Added `renderGroupedCell` property to column configuration for custom rendering of grouped cells - ([14890f83a](https://code.byted.org/ad/byted-web-components/commit/14890f83a)).

### Changed

- Updated dependencies - ([65a556a86](https://code.byted.org/ad/byted-web-components/commit/65a556a86)).
  - @fe-infra/keystone-icons@0.5.2

### Removed

- (KsAssetTile) Removed progress bar from 1:1 ratio - ([8941ff522](https://code.byted.org/ad/byted-web-components/commit/8941ff522)).

### Fixed

- (KsCascader) Fixed virtual scrolling item height calculation to properly account for gap spacing between items - ([7e0bc77dd](https://code.byted.org/ad/byted-web-components/commit/7e0bc77dd)).

## [0.17.4] - 2025-08-13

### Added

- (KsDropdownMenu) Added support for custom title rendering in group items through `renderTitle` function property - ([2f30a0789](https://code.byted.org/ad/byted-web-components/commit/2f30a0789)).

### Changed

- (KsProgress) Changed medium size label typography from 'bodyLg' to 'bodyMd' for better visual consistency - ([89c5fb59a](https://code.byted.org/ad/byted-web-components/commit/89c5fb59a)).
- (KsInputSelector) Enhanced group item rendering to properly support custom group titles through `renderTitle` function - ([f8136c1cf](https://code.byted.org/ad/byted-web-components/commit/f8136c1cf)).

### Removed

- (KsProgress) Removed redundant font-variant-numeric styling from small size labels - ([89c5fb59a](https://code.byted.org/ad/byted-web-components/commit/89c5fb59a)).

### Fixed

- (KsTreeView) Fixed the issue that click event won't get triggered on mouse-clicking on sections other than checkbox - ([0b90e74dc](https://code.byted.org/ad/byted-web-components/commit/0b90e74dc)).
- (KsCascader) Fixed runtime error when `selectedFullValue` is undefined by adding proper type checking - ([a8dd8ea88](https://code.byted.org/ad/byted-web-components/commit/a8dd8ea88)).
- (KsDropdownMenu) Fixed controlled mode for tabs by properly synchronizing `activeTabId` prop changes - ([d1dc5d4ef](https://code.byted.org/ad/byted-web-components/commit/d1dc5d4ef)).
- (KsDropdownMenu) Fixed overlay width calculation to properly match the trigger element width - ([420e863a3](https://code.byted.org/ad/byted-web-components/commit/420e863a3)).
- (KsStep) Fixed step index calculation to properly handle dynamic updates and prevent missing label content for newly added steps - ([e7f4ffb41](https://code.byted.org/ad/byted-web-components/commit/e7f4ffb41)).

## [0.17.3] - 2025-07-30

### Fixed

- (KsCheckbox) Fixed click event handling on description slot to prevent unintended behavior - ([b289eb277](https://code.byted.org/ad/byted-web-components/commit/b289eb277)).
- (KsInputSelector) Fixed `defaultValue` not being applied when `dataSource` changes and `value` is undefined - ([9c5a0a192](https://code.byted.org/ad/byted-web-components/commit/9c5a0a192)).

## [0.17.2] - 2025-07-28

### Added

- (KsTextField) Added form context integration to automatically inherit disabled state and validation status from parent form items - ([8ed9f0b5f](https://code.byted.org/ad/byted-web-components/commit/8ed9f0b5f)).

### Changed

- (KsForm) Modified validation behavior to only validate on 'change' and 'blur' triggers instead of all triggers - ([8ed9f0b5f](https://code.byted.org/ad/byted-web-components/commit/8ed9f0b5f)).
- (KsTextField) Changed `ksBlur` event bubbling from false to true for better form integration - ([8ed9f0b5f](https://code.byted.org/ad/byted-web-components/commit/8ed9f0b5f)).
- (FormItemContext) Updated rule trigger type definition to support both single trigger and array of triggers - ([8ed9f0b5f](https://code.byted.org/ad/byted-web-components/commit/8ed9f0b5f)).

### Fixed

- (KsTextField) Fixed placeholder text color to use proper surface color instead of disabled color - ([8ed9f0b5f](https://code.byted.org/ad/byted-web-components/commit/8ed9f0b5f)).
- (ContextConsumer) Fixed memory leak by properly managing consumer instances with WeakMap instead of shared variable - ([8ed9f0b5f](https://code.byted.org/ad/byted-web-components/commit/8ed9f0b5f)).
- (ContextProvider) Fixed provider initialization and cleanup to prevent memory leaks and properly handle disconnection - ([8ed9f0b5f](https://code.byted.org/ad/byted-web-components/commit/8ed9f0b5f)).

## [0.17.0] - 2025-07-25

### Added

- Added logic to automatically set the default locale from the `lang_type` cookie, the common GMPT practice. This largely eliminates the need for manual multilingual configuration - ([6e5d65ad9](https://code.byted.org/ad/byted-web-components/commit/6e5d65ad9)).
- (KsMultipleInput) Added `ksBlur` event that triggers when the input field loses focus - ([bee641caa](https://code.byted.org/ad/byted-web-components/commit/bee641caa)).
- (KsCheckbox) Added `suffix` slot to support additional content after the checkbox label - ([eef8d9bba](https://code.byted.org/ad/byted-web-components/commit/eef8d9bba)).
- (KsRadio) Added `suffix` slot to support additional content after the radio button label - ([eef8d9bba](https://code.byted.org/ad/byted-web-components/commit/eef8d9bba)).
- (KsTable) Added `onKsRowClick` event that triggers when a table row is clicked, providing the complete row data object - ([21229b21e](https://code.byted.org/ad/byted-web-components/commit/21229b21e)).

### Changed

- Refactored localization system to use built-in locale files with less than 16KB in size and tree-shaking support - ([6e5d65ad9](https://code.byted.org/ad/byted-web-components/commit/6e5d65ad9)).
- Changed locale configuration to accept locale codes (e.g., 'en', 'zh') instead of the original complicated locale config objects - ([6e5d65ad9](https://code.byted.org/ad/byted-web-components/commit/6e5d65ad9)).
- Updated dependencies - ([6e5d65ad9](https://code.byted.org/ad/byted-web-components/commit/6e5d65ad9)).
- (KsCheckbox) Updated small size variant dimensions to 16x16px for better visual consistency - ([eef8d9bba](https://code.byted.org/ad/byted-web-components/commit/eef8d9bba)).
- (KsTreeView) Enhanced `ksCheck` event to emit detailed parameters including checked state, affected node, checked keys, checked nodes, and half-checked keys instead of just an array of keys - ([96c9cd08e](https://code.byted.org/ad/byted-web-components/commit/96c9cd08e)).
- (KsTreeView) Enhanced `ksToggleExpand` event to emit detailed parameters including expanded state, affected node, and expanded keys instead of just an array of keys - ([96c9cd08e](https://code.byted.org/ad/byted-web-components/commit/96c9cd08e)).
- (KsBasePicker) Removed status icon display inside input box - they will be displayed in the FormItem message instead - ([d7259e7b5](https://code.byted.org/ad/byted-web-components/commit/d7259e7b5)).
  - @fe-infra/keystone-locales@0.5.0

### Fixed

- (KsCalendar) Fixed minor spacing layout and active date color scheme issues - ([d7259e7b5](https://code.byted.org/ad/byted-web-components/commit/d7259e7b5)).
- (KsGuidance) Improved close button alignment for horizontal and vertical layouts - ([d7259e7b5](https://code.byted.org/ad/byted-web-components/commit/d7259e7b5)).
- (KsScrollbar) Changed overflow behavior from 'scroll' to 'auto' to only enable scrollbars when content overflows - ([d7259e7b5](https://code.byted.org/ad/byted-web-components/commit/d7259e7b5)).
- (KsFormItem) Fixed blur validation to only trigger when `validateTrigger` is set to 'blur' - ([9a0830e38](https://code.byted.org/ad/byted-web-components/commit/9a0830e38)).

## [0.16.2] - 2025-07-23

### Fixed

- (Cascader) fixed cascader component styles issues - ([499b4b500](https://code.byted.org/ad/byted-web-components/commit/499b4b500)).

## [0.16.1] - 2025-07-21

### Changed

- (KsDateTimeRangePicker) Enhanced `disabled` prop to support individual control for start and end inputs in range mode - accepts boolean or `[boolean, boolean]` array - ([29a051d02](https://code.byted.org/ad/byted-web-components/commit/29a051d02)).

## [0.16.0] - 2025-07-18

### Added

- (KsLink) Added `inherit` option to `size` prop to allow links to inherit font size from parent elements - ([e21d788be](https://code.byted.org/ad/byted-web-components/commit/e21d788be)).
- (KsAssetTile) Added `mediaType` prop to specify asset type as video, carousel, or image - ([011709718](https://code.byted.org/ad/byted-web-components/commit/011709718)).
- (KsAssetTile) Added `additionalTags` prop to display AI, recommendation, and custom tags on the tile - ([011709718](https://code.byted.org/ad/byted-web-components/commit/011709718)).
- (KsAssetTile) Added `assetTileContent` prop to render title, description, detail info, and avatar - ([011709718](https://code.byted.org/ad/byted-web-components/commit/011709718)).
- (KsAssetTile) Added `action` prop to display edit, delete, full screen, or dropdown action buttons - ([011709718](https://code.byted.org/ad/byted-web-components/commit/011709718)).
- (KsAssetTile) Added `actionSource` prop to provide dropdown menu items when action is set to "more" - ([011709718](https://code.byted.org/ad/byted-web-components/commit/011709718)).
- (KsAssetTile) Added `showTiktok` prop to display TikTok icon badge - ([011709718](https://code.byted.org/ad/byted-web-components/commit/011709718)).
- (KsAssetTile) Added `freeStretch` prop to control tile width stretching behavior - ([011709718](https://code.byted.org/ad/byted-web-components/commit/011709718)).
- (KsAssetTile) Added `xl` size option to size prop for extra large tiles - ([011709718](https://code.byted.org/ad/byted-web-components/commit/011709718)).
- (KsAssetTile) Added `pending` and `warning` status options to status prop - ([011709718](https://code.byted.org/ad/byted-web-components/commit/011709718)).
- (KsAssetTile) Added `status-content` slot for custom tooltip content when tile has status - ([011709718](https://code.byted.org/ad/byted-web-components/commit/011709718)).
- (KsAssetTile) Added `content-wrapper` slot for customizing asset tile content area - ([011709718](https://code.byted.org/ad/byted-web-components/commit/011709718)).
- (KsTag) Added `draggable` prop to enable drag functionality for tags - ([c5bd259f9](https://code.byted.org/ad/byted-web-components/commit/c5bd259f9)).
- (KsTag) Added `onKsStartDrag` event that emits when drag interaction begins on draggable tags - ([c5bd259f9](https://code.byted.org/ad/byted-web-components/commit/c5bd259f9)).
- (KsTag) Added drag icon display for draggable neutral variant tags - ([c5bd259f9](https://code.byted.org/ad/byted-web-components/commit/c5bd259f9)).
- (KsThumbnail) Added support for displaying image grids when multiple images are provided and size is 'lg' or 'xl' - ([c5bd259f9](https://code.byted.org/ad/byted-web-components/commit/c5bd259f9)).

### Changed

- (KsLink) **[BREAKING]** Changed default `size` prop value from `md` to `inherit` - ([e21d788be](https://code.byted.org/ad/byted-web-components/commit/e21d788be)).
- (KsAssetTile) **[BREAKING]** Removed `playable` prop and `ksPlay` event - ([011709718](https://code.byted.org/ad/byted-web-components/commit/011709718)).
- (KsAssetTile) **[BREAKING]** Removed `badge` array prop, replaced with single `badge` string prop - ([011709718](https://code.byted.org/ad/byted-web-components/commit/011709718)).
- (KsAssetTile) **[BREAKING]** Removed `title` prop, replaced with `assetTileContent.title` - ([011709718](https://code.byted.org/ad/byted-web-components/commit/011709718)).
- (KsAssetTile) **[BREAKING]** Removed `action` slot, replaced with dedicated action props and built-in buttons - ([011709718](https://code.byted.org/ad/byted-web-components/commit/011709718)).
- (KsAssetTile) **[BREAKING]** Changed `ksAction` event to emit action type or dropdown item instead of void - ([011709718](https://code.byted.org/ad/byted-web-components/commit/011709718)).
- Updated dependencies - ([011709718](https://code.byted.org/ad/byted-web-components/commit/011709718)).
  /change Updated dependencies - ([ce9e5f868](https://code.byted.org/ad/byted-web-components/commit/ce9e5f868)).
- (KsThumbnail) Changed `image` prop to accept both string and string array types for multi-image support - ([c5bd259f9](https://code.byted.org/ad/byted-web-components/commit/c5bd259f9)).
- (KsThumbnail) Updated `isMultiple` prop description to include 'md' size support for visual stacking effect - ([c5bd259f9](https://code.byted.org/ad/byted-web-components/commit/c5bd259f9)).
- (KsAvatar) Modified `overlap` slot to only take effect when size is `lg` - ([bc1f5c2e0](https://code.byted.org/ad/byted-web-components/commit/bc1f5c2e0)).
- (KsAvatar) Updated badge placement logic - when `placement` is `bottomright` and `type` is `dot`, only `success` and `info` variants are effective, other variants automatically switch to `info` - ([bc1f5c2e0](https://code.byted.org/ad/byted-web-components/commit/bc1f5c2e0)).
- (KsAvatar) Badge display is now automatically hidden when KsAvatar is used within KsAvatarGroup - ([bc1f5c2e0](https://code.byted.org/ad/byted-web-components/commit/bc1f5c2e0)).
- (KsAvatar) Fixed overlap indicator styling with standardized 20px dimensions and center alignment - ([bc1f5c2e0](https://code.byted.org/ad/byted-web-components/commit/bc1f5c2e0)).
- (KsSwitch) **[BREAKING]** Changed description slot layout from horizontal to vertical alignment - ([d39db615a](https://code.byted.org/ad/byted-web-components/commit/d39db615a)).
  - @fe-infra/keystone-design-tokens@2.0.17
  - @fe-infra/keystone-icons@0.5.1

### Fixed

- (KsAssetTile) Fixed disabled state styling for badges and overlays - ([011709718](https://code.byted.org/ad/byted-web-components/commit/011709718)).
- (KsThumbnail) Fixed action mask display logic to only show when actions or playable content exists - ([c5bd259f9](https://code.byted.org/ad/byted-web-components/commit/c5bd259f9)).
- (KsTable) Fixed fixed columns not working properly with sticky positioning - ([066aace4a](https://code.byted.org/ad/byted-web-components/commit/066aace4a)).
- (KsTable) Fixed missing shadow effect when scrolling with fixed columns - ([066aace4a](https://code.byted.org/ad/byted-web-components/commit/066aace4a)).
- (KsFormItem) Fixed validation rule triggering logic to default to 'change' trigger instead of always triggering when no trigger is specified - ([82bfff8bc](https://code.byted.org/ad/byted-web-components/commit/82bfff8bc)).
- (KsAnchor) Fixed width occupation issue when `collapseType` is set to "hideable" - ([7e229ca30](https://code.byted.org/ad/byted-web-components/commit/7e229ca30)).
- (KsInputNumber) fixed input number component suffix padding styles - ([70ac58d72](https://code.byted.org/ad/byted-web-components/commit/70ac58d72)).
- (KsPagination) Fixed navigation arrow icon colors to properly display disabled state with correct theme colors - ([c923f942c](https://code.byted.org/ad/byted-web-components/commit/c923f942c)).
- (KsFieldsPresenter) fixed suffix color styles - ([4a51f3649](https://code.byted.org/ad/byted-web-components/commit/4a51f3649)).
- (KsTable) Fixed empty state layout to properly center content vertically within the table container - ([f0fb46f83](https://code.byted.org/ad/byted-web-components/commit/f0fb46f83)).

## [0.15.17] - 2025-07-16

### Fixed

- (KsDropdownMenu) Fixed virtual scrolling not working correctly in dropdown menus with tabs due to layout conflicts - ([e33573cfb](https://code.byted.org/ad/byted-web-components/commit/e33573cfb)).

## [0.15.16] - 2025-07-16

### Added

- (KsInput) Added `buttonText` slot to allow custom content in the input button instead of plain text - ([2e8ed3d1a](https://code.byted.org/ad/byted-web-components/commit/2e8ed3d1a)).
- (KsDateRangePicker) Added `needConfirm` prop to enable confirmation mode where date selection requires clicking the "confirm" button - ([989b02371](https://code.byted.org/ad/byted-web-components/commit/989b02371)).
- (KsDateRangePicker) Added confirmation footer with cancel and confirm buttons when `needConfirm` is enabled - ([989b02371](https://code.byted.org/ad/byted-web-components/commit/989b02371)).
- (KsModal) Added `body-container` slot to allow complete customization of the modal body area including scrolling behavior - ([350f8796a](https://code.byted.org/ad/byted-web-components/commit/350f8796a)).
- (KsPopover) Added `elementContext` prop to control overflow detection context between 'floating' and 'reference' elements - ([f9a2588b1](https://code.byted.org/ad/byted-web-components/commit/f9a2588b1)).

### Changed

- (KsModal) Reorganized modal layout structure with improved header padding and positioning of close button - ([350f8796a](https://code.byted.org/ad/byted-web-components/commit/350f8796a)).
- (KsModal) Enhanced divider display logic with smooth opacity transitions when `dividered` prop is enabled - ([350f8796a](https://code.byted.org/ad/byted-web-components/commit/350f8796a)).
- Updated dependencies - ([7670f1f74](https://code.byted.org/ad/byted-web-components/commit/7670f1f74)).
  - @fe-infra/keystone-icons@0.5.0

### Deprecated

- (KsTable) Added deprecated `deprecatedHideLastBorder` prop - this prop is no longer needed and will be removed in the future - ([2947373a3](https://code.byted.org/ad/byted-web-components/commit/2947373a3)).

### Fixed

- (KsTooltip) Fixed arrow positioning to dynamically calculate position based on tooltip bounds instead of using static placement-based positioning - ([f9a2588b1](https://code.byted.org/ad/byted-web-components/commit/f9a2588b1)).
- (KsAlertBanner) Fixed icon color mapping for info variant to use neutral colors instead of error colors - ([6396ac633](https://code.byted.org/ad/byted-web-components/commit/6396ac633)).
- (KsAlertBanner) Fixed incorrect icon assignments for warning and error variants - warning now shows warning icon, error shows caution icon - ([6396ac633](https://code.byted.org/ad/byted-web-components/commit/6396ac633)).
- (KsGuidance) Fixed icon colors for primary, neutral, and warning variants to use appropriate semantic colors instead of error colors - ([6396ac633](https://code.byted.org/ad/byted-web-components/commit/6396ac633)).
- (KsDatePicker) Fixed preset container scrolling by moving max-height and overflow styles to shared utility class - ([6396ac633](https://code.byted.org/ad/byted-web-components/commit/6396ac633)).
- (KsDropdownMenu) Fixed tab positioning when search is present by adding proper margin spacing - ([6396ac633](https://code.byted.org/ad/byted-web-components/commit/6396ac633)).
- (KsCheckbox) Fixed disabled state inheritance to preserve component's own disabled prop when parent becomes enabled - ([63d007047](https://code.byted.org/ad/byted-web-components/commit/63d007047)).
- (KsFieldsPresenter) fixed prefix color styles - ([4d4929315](https://code.byted.org/ad/byted-web-components/commit/4d4929315)).

## [0.15.15] - 2025-07-15

### Added

- (KsForm) Added `scrollToFirstError` method to automatically scroll to the first field with validation error - ([4d670a703](https://code.byted.org/ad/byted-web-components/commit/4d670a703)).

### Fixed

- (KsCheckbox) Fixed disabled state inheritance to preserve component's own disabled prop when parent becomes enabled - ([4d670a703](https://code.byted.org/ad/byted-web-components/commit/4d670a703)).

## [0.15.14] - 2025-07-11

### Added

- (KsDropdownButton) Added `overlayHeight` prop to control the dropdown list height, supporting string, number, or object with min/max values - ([f47b763fc](https://code.byted.org/ad/byted-web-components/commit/f47b763fc)).
- (KsDropdownMenu, KsInputSelector) Added `overlayHeight` prop to replace the heuristic height detection with more predictable height control - ([f47b763fc](https://code.byted.org/ad/byted-web-components/commit/f47b763fc)).

### Deprecated

- (KsDropdownMenu, KsInputSelector) Deprecated `listAutoHeight` prop, use `overlayHeight="auto"` instead for better flexibility - ([f47b763fc](https://code.byted.org/ad/byted-web-components/commit/f47b763fc)).

### Fixed

- (KsDropdownMenu) Fixed responsiveness issues with dropdown height calculation and improved flex layout behavior - ([f47b763fc](https://code.byted.org/ad/byted-web-components/commit/f47b763fc)).

## [0.15.13] - 2025-07-11

### Fixed

- (KsUploadList) Fixed error message display to only show when both error status exists and response message is available - ([62ac6ce1b](https://code.byted.org/ad/byted-web-components/commit/62ac6ce1b)).
- (KsText) Fixed tooltip not appearing on first hover when text has overflow and ellipsis tooltip is enabled - ([c410e0e94](https://code.byted.org/ad/byted-web-components/commit/c410e0e94)).
- (KsModal, KsToast) Fixed Vue 2 compatibility issues for `toast()` and `modal()` functions that caused render failures and potential memory leaks - ([0b184051b](https://code.byted.org/ad/byted-web-components/commit/0b184051b)).
- (KsDatePicker, KsDateRangePicker, KsMonthRangePicker) Fixed tooltip control to use direct element methods instead of visibility state for better popup behavior consistency - ([eabb2d142](https://code.byted.org/ad/byted-web-components/commit/eabb2d142)).
- (KsDatePicker, KsDateRangePicker, KsMonthRangePicker) Fixed timezone calculation to return normalized dates at start of day for consistent date comparisons - ([eabb2d142](https://code.byted.org/ad/byted-web-components/commit/eabb2d142)).
- (KsRadio) Fixed controlled mode state synchronization to prevent radio state from becoming out of sync with parent component - ([13f70201b](https://code.byted.org/ad/byted-web-components/commit/13f70201b)).
- (KsDropdownMenu) Fixed empty state rendering to only display for the active tab instead of all tabs - ([e0396b35d](https://code.byted.org/ad/byted-web-components/commit/e0396b35d)).
- (KsCascaderColumns) Fixed scroll position reset logic to properly handle column navigation and maintain scroll state when cascader options change - ([a64e23396](https://code.byted.org/ad/byted-web-components/commit/a64e23396)).

## [0.15.12] - 2025-07-09

### Added

- (KsDatePicker) Added `overridePresets` property to KsDatePicker to easily customize presets - ([7cacc9165](https://code.byted.org/ad/byted-web-components/commit/7cacc9165)).
- (KsDatePicker) Hovering presets in KsDatePicker now enables preview of dates in the date panel - ([7cacc9165](https://code.byted.org/ad/byted-web-components/commit/7cacc9165)).

### Changed

- (KsDatePicker) Manual timezone settings in KsDatePicker now have higher precedence than auto-fetched settings - ([7cacc9165](https://code.byted.org/ad/byted-web-components/commit/7cacc9165)).

## [0.15.11] - 2025-07-09

### Added

- (KsLoadingContainer) Added new KsLoadingContainer component - ([816cdde25](https://code.byted.org/ad/byted-web-components/commit/816cdde25)).
- (KsCascader, KsMultipleCascader) Added `searchValue` and `onSearchChange` properties to KsCascader and KsMultipleCascader - ([8df4eb0f3](https://code.byted.org/ad/byted-web-components/commit/8df4eb0f3)).
- (KsCascader, KsMultipleCascader) Added `close` function to KsCascader and KsMultipleCascader - ([8df4eb0f3](https://code.byted.org/ad/byted-web-components/commit/8df4eb0f3)).

### Fixed

- (KsCascader, KsMultipleCascader) Fixed custom search method variables in KsCascader and KsMultipleCascader - ([8df4eb0f3](https://code.byted.org/ad/byted-web-components/commit/8df4eb0f3)).
- (All form components) Fixed multiple async validation logic issues in forms - ([dbbe4f098](https://code.byted.org/ad/byted-web-components/commit/dbbe4f098)).
- (Core) Fixed tree-shaking functionality. All packages now support tree shaking - ([8e381c5fc](https://code.byted.org/ad/byted-web-components/commit/8e381c5fc)).

## [0.15.10] - 2025-07-07

### Fixed

- (All form components) Fixed issue where form validation could not get component instance - ([77214667b](https://code.byted.org/ad/byted-web-components/commit/77214667b)).

## [0.15.9] - 2025-07-02

### Added

- (KsNuxPopover) Added `autoShift` feature to KsNuxPopover - ([353cbf19a](https://code.byted.org/ad/byted-web-components/commit/353cbf19a)).
- (KsDatePicker) Added datePicker feature requests for EM and Brand Ads - ([c62699b38](https://code.byted.org/ad/byted-web-components/commit/c62699b38)).

### Changed

- (KsInputSelector) Changed the max-height limit in KsInputSelector to enhance compatibility with high content - ([816d2c945](https://code.byted.org/ad/byted-web-components/commit/816d2c945)).
- (KsModal) Confirm and cancel callbacks can now return boolean to control whether close method is called - ([7aa802cc3](https://code.byted.org/ad/byted-web-components/commit/7aa802cc3)).

## [0.15.8] - 2025-07-02

### Added

- (KsNuxPopover) KsNuxPopover now supports appending to body - ([38d7d9b16](https://code.byted.org/ad/byted-web-components/commit/38d7d9b16)).

## [0.15.5] - 2025-06-27

### Added

- (KsInputSelector, KsDropdownMenu) Added `loadFailCtas` and `loadFailedOptions` properties to KsInputSelector and KsDropdownMenu - ([927f59008](https://code.byted.org/ad/byted-web-components/commit/927f59008)).
- (KsDropdownMenu) Added `searchResults` title to KsDropdownMenu - ([927f59008](https://code.byted.org/ad/byted-web-components/commit/927f59008)).

## [0.15.4] - 2025-06-26

### Added

- (KsRadioGroup, KsCheckboxGroup) Added `gap` property to KsRadioGroup and KsCheckboxGroup - ([e693e53a5](https://code.byted.org/ad/byted-web-components/commit/e693e53a5)).
- (KsSearch) Added `onCategoryChange` event to KsSearch - ([7a213727e](https://code.byted.org/ad/byted-web-components/commit/7a213727e)).
- (KsDropdownMenu) Added `loadFail` property to KsDropdownMenu - ([7a213727e](https://code.byted.org/ad/byted-web-components/commit/7a213727e)).
- (KsInputSelector) Added `loadFail` property to KsInputSelector - ([7a213727e](https://code.byted.org/ad/byted-web-components/commit/7a213727e)).
- (KsDropdownMenuButton) Added `renderContent` support to KsDropdownMenuButton - ([7a213727e](https://code.byted.org/ad/byted-web-components/commit/7a213727e)).
- (KsMultipleCascader) Added support for `selectable` set to false in KsMultipleCascader - ([7a213727e](https://code.byted.org/ad/byted-web-components/commit/7a213727e)).
- (KsMultipleInput) Added new KsMultipleInput component - ([7a213727e](https://code.byted.org/ad/byted-web-components/commit/7a213727e)).
- (KsCascaderColumns) Added new KsCascaderColumns component - ([7a213727e](https://code.byted.org/ad/byted-web-components/commit/7a213727e)).

### Fixed

- (KsSearch) Fixed dropdown selection behavior in KsSearch - ([7a213727e](https://code.byted.org/ad/byted-web-components/commit/7a213727e)).
- (KsFieldPresenter) Fixed clear functionality in KsFieldPresenter - ([7a213727e](https://code.byted.org/ad/byted-web-components/commit/7a213727e)).
- (KsCarousel) Fixed blank flickering issue in KsCarousel when infinite loop is enabled - ([ccc17c62f](https://code.byted.org/ad/byted-web-components/commit/ccc17c62f)).

## [0.15.2] - 2025-06-24

### Changed

- (KsTable) Changed KsTable row content to be vertically centered by default - ([bae285cb3](https://code.byted.org/ad/byted-web-components/commit/bae285cb3)).

### Fixed

- (KsTable) Fixed synchronization issue with select-all state in KsTable - ([bae285cb3](https://code.byted.org/ad/byted-web-components/commit/bae285cb3)).
- (All form components) Fixed issue where form data was overwritten by initial values watcher - ([275ed1ed4](https://code.byted.org/ad/byted-web-components/commit/275ed1ed4)).

## [0.15.1] - 2025-06-20

### Added

- (KsToast) Added support for passing custom components as content to toast notifications - ([7bca75c0e](https://code.byted.org/ad/byted-web-components/commit/7bca75c0e)).
- (KsModal) Added support for passing custom components as content to modal dialogs - ([7bca75c0e](https://code.byted.org/ad/byted-web-components/commit/7bca75c0e)).
- (KsInputSelector) Added `open` and `close` functions to KsInputSelector to control dropdown state - ([23b101562](https://code.byted.org/ad/byted-web-components/commit/23b101562)).
- (All form components) Added circuit breaker feature for form item validators - ([16a240fd7](https://code.byted.org/ad/byted-web-components/commit/16a240fd7)).

### Fixed

- (All form components) Fixed default message for form item validators - ([16a240fd7](https://code.byted.org/ad/byted-web-components/commit/16a240fd7)).
- (All form components) Fixed blur trigger for validation logic in form items - ([16a240fd7](https://code.byted.org/ad/byted-web-components/commit/16a240fd7)).
- (KsTable) Fixed invalid `onRowSelect` event triggering after dataSource changes in KsTable - ([a545be39b](https://code.byted.org/ad/byted-web-components/commit/a545be39b)).

## [0.15.0] - 2025-06-17

### Changed

- (KsScrollBar) Adopted native scrollbar for modern browser design - ([800427074](https://code.byted.org/ad/byted-web-components/commit/800427074)).

## [0.14.4] - 2025-06-17

### Added

- (KsChip) Added new KsChip component - ([2686e2734](https://code.byted.org/ad/byted-web-components/commit/2686e2734)).
- (KsCrop) Added new KsCrop component - ([10daf7645](https://code.byted.org/ad/byted-web-components/commit/10daf7645)).
- (KsTooltip) Added `deprecatedDisableTopLayer` property to KsTooltip - ([ac27e36a3](https://code.byted.org/ad/byted-web-components/commit/ac27e36a3)).
- (Dropdown) Added auto focus functionality to dropdown search - ([ac27e36a3](https://code.byted.org/ad/byted-web-components/commit/ac27e36a3)).
- (KsSwitch) Added `title` slot to KsSwitch - ([6ccb95935](https://code.byted.org/ad/byted-web-components/commit/6ccb95935)).
- (KsSwitch) Added `labelPosition` property to KsSwitch - ([6ccb95935](https://code.byted.org/ad/byted-web-components/commit/6ccb95935)).
- (KsNuxPopover) Added `preventInteraction` property to KsNuxPopover - ([6ccb95935](https://code.byted.org/ad/byted-web-components/commit/6ccb95935)).
- (KsInput) Added `showClearBtn` functionality when KsInput is focused - ([6ccb95935](https://code.byted.org/ad/byted-web-components/commit/6ccb95935)).
- (KsButtonGroup) Added new KsButtonGroup component - ([6ccb95935](https://code.byted.org/ad/byted-web-components/commit/6ccb95935)).

### Changed

- (KsDropdownMenu) Changed description max lines to 2 in KsDropdownMenu - ([6ccb95935](https://code.byted.org/ad/byted-web-components/commit/6ccb95935)).

### Removed

- (KsInputSelector) Removed status icon from KsInputSelector - ([6ccb95935](https://code.byted.org/ad/byted-web-components/commit/6ccb95935)).

### Fixed

- (KsSegmentedControl) Fixed divider visibility issue between selected items in KsSegmentedControl - ([d2131bed7](https://code.byted.org/ad/byted-web-components/commit/d2131bed7)).

## [0.14.3] - 2025-06-16

### Added

- (KsMonthRangePicker) Added new KsMonthRangePicker component - ([9c2b2cadf](https://code.byted.org/ad/byted-web-components/commit/9c2b2cadf)).

## [0.14.2] - 2025-06-12

### Fixed

- (KsDropdownMenu) Made KsDropdownMenu height stable - ([745cbe271](https://code.byted.org/ad/byted-web-components/commit/745cbe271)).

## [0.14.1] - 2025-06-11

### Changed

- (KsModal) Reverted control mode changes in KsModal - ([5f1733995](https://code.byted.org/ad/byted-web-components/commit/5f1733995)).

## [0.14.0] - 2025-06-11

### Added

- (KsCheckboxGroup) Added context support to KsCheckboxGroup - ([68cd43063](https://code.byted.org/ad/byted-web-components/commit/68cd43063)).

### Changed

- (KsSegmentedControl) **[BREAKING]** Changed `value` type of KsSegmentedControl from `string[]` to `string | number` - ([c2ad3f776](https://code.byted.org/ad/byted-web-components/commit/c2ad3f776)).

### Fixed

- (KsCascader) Fixed issue where KsCascader did not work with custom key properties - ([31bbd7a03](https://code.byted.org/ad/byted-web-components/commit/31bbd7a03)).
- (KsGuidance) Fixed issue where initial `show` property did not work when set to false in KsGuidance - ([9c14deb45](https://code.byted.org/ad/byted-web-components/commit/9c14deb45)).
- (KsTable) Fixed issue where custom rendered content in KsTable would disappear or display incorrectly after reordering columns - ([1921bfbe4](https://code.byted.org/ad/byted-web-components/commit/1921bfbe4)).

## [0.13.4] - 2025-06-09

### Added

- (KsDrawer) Added `disableTopLayer` property to KsDrawer - ([005eb4095](https://code.byted.org/ad/byted-web-components/commit/005eb4095)).

### Changed

- (KsDrawer) Allowed interaction when KsDrawer is active - ([ac610b2ee](https://code.byted.org/ad/byted-web-components/commit/ac610b2ee)).

## [0.13.3] - 2025-06-06

### Changed

- (KsModal) Disabled scrolling when KsModal is active - ([00a996b84](https://code.byted.org/ad/byted-web-components/commit/00a996b84)).

## [0.13.2] - 2025-06-06

### Added

- (KsGuidance) Added support for `secondaryLink` and `compact` properties in KsGuidance - ([577e4f3ef](https://code.byted.org/ad/byted-web-components/commit/577e4f3ef)).

## [0.13.1] - 2025-06-05

### Added

- (KsButton) Added `alert` variant to KsButton component - ([afa49ffb0](https://code.byted.org/ad/byted-web-components/commit/afa49ffb0)).
- (KsDropUpload) Added ability to replace the icon in KsDropUpload component - ([afa49ffb0](https://code.byted.org/ad/byted-web-components/commit/afa49ffb0)).
- (KsDropUpload) Added option to hide instructions in KsDropUpload component - ([afa49ffb0](https://code.byted.org/ad/byted-web-components/commit/afa49ffb0)).
- (KsDropUpload) Added `width` parameter to prevent horizontal shrinking in KsDropUpload component - ([afa49ffb0](https://code.byted.org/ad/byted-web-components/commit/afa49ffb0)).
- (KsDropUpload, KsIconUpload) Added `description` property to KsDropUpload and KsIconUpload components - ([afa49ffb0](https://code.byted.org/ad/byted-web-components/commit/afa49ffb0)).
- (KsLink) Added `neutralHigh` variant to KsLink component - ([afa49ffb0](https://code.byted.org/ad/byted-web-components/commit/afa49ffb0)).
- (KsTooltip) Added `onOutClick` event to KsTooltip - ([5498f6ac9](https://code.byted.org/ad/byted-web-components/commit/5498f6ac9)).

### Fixed

- (KsUpload) Fixed issue where uploaded files could not be removed when `onRemove` was undefined in KsUpload component - ([afa49ffb0](https://code.byted.org/ad/byted-web-components/commit/afa49ffb0)).

## [0.13.0] - 2025-06-04

### Added

- (KsInputNumber) Added `showControls` property to KsInputNumber - ([da196db19](https://code.byted.org/ad/byted-web-components/commit/da196db19)).
- (KsQuarterPicker) Added new KsQuarterPicker component - ([68a443110](https://code.byted.org/ad/byted-web-components/commit/68a443110)).
- (KsNuxPopover) Added `content` slot to KsNuxPopover - ([416c45bb7](https://code.byted.org/ad/byted-web-components/commit/416c45bb7)).
- (KsTag) Added `icon` slot to KsTag - ([97000dcfa](https://code.byted.org/ad/byted-web-components/commit/97000dcfa)).
- (KsThumbnail) Added `onAction` event to KsThumbnail - ([97000dcfa](https://code.byted.org/ad/byted-web-components/commit/97000dcfa)).
- (KsAvatar) Added disabled status support to KsAvatar - ([97000dcfa](https://code.byted.org/ad/byted-web-components/commit/97000dcfa)).

### Removed

- (KsSideNavigation) **[BREAKING]** Removed `defaultOpeneds` property from KsSideNavigation. Migrated functionality to `defaultExpanded` and `expanded` properties on KsSubMenu - ([b24ca964b](https://code.byted.org/ad/byted-web-components/commit/b24ca964b)).
- (KsSubMenu) **[BREAKING]** Removed `showBadge` and `tagText` properties from KsSubMenu. Refactored to more flexible `prefix` and `suffix` slots - ([b24ca964b](https://code.byted.org/ad/byted-web-components/commit/b24ca964b)).

### Fixed

- (KsSideNavigation) Fixed issue where setting the `title` property on KsSideNavigation had no effect - ([b24ca964b](https://code.byted.org/ad/byted-web-components/commit/b24ca964b)).
- (KsPagination) Fixed type error of `renderTotal` property in KsPagination component - ([38fc44215](https://code.byted.org/ad/byted-web-components/commit/38fc44215)).

## [0.12.17] - 2025-05-30

### Added

- (KsTable) Added support for single column sorting in KsTable - ([3617da1ad](https://code.byted.org/ad/byted-web-components/commit/3617da1ad)).
- (KsCascader) Added label search support with highlight styling in KsCascader - ([c377a6f1a](https://code.byted.org/ad/byted-web-components/commit/c377a6f1a)).
- (KsCascader) Added ellipsis tooltip support for labels in KsCascader - ([c377a6f1a](https://code.byted.org/ad/byted-web-components/commit/c377a6f1a)).
- (KsDropdownButton) Added `shape` property support to KsDropdownButton - ([c377a6f1a](https://code.byted.org/ad/byted-web-components/commit/c377a6f1a)).
- (KsFieldPresenter) Added ellipsis tooltip support to KsFieldPresenter - ([c377a6f1a](https://code.byted.org/ad/byted-web-components/commit/c377a6f1a)).

### Fixed

- (KsTooltip) Fixed auto compute position functionality in KsTooltip - ([c377a6f1a](https://code.byted.org/ad/byted-web-components/commit/c377a6f1a)).

## [0.12.16] - 2025-05-29

### Fixed

- (KsDropdownMenu) Fixed auto-close behavior for KsDropdownMenu after single selection - ([c08f0c228](https://code.byted.org/ad/byted-web-components/commit/c08f0c228)).

## [0.12.13] - 2025-05-27

### Added

- (KsDropdownMenu) Added avatar support for group titles in KsDropdownMenu - ([50acd1263](https://code.byted.org/ad/byted-web-components/commit/50acd1263)).

## [0.12.12] - 2025-05-23

### Added

- (KsTable) Added support for single column sorting in KsTable - ([c99b4c19d](https://code.byted.org/ad/byted-web-components/commit/c99b4c19d)).
- (All components) Integrated TikTok Sans font resources - ([8b663df47](https://code.byted.org/ad/byted-web-components/commit/8b663df47)).

### Fixed

- (KsTreeView) Fixed auto ellipsis functionality for item labels in KsTreeView - ([6ef166aa2](https://code.byted.org/ad/byted-web-components/commit/6ef166aa2)).

## [0.12.10] - 2025-05-20

### Added

- (KsInput, KsSearch) Added throttling for value change tracking events in KsInput and KsSearch components - ([27704edcd](https://code.byted.org/ad/byted-web-components/commit/27704edcd)).

### Removed

- (KsInputPassword) Removed tracking point for value change event in KsInputPassword component - ([27704edcd](https://code.byted.org/ad/byted-web-components/commit/27704edcd)).

## [0.12.8] - 2025-05-16

### Fixed

- (KsDateRangePicker) Fixed timezone handling in date range picker getDaysPreset function - ([77231dccf](https://code.byted.org/ad/byted-web-components/commit/77231dccf)).
- (KsDropdownMenu) Fixed issue where tabs did not update when `dataSource` changed in KsDropdownMenu - ([0bb4c4eae](https://code.byted.org/ad/byted-web-components/commit/0bb4c4eae)).

## [0.12.7] - 2025-05-16

### Fixed

- (KsDropdownMenu) Fixed scrollbar position reset in KsDropdownMenu after search - ([ffdd172e1](https://code.byted.org/ad/byted-web-components/commit/ffdd172e1)).

## [0.12.6] - 2025-05-15

### Fixed

- (KsPagination) Fixed styling issue when page number exceeds 3 digits in KsPagination - ([e8e088d3b](https://code.byted.org/ad/byted-web-components/commit/e8e088d3b)).
- (All scrollable components) Fixed incorrect `onReachBottom` and `renderContent` trigger behavior - ([381fb8542](https://code.byted.org/ad/byted-web-components/commit/381fb8542)).

## [0.12.5] - 2025-05-13

### Added

- (KsDateRangePicker) Added support for extra quick options in KsDateRangePicker - ([d81164d51](https://code.byted.org/ad/byted-web-components/commit/d81164d51)).
- (KsDateRangePicker) Added current selected date parameter to `disableDate` property in KsDateRangePicker - ([054075167](https://code.byted.org/ad/byted-web-components/commit/054075167)).

## [0.12.4] - 2025-05-12

### Fixed

- (Core) Fixed popover-polyfill bundle configuration to preserve side effects - ([2966a87c9](https://code.byted.org/ad/byted-web-components/commit/2966a87c9)).

## [0.12.3] - 2025-05-09

### Removed

- (KsMultipleCascader) Removed max width restriction from KsMultipleCascader - ([67e013c87](https://code.byted.org/ad/byted-web-components/commit/67e013c87)).

### Fixed

- (KsTooltip) Fixed `startOffset` property functionality in KsTooltip - ([f435e4463](https://code.byted.org/ad/byted-web-components/commit/f435e4463)).

## [0.12.1] - 2025-05-08

### Added

- (All components) Added built-in `data-testid` attribute support to components for E2E testing - ([8d7bb3a3c](https://code.byted.org/ad/byted-web-components/commit/8d7bb3a3c)).

## [0.12.0] - 2025-05-07

### Added

- (All components) Added built-in tracking report capability with seamless integration for `@tt4b/platform-tracking-sdk` - ([a14ee9062](https://code.byted.org/ad/byted-web-components/commit/a14ee9062)).
- (KsDropdownMenu) Added support for `listAutoHeight` property in KsDropdownMenu - ([b0eb4dc83](https://code.byted.org/ad/byted-web-components/commit/b0eb4dc83)).

## [0.11.14] - 2025-05-07

### Changed

- (KsInputSelector) Restricted KsInputSelector height only when `loadMore` functionality is present - ([c0962f575](https://code.byted.org/ad/byted-web-components/commit/c0962f575)).

## [0.11.13] - 2025-04-30

### Fixed

- (KsDrawer, KsModal) Fixed issue where triggering and closing a modal inside a drawer would also close the drawer - ([ddf18cf28](https://code.byted.org/ad/byted-web-components/commit/ddf18cf28)).

## [0.11.12] - 2025-04-30

### Added

- (KsSideNavigation) Added tag support to KsSideNavigation - ([ba01463fd](https://code.byted.org/ad/byted-web-components/commit/ba01463fd)).
- (KsSwitch) Added tag support to KsSwitch - ([ba01463fd](https://code.byted.org/ad/byted-web-components/commit/ba01463fd)).
- (KsSlider) Added label support to slider controller - ([ba01463fd](https://code.byted.org/ad/byted-web-components/commit/ba01463fd)).
- (KsProgress) Added warning status support to progress bar components - ([ba01463fd](https://code.byted.org/ad/byted-web-components/commit/ba01463fd)).

### Fixed

- (KsInputSelector) Fixed selector max height to ensure `loadMore` functionality works properly - ([baf48ace2](https://code.byted.org/ad/byted-web-components/commit/baf48ace2)).

## [0.11.11] - 2025-04-29

### Fixed

- (KsDropdownMenu) Fixed scrollTop reset behavior in KsDropdownMenu after switching tabs - ([12041cb08](https://code.byted.org/ad/byted-web-components/commit/12041cb08)).

## [0.11.10] - 2025-04-29

### Fixed

- (KsDatePicker, KsDropdownMenu) Fixed timezone support in KsDatePicker and height expansion in KsDropdownMenu - ([6a0d224cb](https://code.byted.org/ad/byted-web-components/commit/6a0d224cb)).

## [0.11.9] - 2025-04-28

### Added

- (KsTag) Added max-width to KsTag - ([2f50c0bac](https://code.byted.org/ad/byted-web-components/commit/2f50c0bac)).

### Fixed

- (KsTag) Fixed text overflow behavior in KsTag - ([2f50c0bac](https://code.byted.org/ad/byted-web-components/commit/2f50c0bac)).

## [0.11.8] - 2025-04-27

### Added

- (KsTreeView) Added `expandedKeys` control functionality to KsTreeView - ([51e02a607](https://code.byted.org/ad/byted-web-components/commit/51e02a607)).

## [0.11.7] - 2025-04-25

### Added

- (KsGuidance) Added internal expand and collapse functions to KsGuidance - ([59b6714af](https://code.byted.org/ad/byted-web-components/commit/59b6714af)).

## [0.11.5] - 2025-04-24

### Added

- (KsRadio) Added `content` slot to KsRadio to display functional components without triggering radio click - ([7ffb6daea](https://code.byted.org/ad/byted-web-components/commit/7ffb6daea)).

## [0.11.4] - 2025-04-24

### Added

- (KsThumbnail) Added block state and ratio support to KsThumbnail - ([66c3c3119](https://code.byted.org/ad/byted-web-components/commit/66c3c3119)).

### Changed

- (KsSpace) Improved compact styling in KsSpace to support wrapped items inside - ([a407adff1](https://code.byted.org/ad/byted-web-components/commit/a407adff1)).

### Removed

- (KsStatusMessage) **[BREAKING]** Removed `size` property from KsStatusMessage - ([258434cb2](https://code.byted.org/ad/byted-web-components/commit/258434cb2)).

### Fixed

- (KsDropdownMenu) Fixed scrollbar position issue when refreshing dataSource in KsDropdownMenu - ([2f0f8fbaa](https://code.byted.org/ad/byted-web-components/commit/2f0f8fbaa)).
- (KsDropdownMenu) Fixed unexpected behavior when enabling virtual scrolling with dynamic slot rendering - ([175354e72](https://code.byted.org/ad/byted-web-components/commit/175354e72)).

## [0.11.3] - 2025-04-23

### Fixed

- (KsCascader) Fixed singleActiveItem functionality in KsCascader - ([306577d07](https://code.byted.org/ad/byted-web-components/commit/306577d07)).

## [0.11.2] - 2025-04-23

### Fixed

- (All input components) Fixed composition event handling for Chinese in all input components - ([82c56552b](https://code.byted.org/ad/byted-web-components/commit/82c56552b)).

## [0.11.1] - 2025-04-23

### Added

- (KsAssetTile) Added `play` slot to KsAssetTile - ([214c8bc5e](https://code.byted.org/ad/byted-web-components/commit/214c8bc5e)).
- (KsThumbnail) Added block state and ratio support to KsThumbnail - ([214c8bc5e](https://code.byted.org/ad/byted-web-components/commit/214c8bc5e)).

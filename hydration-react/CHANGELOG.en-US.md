# @byted-keystone/react-output-target

## [0.2.4] - 2025-12-24

### Changed

- Set react-dom as external to reduce dependency resolution conflict - ([d0042ce82](https://code.byted.org/ad/byted-web-components/commit/d0042ce82)).

## [0.2.3] - 2025-12-23

### Added

- (KsDrawer) Added React-only `appendToBody` prop (defaults to false) to control whether the drawer is appended to the body element - ([ecef4d9ea](https://code.byted.org/ad/byted-web-components/commit/ecef4d9ea)).

### Fixed

- (KsTooltip) Resolve KsTooltip zIndex compatibility issues by defaulting to non-top layer mode whenever a `zIndex` prop is passed - ([ecef4d9ea](https://code.byted.org/ad/byted-web-components/commit/ecef4d9ea)).
## [0.2.2] - 2025-11-24

### Fixed

- (KsForm): fixed form value sync when path change issue - ([774505c58](https://code.byted.org/ad/byted-web-components/commit/774505c58)).

## [0.2.1] - 2025-10-15

### Changed

- fix: improve component compiler output - ([c115e8bbf](https://code.byted.org/ad/byted-web-components/commit/c115e8bbf)).
## 0.1.9

### Minor Changes

- 0b00cc96b: Experience Optimization:
  - Enhanced Server-Side Rendering (SSR) support for components, improving first-load performance.
  - Improved TypeScript type hints, providing better type inference and code completion.
  - Optimized event handling mechanism, enhancing component responsiveness.
  - Enhanced form component state management, improving form operation smoothness.
  - Improved dynamic content update mechanism for dropdown components.
  - Optimized component event listening mechanism, reducing unnecessary re-renders.

### Patch Changes

- 16a240fd7: Fixed form item validator default message.
- 16a240fd7: Added circuit breaker feature for form item validator.
- 16a240fd7: Fixed form item blur trigger for validation logic.
- 16a240fd7: Fixed input selector search styles when used in form.
## 0.1.8
- 65dc1af22: Fixed an issue where passing arrays to slot properties in React components was not working correctly.
## 0.1.7
- be325e402: fix: table-cell and upload width should auto be 100%
## 0.1.6
- 0bb4c4eae: Fixed a bug where duplicately rendered dynamic slots.
## 0.1.5
- 381fb8542: fix: incorrect reachBottom and renderContent trigger
## 0.1.4
- 8368fdcce: Fixed a bug where invalid values were being passed to slots for rendering when a slot name was the same as a prop name.
## 0.1.3
- b173026ca: Set \_\_internal_bridged_dynamic_slot_render property in the runtime.
## 0.1.2
- 175354e72: Fix unexpected behavior when enables virtual scrolling with rendering dynamic slots.
## 0.1.1
- a5f49fcd6: Fix the type error when slot name has conflict with property names in React.HTMLAttributes.
## 0.1.0

## [0.2.0] - 2025-10-10

### Added

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

## [0.1.12] - 2025-09-25

### Added

- (KsSimpleTable) Added new simple table component as prerelease version of redesigned table with TanStack Table integration - ([37bb60096](https://code.byted.org/ad/byted-web-components/commit/37bb60096)).

## [0.1.11] - 2025-09-19

### Changed

- (Core) Improve compatibility for legacy iPadOS Safari 16.4 - ([f10bf6c83](https://code.byted.org/ad/byted-web-components/commit/f10bf6c83)).

## [0.1.10] - 2025-09-17

### Added

- (KsButtonGroup) Added `htmlName` prop for form integration support - ([1b553bf37](https://code.byted.org/ad/byted-web-components/commit/1b553bf37)).
- (KsButtonGroup) **[BREAKING]** Added `multiple` prop to replace deprecated `isMultiple` prop - ([1b553bf37](https://code.byted.org/ad/byted-web-components/commit/1b553bf37)).
- (KsButtonGroupItem) Added `hideCheckmark` prop to control checkmark visibility in multiple selection mode - ([1b553bf37](https://code.byted.org/ad/byted-web-components/commit/1b553bf37)).

### Fixed

- (KsButtonGroup, KsButtonGroupItem) **[BREAKING]** Fixed position styling classes from `__first` to `__start` for consistency - ([1b553bf37](https://code.byted.org/ad/byted-web-components/commit/1b553bf37)).


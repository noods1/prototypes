# @byted-keystone/react-output-target

## [0.2.4] - 2025-12-24

### 变更

- 将 react-dom 设置为 external，减少依赖解析冲突 - ([d0042ce82](https://code.byted.org/ad/byted-web-components/commit/d0042ce82)).

## [0.2.3] - 2025-12-23

### 新增

- (KsDrawer) 新增仅限于 React 版本的 `appendToBody` 属性（默认值为 false），用于控制抽屉是否被追加到 body 元素中 - ([ecef4d9ea](https://code.byted.org/ad/byted-web-components/commit/ecef4d9ea)).

### 修复

- (KsTooltip) 修复 KsTooltip zIndex 兼容性问题，当传递 `zIndex` 属性时，默认切换到非顶层模式 - ([ecef4d9ea](https://code.byted.org/ad/byted-web-components/commit/ecef4d9ea)).
## [0.2.2] - 2025-11-24

### 修复

- (KsForm): 修复表单值同步问题，当路径变化时 - ([774505c58](https://code.byted.org/ad/byted-web-components/commit/774505c58)).

## [0.2.1] - 2025-10-15

### 变更

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

### 新增

- (KsCascader) 新增表单集成功能，在表单项内使用时自动同步值变化 - ([8571bb6d7](https://code.byted.org/ad/byted-web-components/commit/8571bb6d7)).
- (KsMultipleCascader) 新增表单集成功能，在表单项内使用时自动同步值变化 - ([8571bb6d7](https://code.byted.org/ad/byted-web-components/commit/8571bb6d7)).
- (KsCheckboxGroup) 新增表单集成功能，在表单项内使用时自动同步值变化 - ([8571bb6d7](https://code.byted.org/ad/byted-web-components/commit/8571bb6d7)).
- (KsCheckbox) 新增表单集成功能，在表单项内使用时自动同步值变化 - ([8571bb6d7](https://code.byted.org/ad/byted-web-components/commit/8571bb6d7)).
- (KsDatePicker) 新增表单集成功能，在表单项内使用时自动同步值变化 - ([8571bb6d7](https://code.byted.org/ad/byted-web-components/commit/8571bb6d7)).
- (KsMonthRangePicker) 新增表单集成功能，在表单项内使用时自动同步值变化 - ([8571bb6d7](https://code.byted.org/ad/byted-web-components/commit/8571bb6d7)).
- (KsDateRangePicker) 新增表单集成功能，在表单项内使用时自动同步值变化 - ([8571bb6d7](https://code.byted.org/ad/byted-web-components/commit/8571bb6d7)).
- (KsFieldsPresenter) 新增表单集成功能，在表单项内使用时自动同步值变化 - ([8571bb6d7](https://code.byted.org/ad/byted-web-components/commit/8571bb6d7)).
- (KsFormItem) 重构为使用新的表单上下文系统，支持改进的验证和状态管理 - ([8571bb6d7](https://code.byted.org/ad/byted-web-components/commit/8571bb6d7)).
- (KsFormList) 新增组件，用于管理表单中的动态列表，支持添加、删除和移动操作 - ([8571bb6d7](https://code.byted.org/ad/byted-web-components/commit/8571bb6d7)).
- (KsForm) 完全重新设计的表单系统，采用新的验证架构和基于上下文的状态管理 - ([8571bb6d7](https://code.byted.org/ad/byted-web-components/commit/8571bb6d7)).
- (KsInputSelector) 新增表单集成功能，在表单项内使用时自动同步值变化 - ([8571bb6d7](https://code.byted.org/ad/byted-web-components/commit/8571bb6d7)).
- (KsInput) 新增表单集成功能，在表单项内使用时自动同步值变化和失焦事件处理 - ([8571bb6d7](https://code.byted.org/ad/byted-web-components/commit/8571bb6d7)).
- (KsMultipleInput) 新增表单集成功能，在表单项内使用时自动同步值变化 - ([8571bb6d7](https://code.byted.org/ad/byted-web-components/commit/8571bb6d7)).
- (KsRadioGroup) 新增表单集成功能，在表单项内使用时自动同步值变化 - ([8571bb6d7](https://code.byted.org/ad/byted-web-components/commit/8571bb6d7)).
- (KsRadio) 新增表单集成功能，在表单项内使用时自动同步值变化 - ([8571bb6d7](https://code.byted.org/ad/byted-web-components/commit/8571bb6d7)).
- (KsTimePicker) 新增表单集成功能，在表单项内使用时自动同步值变化 - ([8571bb6d7](https://code.byted.org/ad/byted-web-components/commit/8571bb6d7)).
- 新增全面的表单工具函数和上下文值协调系统 - ([8571bb6d7](https://code.byted.org/ad/byted-web-components/commit/8571bb6d7)).
- 新增用于表单上下文集成的 React hooks: `useFormItemContext`, `useFormListContext` 和 `useWatch` - ([8571bb6d7](https://code.byted.org/ad/byted-web-components/commit/8571bb6d7)).

## [0.1.12] - 2025-09-25

### 新增

- (KsSimpleTable) 新增简单表格组件作为重构版表格的预发布版本，集成 TanStack Table - ([37bb60096](https://code.byted.org/ad/byted-web-components/commit/37bb60096)).

## [0.1.11] - 2025-09-19

### 变更

- (Core) 改善在老版本的 iPadOS Safari 16.4 上的兼容性 - ([f10bf6c83](https://code.byted.org/ad/byted-web-components/commit/f10bf6c83)).

## [0.1.10] - 2025-09-17

### 新增

- (KsButtonGroup) 添加 `htmlName` 属性以支持表单集成 - ([1b553bf37](https://code.byted.org/ad/byted-web-components/commit/1b553bf37)).
- (KsButtonGroup) **[BREAKING]** 添加 `multiple` 属性以替换已弃用的 `isMultiple` 属性 - ([1b553bf37](https://code.byted.org/ad/byted-web-components/commit/1b553bf37)).
- (KsButtonGroupItem) 添加 `hideCheckmark` 属性以控制多选模式下复选标记的可见性 - ([1b553bf37](https://code.byted.org/ad/byted-web-components/commit/1b553bf37)).

### 修复

- (KsButtonGroup, KsButtonGroupItem) **[BREAKING]** 修复位置样式类从 `__first` 更改为 `__start` 以保持一致性 - ([1b553bf37](https://code.byted.org/ad/byted-web-components/commit/1b553bf37)).


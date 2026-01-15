# @fe-infra/keystone

## [0.19.24] - 2026-01-14

### 新增

- (KsTimePicker) 添加了`hasTimezone`属性（默认值：true），用于控制时区指示器的显示状态 - ([19148ebe3](https://code.byted.org/ad/byted-web-components/commit/19148ebe3)).

### 变更

- (input) 字符计数字体大小为 labelSm - ([1fa31b5d8](https://code.byted.org/ad/byted-web-components/commit/1fa31b5d8)).

## [0.19.23] - 2026-01-13

### 变更

- 更新依赖 - ([fb01aa2c5](https://code.byted.org/ad/byted-web-components/commit/fb01aa2c5)).
  - @fe-infra/keystone-design-tokens@2.0.20

## [0.19.22] - 2026-01-12

### 变更

- 更新依赖 - ([41ddd4556](https://code.byted.org/ad/byted-web-components/commit/41ddd4556)).
  - @fe-infra/keystone-icons@0.7.2

### 修复

- (tooltip) 修复了floating-ui泄漏问题 - ([e5562b4a0](https://code.byted.org/ad/byted-web-components/commit/e5562b4a0)).
- (guidance) 修复了图标泄漏问题 - ([e5562b4a0](https://code.byted.org/ad/byted-web-components/commit/e5562b4a0)).

## [0.19.21] - 2025-12-31

### 变更

- (KsBreadcrumb) 暴露 `trigger` 和 `children[].id` API，用于更细粒度地控制 KsBreadcrumb 中的下拉菜单项 - ([223aeeadb](https://code.byted.org/ad/byted-web-components/commit/223aeeadb)).

### 修复

- (KsInlineAlert) 修复了inline alert 样式的问题，即宽度比预期的大2px，因为额外的border-width - ([c4eb6935a](https://code.byted.org/ad/byted-web-components/commit/c4eb6935a)).

## [0.19.20] - 2025-12-24

## [0.19.19] - 2025-12-23

## [0.19.17] - 2025-12-17

### 修复

- (KsProgress) 修改 KsProgress color 样式 - ([42793952a](https://code.byted.org/ad/byted-web-components/commit/42793952a)).

## [0.19.16] - 2025-12-12

### 新增

- (KsProgress) 新增`color`属性，允许自定义进度指示器颜色，若提供该属性则会覆盖基于状态的颜色 - ([60669f71c](https://code.byted.org/ad/byted-web-components/commit/60669f71c)).

## [0.19.15] - 2025-12-12

### 变更

- Updated dependencies - ([6c8b32a7a](https://code.byted.org/ad/byted-web-components/commit/6c8b32a7a)).
  /change Updated dependencies - ([f43263938](https://code.byted.org/ad/byted-web-components/commit/f43263938)).
  - @fe-infra/keystone-icons@0.7.1

## [0.19.14] - 2025-12-05

### 变更

- Updated dependencies - ([92aed1d9f](https://code.byted.org/ad/byted-web-components/commit/92aed1d9f)).
  - @fe-infra/keystone-icons@0.7.0

### 修复

- (KsPagination) fix the padding style of KsPagination to make it tidier - ([7815be2d1](https://code.byted.org/ad/byted-web-components/commit/7815be2d1)).

## [0.19.13] - 2025-12-03

### 修复

- (KsSlider) 修复了提示框主体容器捕获指针事件的问题，通过为`bodywrap`部件设置`pointer-events: none`来实现 - ([d9cb3bebe](https://code.byted.org/ad/byted-web-components/commit/d9cb3bebe)).

## [0.19.12] - 2025-12-03

### 变更

- Updated dependencies - ([2b9996b32](https://code.byted.org/ad/byted-web-components/commit/2b9996b32)).
  - @fe-infra/keystone-icons@0.6.13

## [0.19.11] - 2025-11-27

### 变更

- (KsText) 将 KsTooltip 的 `hideOnAnchorExit`属性的从false改为true - ([b2a79f3e9](https://code.byted.org/ad/byted-web-components/commit/b2a79f3e9)).

## [0.19.10] - 2025-11-27

### 变更

- (side navigation): 变更侧边导航的样式以符合设计规范 - ([5da553245](https://code.byted.org/ad/byted-web-components/commit/5da553245)).

### 修复

- : 修复全局store gc问题 - ([7dd3074df](https://code.byted.org/ad/byted-web-components/commit/7dd3074df)).

## [0.19.9] - 2025-11-24

### 新增

- (KsChip) 新增 `prefix` 插槽，支持在芯片标签前添加内容，且前缀内容与标签之间已自动添加间距 - ([0c94915e8](https://code.byted.org/ad/byted-web-components/commit/0c94915e8)).

### 修复

- (KsUpload) 修复了当未满足最大文件数量条件时合并文件列表未更新的问题 - ([35a55ea0f](https://code.byted.org/ad/byted-web-components/commit/35a55ea0f)).

## [0.19.8] - 2025-11-24

### 修复

- (KsForm): 修复表单值同步问题，当路径变化时 - ([774505c58](https://code.byted.org/ad/byted-web-components/commit/774505c58)).

## [0.19.7] - 2025-11-19

### 变更

- Updated dependencies - ([4183deb0a](https://code.byted.org/ad/byted-web-components/commit/4183deb0a)).
  /change Updated dependencies - ([4183deb0a](https://code.byted.org/ad/byted-web-components/commit/4183deb0a)).
  - @fe-infra/keystone-icons@0.6.12
  - @fe-infra/keystone-design-tokens@2.0.19

## [0.19.6] - 2025-11-17

### 变更

- Updated dependencies - ([a4f68753f](https://code.byted.org/ad/byted-web-components/commit/a4f68753f)).
  - @fe-infra/keystone-icons@0.6.11

## [0.19.5] - 2025-11-12

### 修复

- (KsSelect): 修复了选中的选项在选项列表中不存在的问题，触发 change 事件时会抛出错误 - ([8271b124e](https://code.byted.org/ad/byted-web-components/commit/8271b124e)).
- (KsValueField): 修复了 enableInput 为 false 时，值字段仍然会转行显示 input 的问题 - ([8271b124e](https://code.byted.org/ad/byted-web-components/commit/8271b124e)).
- (KsForm): 修复了校验逻辑。验证过程中捕获到的错误不是来自验证器的问题，应直接抛出错误 - ([8271b124e](https://code.byted.org/ad/byted-web-components/commit/8271b124e)).

## [0.19.4] - 2025-11-06

### 新增

- (KsProgress) 添加了`percentText`插槽，允许自定义百分比文本的显示 - ([96dddc9d5](https://code.byted.org/ad/byted-web-components/commit/96dddc9d5)).
- (KsSlider) 添加了`tooltipVisible`属性，用于控制是否禁用提示框 - ([96dddc9d5](https://code.byted.org/ad/byted-web-components/commit/96dddc9d5)).
- (KsSlider) 添加了`ksChangeComplete`事件，在滑块的值更改操作完成时触发 - ([96dddc9d5](https://code.byted.org/ad/byted-web-components/commit/96dddc9d5)).
- (KsSlider) 当未设置`tooltipContent`时，添加了自动生成的本地化百分比值作为提示框内容 - ([96dddc9d5](https://code.byted.org/ad/byted-web-components/commit/96dddc9d5)).
- (KsUploadDrop) 添加了默认插槽，允许自定义上传拖拽区域的内容 - ([96dddc9d5](https://code.byted.org/ad/byted-web-components/commit/96dddc9d5)).

### 变更

- (KsSlider) 更改了提示框默认可见行为，从始终显示改为初始隐藏（提示框现在需要 hover 才能显示） - ([96dddc9d5](https://code.byted.org/ad/byted-web-components/commit/96dddc9d5)).
- (KsUploadDrop) 从错误状态样式逻辑中移除了`isExceededMax`条件（错误状态现在仅在`isError`为真时适用） - ([96dddc9d5](https://code.byted.org/ad/byted-web-components/commit/96dddc9d5)).

### 修复

- (KsInlineAlert) 修复了文字和图标对齐的问题 - ([d082b7ff2](https://code.byted.org/ad/byted-web-components/commit/d082b7ff2)).

## [0.19.3] - 2025-11-06

### 新增

- (KsThumbnail): KsThumbnail 支持 `playing` 状态和 `pause` 事件 - ([e83db5e9d](https://code.byted.org/ad/byted-web-components/commit/e83db5e9d)).

### 修复

- (KsLink): KsLink 在 `"sm"` 尺寸下应当使用更窄的下划线 - ([e83db5e9d](https://code.byted.org/ad/byted-web-components/commit/e83db5e9d)).

## [0.19.2] - 2025-10-29

### 修复

- (KsSwitch): 修复开关组件与表单绑定时禁用状态的问题 - ([c8ca5f5cc](https://code.byted.org/ad/byted-web-components/commit/c8ca5f5cc)).

## [0.19.1] - 2025-10-27

## [0.19.0] - 2025-10-24

### 新增

- (KsUpload, KsUploadDrag) 添加 `maxLength` 属性以限制可上传的最大文件数量 - ([4efd9bc69](https://code.byted.org/ad/byted-web-components/commit/4efd9bc69)).

### 变更

- (KsUpload) 增强错误处理机制，更好地管理文件上传失败和超出最大限制的场景 - ([4efd9bc69](https://code.byted.org/ad/byted-web-components/commit/4efd9bc69)).
- feat (KsSelect, KsInputSelector) 为 KsSelect 和 KsInputSelector 添加了 field slot，允许自定义展示选中值的方式 - ([4f24b4f93](https://code.byted.org/ad/byted-web-components/commit/4f24b4f93)).
- 更新依赖 - ([cd4343037](https://code.byted.org/ad/byted-web-components/commit/cd4343037)).
  - @fe-infra/keystone-icons@0.6.9

### 修复

- (KsUpload) 修复上传列表错误消息布局，移除固定高度限制 - ([4efd9bc69](https://code.byted.org/ad/byted-web-components/commit/4efd9bc69)).
- 增加 exports 字段到 package.json 中，以提升 Vitest 兼容性 - ([16386e374](https://code.byted.org/ad/byted-web-components/commit/16386e374)).
- (KsTooltip) 提升了对 `popover` polyfill 的兼容性，以确保提示框在老版本的浏览器中能够正确隐藏 - ([df92619f9](https://code.byted.org/ad/byted-web-components/commit/df92619f9)).
- (KsFieldsPresenter) 修复占位符文本颜色，使用正确的禁用状态颜色而非常规表面颜色 - ([a7d425100](https://code.byted.org/ad/byted-web-components/commit/a7d425100)).

## [0.18.12] - 2025-10-22

### 新增

- (KsTileMetric) 新增 `title` 插槽，以支持自定义标题内容 - ([543810b55](https://code.byted.org/ad/byted-web-components/commit/543810b55)).

### 变更

- (KsCarousel) **[BREAKING]** 改变了箭头分页的定位方式，由绝对定位改为静态定位，现在将显示在轮播内容的下方而不是重叠在内容之上 - ([1cc6b38b8](https://code.byted.org/ad/byted-web-components/commit/1cc6b38b8)).
- 支持通过 ::part(field) 自定义 KsInput, KsSelect, KsDatePicker 的字段样式 - ([3578f9792](https://code.byted.org/ad/byted-web-components/commit/3578f9792)).

## [0.18.11] - 2025-10-17

### 变更

- (KsLink) 支持在 `<KsLink display="inline">` 时内部文本换行 - ([999c993c4](https://code.byted.org/ad/byted-web-components/commit/999c993c4)).
- (KsDropdownMenu, KsPopover, KsTooltip) 将默认 `elementContext` 属性从 'reference' 更改为 'floating',改为默认检查的是浮动元素是否溢出，还可以将上下文更改为‘reference’，以检查其相对于其剪切边界的溢出 - ([ea5e82a3e](https://code.byted.org/ad/byted-web-components/commit/ea5e82a3e)).
- (KsDatePicker) 优化 KsDatePicker 的性能，通过减少不必要的 `disabledDate` 计算来实现 - ([801a2dd34](https://code.byted.org/ad/byted-web-components/commit/801a2dd34)).

## [0.18.10] - 2025-10-15

### 变更

- 更新依赖 - ([0b3c682fd](https://code.byted.org/ad/byted-web-components/commit/0b3c682fd)).
  - @fe-infra/keystone-icons@0.6.7

### 修复

- (KsTreeView) 修复了可选中展开节点和不可选中节点的对齐问题 - ([4fb93bb1b](https://code.byted.org/ad/byted-web-components/commit/4fb93bb1b)).

## [0.18.8] - 2025-10-10

### 新增

- (KsTreeView) 通过 `renderOptions.popover` 配置为树节点添加了弹出提示支持 - ([7a47a0b40](https://code.byted.org/ad/byted-web-components/commit/7a47a0b40)).
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

### 修复

- (KsTable) 修复了 KsTable 组件的 render 渲染逻辑，使 columns 改变的时候会正常触发 render 函数 - ([08e6beca4](https://code.byted.org/ad/byted-web-components/commit/08e6beca4)).

## [0.18.7] - 2025-10-08

### 新增

- (KsIcon) 添加 `divide` 和 `qr-code` 图标到图标库 - ([f66fd51b6](https://code.byted.org/ad/byted-web-components/commit/f66fd51b6)).
- (KsDrawer) 新增 `expandable` 属性，当 `withSideNav` 为 true 时启用可展开功能 - ([b11a4943b](https://code.byted.org/ad/byted-web-components/commit/b11a4943b)).
- (KsDrawer) 新增 `ksExpandChange` 事件，在抽屉展开状态变化时触发 - ([b11a4943b](https://code.byted.org/ad/byted-web-components/commit/b11a4943b)).
- (KsDrawer) 新增 `expand` 方法，支持程序化控制抽屉的展开状态 - ([b11a4943b](https://code.byted.org/ad/byted-web-components/commit/b11a4943b)).

### 变更

- 更新依赖 - ([f66fd51b6](https://code.byted.org/ad/byted-web-components/commit/f66fd51b6)).
- (KsAvatar) 添加 `xs` 尺寸选项，支持超小头像变体 - ([b11a4943b](https://code.byted.org/ad/byted-web-components/commit/b11a4943b)).
- (KsDrawer) 新增展开/收起时的平滑宽度过渡动画效果 - ([b11a4943b](https://code.byted.org/ad/byted-web-components/commit/b11a4943b)).
- (KsDrawer) 重构侧边导航布局以支持展开/收起按钮的定位 - ([b11a4943b](https://code.byted.org/ad/byted-web-components/commit/b11a4943b)).
- (KsText) 将默认文本装饰线厚度从 4% 更新为 6%，以提供更好的定义文本视觉强调效果 - ([8b25cfee7](https://code.byted.org/ad/byted-web-components/commit/8b25cfee7)).
- (KsCard) 更新卡片边框圆角，以符合设计规范 - ([3b040e338](https://code.byted.org/ad/byted-web-components/commit/3b040e338)).
  - @fe-infra/keystone-icons@0.6.5

### 修复

- (KsGuidance) 修复了当 `guidanceContent` 为 undefined 时的运行时错误 - ([f66fd51b6](https://code.byted.org/ad/byted-web-components/commit/f66fd51b6)).

## [0.18.5] - 2025-10-07

### 新增

- (KsStatusIcon) 添加 `disapproval` 和 `limitedApproval` 变体以支持更多状态类型 - ([5bc6e43a5](https://code.byted.org/ad/byted-web-components/commit/5bc6e43a5)).

### 变更

- 更新依赖 - ([5bc6e43a5](https://code.byted.org/ad/byted-web-components/commit/5bc6e43a5)).
  - @fe-infra/keystone-icons@0.6.4

### 修复

- (KsInlineAlert) 修复了内容对齐问题，确保警告容器内的项目正确垂直居中 - ([aaea5288e](https://code.byted.org/ad/byted-web-components/commit/aaea5288e)).
- (KsInlineAlert) 修复了当 `items` 属性未正确定义时可能出现的运行时错误 - ([aaea5288e](https://code.byted.org/ad/byted-web-components/commit/aaea5288e)).

## [0.18.4] - 2025-09-29

### 修复

- (KsTable) 修复了 KsTable 组件的 render 渲染逻辑，使 datasource 改变的时候会正常触发 render 函数 - ([4db3229ec](https://code.byted.org/ad/byted-web-components/commit/4db3229ec)).

## [0.18.3] - 2025-09-26 [YANKED]

### 变更

- (KsText) 更新 `definition` 提示框宽度以更好地适应内容 - ([4e7f43395](https://code.byted.org/ad/byted-web-components/commit/4e7f43395)).
- (KsTooltip) `autoShift` 贴合至屏幕边缘时保留微小的间距改善视觉效果 - ([4e7f43395](https://code.byted.org/ad/byted-web-components/commit/4e7f43395)).
- (KsTable) 增强分组单元格渲染功能，支持在分组标题中使用基于动态插槽的自定义内容 - ([9f2dd0792](https://code.byted.org/ad/byted-web-components/commit/9f2dd0792)).

## [0.18.2] - 2025-09-25 [YANKED]

### 新增

- (KsSimpleTable) 新增简单表格组件作为重构版表格的预发布版本，集成 TanStack Table - ([37bb60096](https://code.byted.org/ad/byted-web-components/commit/37bb60096)).

## [0.18.1] - 2025-09-24 [YANKED]

### 变更

- (KsText) 更新 `definition` 提示框宽度以更好地适应内容 - ([12c12548b](https://code.byted.org/ad/byted-web-components/commit/12c12548b)).
- (KsTooltip) `autoShift` 贴合至屏幕边缘时保留微小的间距改善视觉效果 - ([12c12548b](https://code.byted.org/ad/byted-web-components/commit/12c12548b)).

## [0.18.0] - 2025-09-24 [YANKED]

### 新增

- (KsTreeView) `label` 支持自定义节点内容，非 string 类型时作为动态插槽渲染 - ([253a330a6](https://code.byted.org/ad/byted-web-components/commit/253a330a6)).

### 变更

- 更新依赖 - ([3fc4ca200](https://code.byted.org/ad/byted-web-components/commit/3fc4ca200)).
  - @fe-infra/keystone-icons@0.6.2

### 修复

- (KsGlobalAlert) **[BREAKING]** 将之前的 `KsAlertBanner` 重命名为 `KsGlobalAlert`，并弃用其垂直变体和相关的API。同时将 `KsMultipleAlertBanner` 重命名为 `KsMultipleGlobalAlert` - ([66ae1fa18](https://code.byted.org/ad/byted-web-components/commit/66ae1fa18)).
- (KsTextField) 修复了文本字段在禁用状态下、状态为警告或错误时的颜色问题 - ([8d9dd707a](https://code.byted.org/ad/byted-web-components/commit/8d9dd707a)).

## [0.17.17] - 2025-09-19

### 修复

- (KsTooltip) 修复监听器目标从 `innerVisible` 改为 `innerVisibleByAnchor` 以确保正确的可见性状态管理 - ([4a5f20237](https://code.byted.org/ad/byted-web-components/commit/4a5f20237)).
- (KsTooltip) 修复显示样式逻辑仅在启用 `deprecatedDisableTopLayer` 时应用 - ([4a5f20237](https://code.byted.org/ad/byted-web-components/commit/4a5f20237)).

## [0.17.16] - 2025-09-19 [YANKED]

### 新增

- (KsTimePicker) 添加最小宽度，避免空间不足时内容溢出 - ([f3870a921](https://code.byted.org/ad/byted-web-components/commit/f3870a921)).
- (KsInput) 添加 `autoFocus` 属性，可在页面加载时自动聚焦输入框 - ([98352f9e1](https://code.byted.org/ad/byted-web-components/commit/98352f9e1)).
- (KsInput) 添加 `readOnly` 属性，设置为 true 时输入框为只读状态 - ([98352f9e1](https://code.byted.org/ad/byted-web-components/commit/98352f9e1)).
- (KsInput) 添加 `autoComplete` 属性，用于控制浏览器自动完成行为 - ([98352f9e1](https://code.byted.org/ad/byted-web-components/commit/98352f9e1)).
- (KsInput) 添加 `ksClick` 事件，当输入框被点击时触发（禁用状态下不触发） - ([98352f9e1](https://code.byted.org/ad/byted-web-components/commit/98352f9e1)).
- (KsInput) 添加 `ksKeydownEnter` 事件，当在输入框中按下 Enter 键时触发 - ([98352f9e1](https://code.byted.org/ad/byted-web-components/commit/98352f9e1)).
- (KsTextField) 添加 `autoFocus` 属性，可在页面加载时自动聚焦文本域 - ([98352f9e1](https://code.byted.org/ad/byted-web-components/commit/98352f9e1)).
- (KsTextField) 添加 `readOnly` 属性，设置为 true 时文本域为只读状态 - ([98352f9e1](https://code.byted.org/ad/byted-web-components/commit/98352f9e1)).
- (KsTextField) 添加 `autoComplete` 属性，用于控制浏览器自动完成行为 - ([98352f9e1](https://code.byted.org/ad/byted-web-components/commit/98352f9e1)).
- (KsTextField) 添加 `ksClick` 事件，当文本域被点击时触发 - ([98352f9e1](https://code.byted.org/ad/byted-web-components/commit/98352f9e1)).
- (KsTextField) 添加 `ksKeydownEnter` 事件，当在文本域中按下 Enter 键时触发 - ([98352f9e1](https://code.byted.org/ad/byted-web-components/commit/98352f9e1)).
- (KsTextField) 添加 `height` 属性，支持字符串、数字或包含 min/max 值的对象来自定义文本域高度 - ([98352f9e1](https://code.byted.org/ad/byted-web-components/commit/98352f9e1)).
- (KsTextField) 添加基于内容和配置的自动高度调整功能 - ([98352f9e1](https://code.byted.org/ad/byted-web-components/commit/98352f9e1)).
- (KsNuxPopover) 新增 `hideOnAnchorExit` 属性，用于控制当参考元素隐藏时气泡卡片的可见性 - ([c5e82675b](https://code.byted.org/ad/byted-web-components/commit/c5e82675b)).
- (KsPopover) 新增 `hideOnAnchorExit` 属性，用于控制当参考元素隐藏时气泡卡片的可见性 - ([c5e82675b](https://code.byted.org/ad/byted-web-components/commit/c5e82675b)).
- (KsTooltip) 新增 `hideOnAnchorExit` 属性，用于控制当参考元素隐藏时提示框的可见性 - ([c5e82675b](https://code.byted.org/ad/byted-web-components/commit/c5e82675b)).

### 变更

- (KsCascader) 重新组织插槽排列，将 `suffix` 和 `show-icon` 插槽包装在专用的后缀容器中以改善布局一致性 - ([f3870a921](https://code.byted.org/ad/byted-web-components/commit/f3870a921)).
- (KsModal) 更新了 `beforeOpen`、`beforeClose`、`confirmCallback` 和 `cancelCallback` 属性的类型定义，支持 void 返回类型 - ([c5e82675b](https://code.byted.org/ad/byted-web-components/commit/c5e82675b)).
- (Core) 改善在老版本的 iPadOS Safari 16.4 上的兼容性 - ([f10bf6c83](https://code.byted.org/ad/byted-web-components/commit/f10bf6c83)).
- 更新依赖 - ([f10bf6c83](https://code.byted.org/ad/byted-web-components/commit/f10bf6c83)).
  - @fe-infra/keystone-design-tokens@2.0.18
  - @fe-infra/keystone-icons@0.6.1

### 修复

- (KsMonthPicker) 修复日期解析问题，防止使用非 ISO 标准字符串值时出现时区偏移问题 - ([f3870a921](https://code.byted.org/ad/byted-web-components/commit/f3870a921)).
- (KsTimePicker) 修复面板值展示动画，确保值变更时正确显示 - ([f3870a921](https://code.byted.org/ad/byted-web-components/commit/f3870a921)).
- (KsNuxPopover) 修复了仅在启用 `preventInteraction` 属性时才阻止页面交互的问题 - ([f3870a921](https://code.byted.org/ad/byted-web-components/commit/f3870a921)).
- (KsDateRangePicker, KsDateTimeRangePicker) 修复了清除功能，现在会正确触发 `onKsClear` 和 `onKsChange` 事件并传递空值 - ([e488afc27](https://code.byted.org/ad/byted-web-components/commit/e488afc27)).
- (KsButton) 修复了当 `shape` 设置为 "square" 且 `loading` 为 true 时的插槽内容显示问题 - 现在会正确隐藏默认插槽内容以防止布局冲突 - ([4013ffccd](https://code.byted.org/ad/byted-web-components/commit/4013ffccd)).

## [0.17.15] - 2025-09-17

### 新增

- (KsButtonGroup) 添加 `htmlName` 属性以支持表单集成 - ([1b553bf37](https://code.byted.org/ad/byted-web-components/commit/1b553bf37)).
- (KsButtonGroup) 添加 `multiple` 属性以替换已弃用的 `isMultiple` 属性 - ([1b553bf37](https://code.byted.org/ad/byted-web-components/commit/1b553bf37)).
- (KsButtonGroupItem) 添加 `hideCheckmark` 属性以控制多选模式下复选标记的可见性 - ([1b553bf37](https://code.byted.org/ad/byted-web-components/commit/1b553bf37)).
- (KsBreadcrumb) 添加 `size` 属性以控制面包屑文本大小，支持 'md' 和 'lg' 选项 - ([1d7f5687a](https://code.byted.org/ad/byted-web-components/commit/1d7f5687a)).

### 变更

- (KsButton) 将loading state时需要添加说明文字的情况通过默认插槽支持 - ([93a986351](https://code.byted.org/ad/byted-web-components/commit/93a986351)).
- (KsPopover) 更新了弹出框的样式设计，包括阴影、背景色和圆角边框 - ([cdbc3e396](https://code.byted.org/ad/byted-web-components/commit/cdbc3e396)).
- (KsInput) 重构内部状态管理，使用不可控模式以更好地支持受控/非受控组件行为 - ([61670dcc7](https://code.byted.org/ad/byted-web-components/commit/61670dcc7)).
- (KsInput) 通过使用更高效的状态监听器替换生命周期方法来提升性能 - ([61670dcc7](https://code.byted.org/ad/byted-web-components/commit/61670dcc7)).

### 修复

- (KsButton) 修正了部分Button variant显示颜色不正确的问题 - ([93a986351](https://code.byted.org/ad/byted-web-components/commit/93a986351)).
- (KsInput) 修复了受控模式下值变更后光标位置恢复的问题 - ([61670dcc7](https://code.byted.org/ad/byted-web-components/commit/61670dcc7)).
- (KsTreeView) 修复了 `checkedKeys` 属性变更时树节点状态同步问题 - ([de5ba7d7b](https://code.byted.org/ad/byted-web-components/commit/de5ba7d7b)).

## [0.17.14] - 2025-09-12

### 新增

- (KsTable) 新增 `tableLayout` 属性用于控制表格布局行为，支持 'auto' 和 'fixed' 选项，默认为 'fixed' - ([190efceb8](https://code.byted.org/ad/byted-web-components/commit/190efceb8)).
- (KsTable) 新增列配置中的 `minWidth` 和 `maxWidth` 属性支持，实现灵活的列宽控制 - ([190efceb8](https://code.byted.org/ad/byted-web-components/commit/190efceb8)).

### 变更

- (KsTable) 更新固定列验证逻辑，当未指定 `width` 时也会检查 `minWidth` 属性 - ([190efceb8](https://code.byted.org/ad/byted-web-components/commit/190efceb8)).

## [0.17.13] - 2025-09-09

### 修复

- (KsInputNumber) revert input number 受控模式的修复, 修复了输入值同步行为，确保用户交互过程中的值能够正确更新 - ([82fbad7ee](https://code.byted.org/ad/byted-web-components/commit/82fbad7ee)).

## [0.17.11] - 2025-09-05

### 变更

- (KsInputSelector) 将宿主元素默认宽度从内联块自动大小调整为 100% 宽度 - ([db5a0ea15](https://code.byted.org/ad/byted-web-components/commit/db5a0ea15)).
- (KsInputSelector) **[BREAKING]** 移除了 `width` 属性的默认值 'auto'，现在需要明确指定宽度值 - ([db5a0ea15](https://code.byted.org/ad/byted-web-components/commit/db5a0ea15)).

### 修复

- (KsButtonGroup) 修复 `disabled` 属性类型定义，明确指定为 boolean 类型 - ([7ce92fb0c](https://code.byted.org/ad/byted-web-components/commit/7ce92fb0c)).
- (KsButtonGroup) 修复初始化逻辑，处理未定义的 `defaultValue` 时默认为空数组 - ([7ce92fb0c](https://code.byted.org/ad/byted-web-components/commit/7ce92fb0c)).
- (KsCrop) 修复了裁剪区域边界计算，防止在调整大小操作时裁剪区域超出容器边界 - ([84685f550](https://code.byted.org/ad/byted-web-components/commit/84685f550)).

## [0.17.10] - 2025-09-05

### 新增

- (KsBreadcrumb) 新增 `BreadcrumbDropdownItem` 支持，允许在面包屑导航中使用下拉菜单项 - ([373124e7e](https://code.byted.org/ad/byted-web-components/commit/373124e7e)).
- (KsBreadcrumb) 新增 `ksClickDropdownItem` 事件，当点击下拉菜单项时触发，提供所选项的值 - ([373124e7e](https://code.byted.org/ad/byted-web-components/commit/373124e7e)).
- (KsPagination) 新增 `dropdown` 尺寸选项，以下拉选择器形式展示分页，保留上一页/下一页按钮 - ([c9fce15ca](https://code.byted.org/ad/byted-web-components/commit/c9fce15ca)).

### 变更

- (KsCheckbox) 更新选中状态样式，使用语义化颜色标记并添加正确的悬停和激活状态 - ([4cded2caa](https://code.byted.org/ad/byted-web-components/commit/4cded2caa)).
- (KsSwitch) 更新手柄颜色，使用语义化中性色标记以提供更好的主题一致性 - ([4cded2caa](https://code.byted.org/ad/byted-web-components/commit/4cded2caa)).
- (KsInput) 通过使用 requestAnimationFrame 替换 setTimeout 改进了光标位置恢复性能 - ([da94e6970](https://code.byted.org/ad/byted-web-components/commit/da94e6970)).

### 修复

- (KsInputNumber) 修复了受控组件行为，当提供 `value` 属性时防止内部状态更新 - ([da94e6970](https://code.byted.org/ad/byted-web-components/commit/da94e6970)).

## [0.17.9] - 2025-08-29

### 新增

- (KsCrop) 添加 `circle` 属性以启用圆形裁剪区域高亮 - ([a888d92e2](https://code.byted.org/ad/byted-web-components/commit/a888d92e2)).
- 新增图标：`blocked-video`、`invalid-conversion`、`lipsync`、`pending-conversion`、`placeholder`、`private-video`、`unapproved-conversion` 和 `voice-speed` - ([a888d92e2](https://code.byted.org/ad/byted-web-components/commit/a888d92e2)).
- (KsCheckbox) 添加 `status` 属性以支持错误状态和视觉反馈 - ([a888d92e2](https://code.byted.org/ad/byted-web-components/commit/a888d92e2)).
- (KsRadio) 添加 `status` 属性以支持错误状态和视觉反馈 - ([a888d92e2](https://code.byted.org/ad/byted-web-components/commit/a888d92e2)).

### 变更

- (KsCrop) **[BREAKING]** 修改 `CropRect` 接口，将 `x` 和 `y` 属性设为可选 - ([a888d92e2](https://code.byted.org/ad/byted-web-components/commit/a888d92e2)).
- (KsCrop) 修改裁剪区域定位逻辑，当未提供 `x` 或 `y` 坐标时自动居中 - ([a888d92e2](https://code.byted.org/ad/byted-web-components/commit/a888d92e2)).
- 更新 `help` 图标设计和位置 - ([a888d92e2](https://code.byted.org/ad/byted-web-components/commit/a888d92e2)).
- (KsText) 为带有定义的文本元素添加了指针光标，提升用户体验 - ([a888d92e2](https://code.byted.org/ad/byted-web-components/commit/a888d92e2)).
- (KsSwitch) 更新了手柄背景颜色以获得更好的视觉对比度 - ([a888d92e2](https://code.byted.org/ad/byted-web-components/commit/a888d92e2)).

### 修复

- (KsTooltip) 修复了箭头定位以正确处理屏幕溢出并改善视觉对齐 - ([a888d92e2](https://code.byted.org/ad/byted-web-components/commit/a888d92e2)).
- (KsUpload) 修复了组件 fileList 更新不生效的问题 - ([a888d92e2](https://code.byted.org/ad/byted-web-components/commit/a888d92e2)).
- (KsCascader) 修复了数据源监听器中潜在的空引用错误 - ([a888d92e2](https://code.byted.org/ad/byted-web-components/commit/a888d92e2)).

## [0.17.8] - 2025-08-27

### 变更

- (KsText) 为带有定义的文本元素添加了指针光标，提升用户体验 - ([48ad6574b](https://code.byted.org/ad/byted-web-components/commit/48ad6574b)).
- 更新依赖 - ([48ad6574b](https://code.byted.org/ad/byted-web-components/commit/48ad6574b)).
  /change 更新依赖 - ([48ad6574b](https://code.byted.org/ad/byted-web-components/commit/48ad6574b)).
  - @fe-infra/keystone-icons@0.6.0

### 修复

- (KsTooltip) 修复了箭头定位以正确处理屏幕溢出并改善视觉对齐 - ([48ad6574b](https://code.byted.org/ad/byted-web-components/commit/48ad6574b)).
- (KsUpload) 修复了组件 fileList 更新不生效的问题 - ([48ad6574b](https://code.byted.org/ad/byted-web-components/commit/48ad6574b)).

## [0.17.7] - 2025-08-22

### 新增

- (KsCrop) 新增 `sizeMode` 属性用于控制图片尺寸受容器限制的方式（高度或宽度），默认为 'width' - ([2b19f7fee](https://code.byted.org/ad/byted-web-components/commit/2b19f7fee)).
- (KsCrop) 新增 `fixedRect` 属性，设置为 true 时禁用裁剪矩形的大小调整功能 - ([2b19f7fee](https://code.byted.org/ad/byted-web-components/commit/2b19f7fee)).
- (KsDropdownMenu) 新增 `listHeader` 插槽，用于在下拉面板中自定义列表头部内容 - ([75c92a4ee](https://code.byted.org/ad/byted-web-components/commit/75c92a4ee)).
- (KsInputSelector) 新增 `header` 插槽，用于在下拉面板中自定义头部内容 - ([75c92a4ee](https://code.byted.org/ad/byted-web-components/commit/75c92a4ee)).
- (KsInputSelector) 新增 `listHeader` 插槽，用于在下拉面板中自定义列表头部内容 - ([75c92a4ee](https://code.byted.org/ad/byted-web-components/commit/75c92a4ee)).
- (KsTable) 新增 `rowClassName` 属性，可为所有表格行应用自定义 CSS 类名 - ([d66394502](https://code.byted.org/ad/byted-web-components/commit/d66394502)).

### 变更

- (KsCrop) 更新布局使用 flexbox 以实现更好的图片居中和对齐效果 - ([2b19f7fee](https://code.byted.org/ad/byted-web-components/commit/2b19f7fee)).
- (KsCrop) 修改 `imageQuality` 默认值从 0.92 改为 0.9 - ([2b19f7fee](https://code.byted.org/ad/byted-web-components/commit/2b19f7fee)).
- (KsTreeView) **[BREAKING]** 更改了 KsTreeView 的值行为，现在会包含所有选中的值，而之前在父节点被选中时子节点的选择会被过滤掉 - ([c06c65ae6](https://code.byted.org/ad/byted-web-components/commit/c06c65ae6)).
- 优化了 `filled-chevron-down`, `filled-chevron-up`, `filled-chevron-left` 和 `filled-chevron-right` 的视觉效果 - ([83a4a5c2e](https://code.byted.org/ad/byted-web-components/commit/83a4a5c2e)).
- 更新依赖 - ([83a4a5c2e](https://code.byted.org/ad/byted-web-components/commit/83a4a5c2e)).
  - @fe-infra/keystone-icons@0.5.3

### 修复

- (KsTreeView) 修复了禁用项意外跟随父节点选择变化的问题 - ([c06c65ae6](https://code.byted.org/ad/byted-web-components/commit/c06c65ae6)).
- (KsThumbnail) 修复了在 Vue 应用中的渲染问题 - ([684512efc](https://code.byted.org/ad/byted-web-components/commit/684512efc)).

## [0.17.6] - 2025-08-20

### 新增

- (KsCheckbox) 新增 `forceIgnoreGroup` 属性，允许 KsCheckbox 即使嵌套在 KsCheckboxGroup 中也能独立操作 - ([721e951a7](https://code.byted.org/ad/byted-web-components/commit/721e951a7)).

## [0.17.5] - 2025-08-20

### 新增

- (KsText) 新增 `definition` 属性，将文本样式设置为带点状下划线的定义术语并支持工具提示 - ([84669c384](https://code.byted.org/ad/byted-web-components/commit/84669c384)).
- (KsText) 新增 `definition` 插槽，用于为定义工具提示提供自定义内容 - ([84669c384](https://code.byted.org/ad/byted-web-components/commit/84669c384)).
- (KsStatusIcon) 新增支持 `inProgress` 状态变体 - ([65a556a86](https://code.byted.org/ad/byted-web-components/commit/65a556a86)).
- (KsTile) 为非选中状态的瓦片添加主色调边框 - ([8941ff522](https://code.byted.org/ad/byted-web-components/commit/8941ff522)).
- (KsAssetTile) 为 1:1 比例添加进度环 - ([8941ff522](https://code.byted.org/ad/byted-web-components/commit/8941ff522)).
- (KsTable) 新增 `grouping` 属性以支持按指定列对表格行进行分组 - ([14890f83a](https://code.byted.org/ad/byted-web-components/commit/14890f83a)).
- (KsTable) 新增列配置中的 `enableHiding` 属性用于条件性隐藏列 - ([14890f83a](https://code.byted.org/ad/byted-web-components/commit/14890f83a)).
- (KsTable) 新增列配置中的 `renderGroupedCell` 属性用于自定义渲染分组单元格 - ([14890f83a](https://code.byted.org/ad/byted-web-components/commit/14890f83a)).

### 变更

- 更新依赖 - ([65a556a86](https://code.byted.org/ad/byted-web-components/commit/65a556a86)).
  - @fe-infra/keystone-icons@0.5.2

### 移除

- (KsAssetTile) 从 1:1 比例中移除进度条 - ([8941ff522](https://code.byted.org/ad/byted-web-components/commit/8941ff522)).

### 修复

- (KsCascader) 修复虚拟滚动条目高度计算，正确计算条目间的间距 - ([7e0bc77dd](https://code.byted.org/ad/byted-web-components/commit/7e0bc77dd)).

## [0.17.4] - 2025-08-13

### 新增

- (KsDropdownMenu) 为分组项添加了通过 `renderTitle` 函数属性自定义标题渲染的支持 - ([2f30a0789](https://code.byted.org/ad/byted-web-components/commit/2f30a0789)).

### 变更

- (KsProgress) 将中等尺寸标签排版从 'bodyLg' 更改为 'bodyMd' 以获得更好的视觉一致性 - ([89c5fb59a](https://code.byted.org/ad/byted-web-components/commit/89c5fb59a)).
- (KsInputSelector) 增强分组项渲染功能，通过 `renderTitle` 函数正确支持自定义分组标题 - ([f8136c1cf](https://code.byted.org/ad/byted-web-components/commit/f8136c1cf)).

### 移除

- (KsProgress) 移除了小尺寸标签中多余的 font-variant-numeric 样式 - ([89c5fb59a](https://code.byted.org/ad/byted-web-components/commit/89c5fb59a)).

### 修复

- (KsTreeView) 修复了点击非Checkbox区域时不会触发点击事件的问题 - ([0b90e74dc](https://code.byted.org/ad/byted-web-components/commit/0b90e74dc)).
- (KsCascader) 修复了当 `selectedFullValue` 为 undefined 时的运行时错误，增加了适当的类型检查 - ([a8dd8ea88](https://code.byted.org/ad/byted-web-components/commit/a8dd8ea88)).
- (KsDropdownMenu) 修复了标签页受控模式，正确同步 `activeTabId` 属性变更 - ([d1dc5d4ef](https://code.byted.org/ad/byted-web-components/commit/d1dc5d4ef)).
- (KsDropdownMenu) 修复了下拉菜单覆盖层宽度计算，确保正确匹配触发元素宽度 - ([420e863a3](https://code.byted.org/ad/byted-web-components/commit/420e863a3)).
- (KsStep) 修复步骤索引计算问题，正确处理动态更新并防止新增步骤丢失标签内容 - ([e7f4ffb41](https://code.byted.org/ad/byted-web-components/commit/e7f4ffb41)).

## [0.17.3] - 2025-07-30

### 修复

- (KsCheckbox) 修复了描述插槽的点击事件处理，防止意外行为 - ([b289eb277](https://code.byted.org/ad/byted-web-components/commit/b289eb277)).
- (KsInputSelector) 修复当 `dataSource` 变化且 `value` 为 undefined 时 `defaultValue` 未生效的问题 - ([9c5a0a192](https://code.byted.org/ad/byted-web-components/commit/9c5a0a192)).

## [0.17.2] - 2025-07-28

### 新增

- (KsTextField) 添加表单上下文集成，自动从父表单项继承禁用状态和验证状态 - ([8ed9f0b5f](https://code.byted.org/ad/byted-web-components/commit/8ed9f0b5f)).

### 变更

- (KsForm) 修改验证行为，仅在 'change' 和 'blur' 触发器上进行验证，而非所有触发器 - ([8ed9f0b5f](https://code.byted.org/ad/byted-web-components/commit/8ed9f0b5f)).
- (KsTextField) 将 `ksBlur` 事件冒泡从 false 更改为 true，以便更好地集成到表单中 - ([8ed9f0b5f](https://code.byted.org/ad/byted-web-components/commit/8ed9f0b5f)).
- (FormItemContext) 更新规则触发器类型定义，支持单个触发器和触发器数组 - ([8ed9f0b5f](https://code.byted.org/ad/byted-web-components/commit/8ed9f0b5f)).

### 修复

- (KsTextField) 修复占位符文本颜色，使用正确的表面颜色而非禁用颜色 - ([8ed9f0b5f](https://code.byted.org/ad/byted-web-components/commit/8ed9f0b5f)).
- (ContextConsumer) 修复内存泄漏问题，使用 WeakMap 正确管理消费者实例而非共享变量 - ([8ed9f0b5f](https://code.byted.org/ad/byted-web-components/commit/8ed9f0b5f)).
- (ContextProvider) 修复提供者初始化和清理，防止内存泄漏并正确处理断开连接 - ([8ed9f0b5f](https://code.byted.org/ad/byted-web-components/commit/8ed9f0b5f)).

## [0.17.0] - 2025-07-25

### 新增

- 添加从 GMPT 普遍的 `lang_type` Cookie 自动检测设置默认 locale 的逻辑，绝大多数场景下不再需要手动配置多语言 - ([6e5d65ad9](https://code.byted.org/ad/byted-web-components/commit/6e5d65ad9)).
- (KsMultipleInput) 添加了 `ksBlur` 事件，在输入框失去焦点时触发 - ([bee641caa](https://code.byted.org/ad/byted-web-components/commit/bee641caa)).
- (KsCheckbox) 新增 `suffix` 插槽，支持在多选框标签后添加额外内容 - ([eef8d9bba](https://code.byted.org/ad/byted-web-components/commit/eef8d9bba)).
- (KsRadio) 新增 `suffix` 插槽，支持在单选框标签后添加额外内容 - ([eef8d9bba](https://code.byted.org/ad/byted-web-components/commit/eef8d9bba)).
- (KsTable) 新增 `onKsRowClick` 事件，在表格行被点击时触发，提供完整的行数据对象 - ([21229b21e](https://code.byted.org/ad/byted-web-components/commit/21229b21e)).

### 变更

- 重构本地化系统，使用不超过 16KB 的体积内置了多语言包，支持 tree-shaking - ([6e5d65ad9](https://code.byted.org/ad/byted-web-components/commit/6e5d65ad9)).
- 语言配置改为接受语言代码（如 'en'、'zh'）而非原复杂配置对象 - ([6e5d65ad9](https://code.byted.org/ad/byted-web-components/commit/6e5d65ad9)).
- 更新依赖 - ([6e5d65ad9](https://code.byted.org/ad/byted-web-components/commit/6e5d65ad9)).
- (KsCheckbox) 更新小尺寸变体尺寸为 16x16px，提升视觉一致性 - ([eef8d9bba](https://code.byted.org/ad/byted-web-components/commit/eef8d9bba)).
- (KsTreeView) 增强 `ksCheck` 事件，现在会发出包含选中状态、受影响节点、选中键值、选中节点和半选中键值的详细参数，而不仅仅是键值数组 - ([96c9cd08e](https://code.byted.org/ad/byted-web-components/commit/96c9cd08e)).
- (KsTreeView) 增强 `ksToggleExpand` 事件，现在会发出包含展开状态、受影响节点和展开键值的详细参数，而不仅仅是键值数组 - ([96c9cd08e](https://code.byted.org/ad/byted-web-components/commit/96c9cd08e)).
- (KsBasePicker) 移除了输入框内的状态图标显示 - 它们现在会显示在 FormItem 消息中 - ([d7259e7b5](https://code.byted.org/ad/byted-web-components/commit/d7259e7b5)).
  - @fe-infra/keystone-locales@0.5.0

### 修复

- (KsCalendar) 修复了次要的间距布局问题和激活日期的配色问题 - ([d7259e7b5](https://code.byted.org/ad/byted-web-components/commit/d7259e7b5)).
- (KsGuidance) 改进了关闭按钮对齐，包括水平和垂直布局 - ([d7259e7b5](https://code.byted.org/ad/byted-web-components/commit/d7259e7b5)).
- (KsScrollbar) 将溢出行为从 'scroll' 更改为 'auto'，仅在内容溢出时启用滚动条 - ([d7259e7b5](https://code.byted.org/ad/byted-web-components/commit/d7259e7b5)).
- (KsFormItem) 修复失焦验证，现在仅在 `validateTrigger` 设置为 'blur' 时触发验证 - ([9a0830e38](https://code.byted.org/ad/byted-web-components/commit/9a0830e38)).

## [0.16.2] - 2025-07-23

### 修复

- (Cascader) 修复了 cascader 组件的样式问题 - ([499b4b500](https://code.byted.org/ad/byted-web-components/commit/499b4b500)).

## [0.16.1] - 2025-07-21

### 变更

- (KsDateTimeRangePicker) 增强了 `disabled` 属性，支持在范围模式下单独控制开始和结束输入框 - 接受布尔值或 `[boolean, boolean]` 数组 - ([29a051d02](https://code.byted.org/ad/byted-web-components/commit/29a051d02)).

## [0.16.0] - 2025-07-18

### 新增

- (KsLink) 为 `size` 属性新增 `inherit` 选项，允许链接继承父元素的字体大小 - ([e21d788be](https://code.byted.org/ad/byted-web-components/commit/e21d788be)).
- (KsAssetTile) 添加 `mediaType` 属性来指定资产类型为视频、轮播图或图片 - ([011709718](https://code.byted.org/ad/byted-web-components/commit/011709718)).
- (KsAssetTile) 添加 `additionalTags` 属性来在区块上显示AI、推荐和自定义标签 - ([011709718](https://code.byted.org/ad/byted-web-components/commit/011709718)).
- (KsAssetTile) 添加 `assetTileContent` 属性来渲染标题、描述、详细信息和头像 - ([011709718](https://code.byted.org/ad/byted-web-components/commit/011709718)).
- (KsAssetTile) 添加 `action` 属性来显示编辑、删除、全屏或下拉菜单操作按钮 - ([011709718](https://code.byted.org/ad/byted-web-components/commit/011709718)).
- (KsAssetTile) 添加 `actionSource` 属性来在操作设置为"more"时提供下拉菜单项 - ([011709718](https://code.byted.org/ad/byted-web-components/commit/011709718)).
- (KsAssetTile) 添加 `showTiktok` 属性来显示TikTok图标徽章 - ([011709718](https://code.byted.org/ad/byted-web-components/commit/011709718)).
- (KsAssetTile) 添加 `freeStretch` 属性来控制区块宽度拉伸行为 - ([011709718](https://code.byted.org/ad/byted-web-components/commit/011709718)).
- (KsAssetTile) 为size属性添加 `xl` 尺寸选项，用于超大区块 - ([011709718](https://code.byted.org/ad/byted-web-components/commit/011709718)).
- (KsAssetTile) 为status属性添加 `pending` 和 `warning` 状态选项 - ([011709718](https://code.byted.org/ad/byted-web-components/commit/011709718)).
- (KsAssetTile) 添加 `status-content` 插槽，用于在区块有状态时显示自定义工具提示内容 - ([011709718](https://code.byted.org/ad/byted-web-components/commit/011709718)).
- (KsAssetTile) 添加 `content-wrapper` 插槽，用于自定义资产区块内容区域 - ([011709718](https://code.byted.org/ad/byted-web-components/commit/011709718)).
- (KsTag) 添加 `draggable` 属性以启用标签的拖拽功能 - ([c5bd259f9](https://code.byted.org/ad/byted-web-components/commit/c5bd259f9)).
- (KsTag) 添加 `onKsStartDrag` 事件，在可拖拽标签开始拖拽交互时触发 - ([c5bd259f9](https://code.byted.org/ad/byted-web-components/commit/c5bd259f9)).
- (KsTag) 为可拖拽的中性变体标签添加拖拽图标显示 - ([c5bd259f9](https://code.byted.org/ad/byted-web-components/commit/c5bd259f9)).
- (KsThumbnail) 添加在提供多张图片且尺寸为 'lg' 或 'xl' 时显示图片网格的支持 - ([c5bd259f9](https://code.byted.org/ad/byted-web-components/commit/c5bd259f9)).

### 变更

- (KsLink) **[BREAKING]** 将默认 `size` 属性值从 `md` 更改为 `inherit` - ([e21d788be](https://code.byted.org/ad/byted-web-components/commit/e21d788be)).
- (KsAssetTile) **[BREAKING]** 移除 `playable` 属性和 `ksPlay` 事件 - ([011709718](https://code.byted.org/ad/byted-web-components/commit/011709718)).
- (KsAssetTile) **[BREAKING]** 移除 `badge` 数 - ([011709718](https://code.byted.org/ad/byted-web-components/commit/011709718)).
- 更新依赖 - ([011709718](https://code.byted.org/ad/byted-web-components/commit/011709718)).
  /change 更新依赖 - ([ce9e5f868](https://code.byted.org/ad/byted-web-components/commit/ce9e5f868)).
- (KsThumbnail) 修改 `image` 属性以同时支持字符串和字符串数组类型，实现多图像支持 - ([c5bd259f9](https://code.byted.org/ad/byted-web-components/commit/c5bd259f9)).
- (KsThumbnail) 更新 `isMultiple` 属性描述，包含对 'md' 尺寸视觉堆叠效果的支持 - ([c5bd259f9](https://code.byted.org/ad/byted-web-components/commit/c5bd259f9)).
- (KsAvatar) 修改 `overlap` 插槽，仅在 size 为 `lg` 时生效 - ([bc1f5c2e0](https://code.byted.org/ad/byted-web-components/commit/bc1f5c2e0)).
- (KsAvatar) 更新徽标位置逻辑 - 当 `placement` 为 `bottomright` 且 `type` 为 `dot` 时，只有 `success` 和 `info` 变体有效，其他变体自动切换为 `info` - ([bc1f5c2e0](https://code.byted.org/ad/byted-web-components/commit/bc1f5c2e0)).
- (KsAvatar) 当 KsAvatar 在 KsAvatarGroup 中使用时，徽标显示会自动隐藏 - ([bc1f5c2e0](https://code.byted.org/ad/byted-web-components/commit/bc1f5c2e0)).
- (KsAvatar) 修复重叠指示器样式，统一为 20px 尺寸并居中对齐 - ([bc1f5c2e0](https://code.byted.org/ad/byted-web-components/commit/bc1f5c2e0)).
- (KsSwitch) **[BREAKING]** 将描述插槽布局从水平对齐改为垂直对齐 - ([d39db615a](https://code.byted.org/ad/byted-web-components/commit/d39db615a)).
  - @fe-infra/keystone-design-tokens@2.0.17
  - @fe-infra/keystone-icons@0.5.1

### 修复

- (KsThumbnail) 修复操作遮罩显示逻辑，仅在存在操作或可播放内容时显示 - ([c5bd259f9](https://code.byted.org/ad/byted-web-components/commit/c5bd259f9)).
- (KsTable) 修复固定列粘性定位不生效的问题 - ([066aace4a](https://code.byted.org/ad/byted-web-components/commit/066aace4a)).
- (KsTable) 修复固定列滚动时缺少阴影效果的样式问题 - ([066aace4a](https://code.byted.org/ad/byted-web-components/commit/066aace4a)).
- (KsFormItem) 修复了验证规则触发逻辑，当未指定触发器时默认使用 'change' 触发器而不是总是触发 - ([82bfff8bc](https://code.byted.org/ad/byted-web-components/commit/82bfff8bc)).
- (KsAnchor) 修复了当 `collapseType` 设置为 "hideable" 时锚点列表仍然占据宽度的问题 - ([7e229ca30](https://code.byted.org/ad/byted-web-components/commit/7e229ca30)).
- (KsInputNumber) 修复了 input number 组件 suffix padding 样式问题 - ([70ac58d72](https://code.byted.org/ad/byted-web-components/commit/70ac58d72)).
- (KsPagination) 修复了导航箭头图标颜色，使其在禁用状态下正确显示主题颜色 - ([c923f942c](https://code.byted.org/ad/byted-web-components/commit/c923f942c)).
- (KsFieldsPresenter) 修复了 suffix 颜色样式问题 - ([4a51f3649](https://code.byted.org/ad/byted-web-components/commit/4a51f3649)).
- (KsTable) 修复空状态布局，使内容在表格容器中正确垂直居中显示 - ([f0fb46f83](https://code.byted.org/ad/byted-web-components/commit/f0fb46f83)).

## [0.15.17] - 2025-07-16

### 修复

- (KsDropdownMenu) 修复了带标签页的下拉菜单中虚拟滚动无法正常工作的问题，该问题由布局冲突导致 - ([e33573cfb](https://code.byted.org/ad/byted-web-components/commit/e33573cfb)).

## [0.15.16] - 2025-07-16

### 新增

- (KsInput) 新增 `buttonText` 插槽，支持在输入框按钮中自定义内容而非纯文本 - ([2e8ed3d1a](https://code.byted.org/ad/byted-web-components/commit/2e8ed3d1a)).
- (KsDateRangePicker) 新增 `needConfirm` 属性，启用确认模式，日期选择需要点击"确认"按钮才生效 - ([989b02371](https://code.byted.org/ad/byted-web-components/commit/989b02371)).
- (KsDateRangePicker) 当启用 `needConfirm` 时，新增带有取消和确认按钮的底部操作区 - ([989b02371](https://code.byted.org/ad/byted-web-components/commit/989b02371)).
- (KsModal) 新增 `body-container` 插槽，支持完全自定义模态框主体区域包括滚动行为 - ([350f8796a](https://code.byted.org/ad/byted-web-components/commit/350f8796a)).
- (KsPopover) 添加 `elementContext` 属性用于控制溢出检测上下文，可在 'floating' 和 'reference' 元素之间选择 - ([f9a2588b1](https://code.byted.org/ad/byted-web-components/commit/f9a2588b1)).

### 变更

- (KsModal) 重新组织模态框布局结构，优化头部内边距和关闭按钮定位 - ([350f8796a](https://code.byted.org/ad/byted-web-components/commit/350f8796a)).
- (KsModal) 增强分隔线显示逻辑，当启用 `dividered` 属性时提供平滑的透明度过渡效果 - ([350f8796a](https://code.byted.org/ad/byted-web-components/commit/350f8796a)).
- 更新依赖 - ([7670f1f74](https://code.byted.org/ad/byted-web-components/commit/7670f1f74)).
  - @fe-infra/keystone-icons@0.5.0

### 废弃

- (KsTable) 添加了已弃用的 `deprecatedHideLastBorder` 属性 - 此属性不再需要，将在未来版本中移除 - ([2947373a3](https://code.byted.org/ad/byted-web-components/commit/2947373a3)).

### 修复

- (KsTooltip) 修复箭头定位问题，改为基于提示框边界动态计算位置，而不是使用基于静态位置的定位方式 - ([f9a2588b1](https://code.byted.org/ad/byted-web-components/commit/f9a2588b1)).
- (KsAlertBanner) 修复了 info 变体的图标颜色映射，使用中性色替代错误色 - ([6396ac633](https://code.byted.org/ad/byted-web-components/commit/6396ac633)).
- (KsAlertBanner) 修复了 warning 和 error 变体的错误图标分配 - warning 现在显示警告图标，error 显示注意图标 - ([6396ac633](https://code.byted.org/ad/byted-web-components/commit/6396ac633)).
- (KsGuidance) 修复了 primary、neutral 和 warning 变体的图标颜色，使用适当的语义色替代错误色 - ([6396ac633](https://code.byted.org/ad/byted-web-components/commit/6396ac633)).
- (KsDatePicker) 通过将最大高度和溢出样式移动到共享工具类来修复预设容器滚动问题 - ([6396ac633](https://code.byted.org/ad/byted-web-components/commit/6396ac633)).
- (KsDropdownMenu) 修复了存在搜索时标签页定位问题，添加了适当的边距间距 - ([6396ac633](https://code.byted.org/ad/byted-web-components/commit/6396ac633)).
- (KsCheckbox) 修复了禁用状态继承逻辑，当父组件变为启用状态时保持组件自身的禁用属性 - ([63d007047](https://code.byted.org/ad/byted-web-components/commit/63d007047)).
- (KsFieldsPresenter) 修复了 prefix 颜色样式问题。 - ([4d4929315](https://code.byted.org/ad/byted-web-components/commit/4d4929315)).

## [0.15.15] - 2025-07-15

### 新增

- (KsForm) 添加 `scrollToFirstError` 方法，用于自动滚动到第一个验证错误的字段 - ([4d670a703](https://code.byted.org/ad/byted-web-components/commit/4d670a703)).

### 修复

- (KsCheckbox) 修复了禁用状态继承逻辑，当父组件变为启用状态时保持组件自身的禁用属性 - ([4d670a703](https://code.byted.org/ad/byted-web-components/commit/4d670a703)).

## [0.15.14] - 2025-07-11

### 新增

- (KsDropdownButton) 新增 `overlayHeight` 属性用于控制下拉列表高度，支持字符串、数字或包含 min/max 值的对象 - ([f47b763fc](https://code.byted.org/ad/byted-web-components/commit/f47b763fc)).
- (KsDropdownMenu, KsInputSelector) 新增 `overlayHeight` 属性，用更可预测的高度控制替代启发式高度检测 - ([f47b763fc](https://code.byted.org/ad/byted-web-components/commit/f47b763fc)).

### 废弃

- (KsDropdownMenu, KsInputSelector) 废弃 `listAutoHeight` 属性，建议使用 `overlayHeight="auto"` 以获得更好的灵活性 - ([f47b763fc](https://code.byted.org/ad/byted-web-components/commit/f47b763fc)).

### 修复

- (KsDropdownMenu) 修复下拉菜单高度计算的响应性问题，改进 flex 布局行为 - ([f47b763fc](https://code.byted.org/ad/byted-web-components/commit/f47b763fc)).

## [0.15.13] - 2025-07-11

### 修复

- (KsUploadList) 修复错误消息显示逻辑，仅在存在错误状态且响应消息可用时才显示错误信息 - ([62ac6ce1b](https://code.byted.org/ad/byted-web-components/commit/62ac6ce1b)).
- (KsText) 修复了开启省略号提示时，首次悬停在溢出文本上工具提示不显示的问题 - ([c410e0e94](https://code.byted.org/ad/byted-web-components/commit/c410e0e94)).
- (KsModal, KsToast) 修复了 `toast()` 和 `modal()` 函数在 Vue 2 中的兼容性问题，解决了渲染失败和潜在内存泄漏问题 - ([0b184051b](https://code.byted.org/ad/byted-web-components/commit/0b184051b)).
- (KsDatePicker, KsDateRangePicker, KsMonthRangePicker) 修复工具提示控制，使用直接元素方法替代可见状态以提供更好的弹窗行为一致性 - ([eabb2d142](https://code.byted.org/ad/byted-web-components/commit/eabb2d142)).
- (KsDatePicker, KsDateRangePicker, KsMonthRangePicker) 修复时区计算，返回标准化的日期开始时间以确保日期比较的一致性 - ([eabb2d142](https://code.byted.org/ad/byted-web-components/commit/eabb2d142)).
- (KsRadio) 修复受控模式状态同步问题，防止单选框状态与父组件失去同步 - ([13f70201b](https://code.byted.org/ad/byted-web-components/commit/13f70201b)).
- (KsDropdownMenu) 修复空状态渲染问题，现在仅在激活的标签页中显示而非所有标签页 - ([e0396b35d](https://code.byted.org/ad/byted-web-components/commit/e0396b35d)).
- (KsCascaderColumns) 修复了滚动位置重置逻辑，以正确处理列导航并在级联选择器选项变更时维护滚动状态 - ([a64e23396](https://code.byted.org/ad/byted-web-components/commit/a64e23396)).

## [0.15.12] - 2025-07-09

### 新增

- (KsDatePicker) 为 KsDatePicker 新增 `overridePresets` 属性，方便自定义预设选项 - ([7cacc9165](https://code.byted.org/ad/byted-web-components/commit/7cacc9165)).
- (KsDatePicker) 悬停 KsDatePicker 预设选项时，现在会在日期面板中启用日期预览功能 - ([7cacc9165](https://code.byted.org/ad/byted-web-components/commit/7cacc9165)).

### 变更

- (KsDatePicker) KsDatePicker 中手动设置的时区配置现在优先级高于自动获取的设置 - ([7cacc9165](https://code.byted.org/ad/byted-web-components/commit/7cacc9165)).

## [0.15.11] - 2025-07-09

### 新增

- (KsLoadingContainer) 新增 KsLoadingContainer 组件 - ([816cdde25](https://code.byted.org/ad/byted-web-components/commit/816cdde25)).
- (KsCascader, KsMultipleCascader) 为 KsCascader 和 KsMultipleCascader 新增 `searchValue` 和 `onSearchChange` 属性 - ([8df4eb0f3](https://code.byted.org/ad/byted-web-components/commit/8df4eb0f3)).
- (KsCascader, KsMultipleCascader) 为 KsCascader 和 KsMultipleCascader 新增 `close` 函数 - ([8df4eb0f3](https://code.byted.org/ad/byted-web-components/commit/8df4eb0f3)).

### 修复

- (KsCascader, KsMultipleCascader) 修复 KsCascader 和 KsMultipleCascader 中自定义搜索方法变量的问题 - ([8df4eb0f3](https://code.byted.org/ad/byted-web-components/commit/8df4eb0f3)).
- (所有表单组件) 修复表单中多个异步验证逻辑的问题 - ([dbbe4f098](https://code.byted.org/ad/byted-web-components/commit/dbbe4f098)).
- (Core) 修复 tree-shaking 功能，所有包现在都支持 tree shaking - ([8e381c5fc](https://code.byted.org/ad/byted-web-components/commit/8e381c5fc)).

## [0.15.10] - 2025-07-07

### 修复

- (所有表单组件) 修复表单验证无法获取组件实例的问题 - ([77214667b](https://code.byted.org/ad/byted-web-components/commit/77214667b)).

## [0.15.9] - 2025-07-02

### 新增

- (KsNuxPopover) 为 KsNuxPopover 新增 `autoShift` 功能 - ([353cbf19a](https://code.byted.org/ad/byted-web-components/commit/353cbf19a)).
- (KsDatePicker) 为 EM 和 Brand Ads 新增 datePicker 功能需求 - ([c62699b38](https://code.byted.org/ad/byted-web-components/commit/c62699b38)).

### 变更

- (KsInputSelector) 更改 KsInputSelector 的最大高度限制，以增强与高内容的兼容性 - ([816d2c945](https://code.byted.org/ad/byted-web-components/commit/816d2c945)).
- (KsModal) 确认和取消回调现在可以返回布尔值来控制是否调用关闭方法 - ([7aa802cc3](https://code.byted.org/ad/byted-web-components/commit/7aa802cc3)).

## [0.15.8] - 2025-07-02

### 新增

- (KsNuxPopover) KsNuxPopover 现在支持挂载到 body - ([38d7d9b16](https://code.byted.org/ad/byted-web-components/commit/38d7d9b16)).

## [0.15.5] - 2025-06-27

### 新增

- (KsInputSelector, KsDropdownMenu) 为 KsInputSelector 和 KsDropdownMenu 新增 `loadFailCtas` 和 `loadFailedOptions` 属性 - ([927f59008](https://code.byted.org/ad/byted-web-components/commit/927f59008)).
- (KsDropdownMenu) 为 KsDropdownMenu 新增 `searchResults` 标题 - ([927f59008](https://code.byted.org/ad/byted-web-components/commit/927f59008)).

## [0.15.4] - 2025-06-26

### 新增

- (KsRadioGroup, KsCheckboxGroup) 为 KsRadioGroup 和 KsCheckboxGroup 新增 `gap` 属性 - ([e693e53a5](https://code.byted.org/ad/byted-web-components/commit/e693e53a5)).
- (KsSearch) 为 KsSearch 新增 `onCategoryChange` 事件 - ([7a213727e](https://code.byted.org/ad/byted-web-components/commit/7a213727e)).
- (KsDropdownMenu) 为 KsDropdownMenu 新增 `loadFail` 属性 - ([7a213727e](https://code.byted.org/ad/byted-web-components/commit/7a213727e)).
- (KsInputSelector) 为 KsInputSelector 新增 `loadFail` 属性 - ([7a213727e](https://code.byted.org/ad/byted-web-components/commit/7a213727e)).
- (KsDropdownMenuButton) 为 KsDropdownMenuButton 新增 `renderContent` 支持 - ([7a213727e](https://code.byted.org/ad/byted-web-components/commit/7a213727e)).
- (KsMultipleCascader) 为 KsMultipleCascader 新增 `selectable` 设置为 false 的支持 - ([7a213727e](https://code.byted.org/ad/byted-web-components/commit/7a213727e)).
- (KsMultipleInput) 新增 KsMultipleInput 组件 - ([7a213727e](https://code.byted.org/ad/byted-web-components/commit/7a213727e)).
- (KsCascaderColumns) 新增 KsCascaderColumns 组件 - ([7a213727e](https://code.byted.org/ad/byted-web-components/commit/7a213727e)).

### 修复

- (KsSearch) 修复 KsSearch 中下拉选择行为的问题 - ([7a213727e](https://code.byted.org/ad/byted-web-components/commit/7a213727e)).
- (KsFieldPresenter) 修复 KsFieldPresenter 中清除功能的问题 - ([7a213727e](https://code.byted.org/ad/byted-web-components/commit/7a213727e)).
- (KsCarousel) 修复 KsCarousel 启用无限循环时的空白闪烁问题 - ([ccc17c62f](https://code.byted.org/ad/byted-web-components/commit/ccc17c62f)).

## [0.15.2] - 2025-06-24

### 变更

- (KsTable) 将 KsTable 行内容默认改为垂直居中对齐 - ([bae285cb3](https://code.byted.org/ad/byted-web-components/commit/bae285cb3)).

### 修复

- (KsTable) 修复 KsTable 中全选状态同步的问题 - ([bae285cb3](https://code.byted.org/ad/byted-web-components/commit/bae285cb3)).
- (所有表单组件) 修复表单数据被初始值监听器覆写的问题 - ([275ed1ed4](https://code.byted.org/ad/byted-web-components/commit/275ed1ed4)).

## [0.15.1] - 2025-06-20

### 新增

- (KsToast) 新增将自定义组件作为内容传递给 toast 通知的支持 - ([7bca75c0e](https://code.byted.org/ad/byted-web-components/commit/7bca75c0e)).
- (KsModal) 新增将自定义组件作为内容传递给模态对话框的支持 - ([7bca75c0e](https://code.byted.org/ad/byted-web-components/commit/7bca75c0e)).
- (KsInputSelector) 为 KsInputSelector 新增 `open` 和 `close` 函数来控制下拉状态 - ([23b101562](https://code.byted.org/ad/byted-web-components/commit/23b101562)).
- (所有表单组件) 为表单项验证器新增熔断功能 - ([16a240fd7](https://code.byted.org/ad/byted-web-components/commit/16a240fd7)).

### 修复

- (所有表单组件) 修复表单项验证器的默认消息 - ([16a240fd7](https://code.byted.org/ad/byted-web-components/commit/16a240fd7)).
- (所有表单组件) 修复表单项中验证逻辑的失焦触发问题 - ([16a240fd7](https://code.byted.org/ad/byted-web-components/commit/16a240fd7)).
- (KsTable) 修复 KsTable 在 dataSource 更改后触发无效 `onRowSelect` 事件的问题 - ([a545be39b](https://code.byted.org/ad/byted-web-components/commit/a545be39b)).

## [0.15.0] - 2025-06-17

### 变更

- (KsScrollBar) 采用现代浏览器设计的原生滚动条 - ([800427074](https://code.byted.org/ad/byted-web-components/commit/800427074)).

## [0.14.4] - 2025-06-17

### 新增

- (KsChip) 新增 KsChip 组件 - ([2686e2734](https://code.byted.org/ad/byted-web-components/commit/2686e2734)).
- (KsCrop) 新增 KsCrop 组件 - ([10daf7645](https://code.byted.org/ad/byted-web-components/commit/10daf7645)).
- (KsTooltip) 为 KsTooltip 新增 `deprecatedDisableTopLayer` 属性 - ([ac27e36a3](https://code.byted.org/ad/byted-web-components/commit/ac27e36a3)).
- (Dropdown) 为下拉搜索新增自动聚焦功能 - ([ac27e36a3](https://code.byted.org/ad/byted-web-components/commit/ac27e36a3)).
- (KsSwitch) 为 KsSwitch 新增 `title` 插槽 - ([6ccb95935](https://code.byted.org/ad/byted-web-components/commit/6ccb95935)).
- (KsSwitch) 为 KsSwitch 新增 `labelPosition` 属性 - ([6ccb95935](https://code.byted.org/ad/byted-web-components/commit/6ccb95935)).
- (KsNuxPopover) 为 KsNuxPopover 新增 `preventInteraction` 属性 - ([6ccb95935](https://code.byted.org/ad/byted-web-components/commit/6ccb95935)).
- (KsInput) 为 KsInput 新增聚焦时的 `showClearBtn` 功能 - ([6ccb95935](https://code.byted.org/ad/byted-web-components/commit/6ccb95935)).
- (KsButtonGroup) 新增 KsButtonGroup 组件 - ([6ccb95935](https://code.byted.org/ad/byted-web-components/commit/6ccb95935)).

### 变更

- (KsDropdownMenu) 将 KsDropdownMenu 的描述最大行数更改为 2 行 - ([6ccb95935](https://code.byted.org/ad/byted-web-components/commit/6ccb95935)).

### 移除

- (KsInputSelector) 移除 KsInputSelector 的状态图标 - ([6ccb95935](https://code.byted.org/ad/byted-web-components/commit/6ccb95935)).

### 修复

- (KsSegmentedControl) 修复 KsSegmentedControl 中已选中项之间分隔线的可见性问题 - ([d2131bed7](https://code.byted.org/ad/byted-web-components/commit/d2131bed7)).

## [0.14.3] - 2025-06-16

### 新增

- (KsMonthRangePicker) 新增 KsMonthRangePicker 组件 - ([9c2b2cadf](https://code.byted.org/ad/byted-web-components/commit/9c2b2cadf)).

## [0.14.2] - 2025-06-12

### 修复

- (KsDropdownMenu) 使 KsDropdownMenu 高度保持稳定 - ([745cbe271](https://code.byted.org/ad/byted-web-components/commit/745cbe271)).

## [0.14.1] - 2025-06-11

### 变更

- (KsModal) 恢复 KsModal 中控制模式的更改 - ([5f1733995](https://code.byted.org/ad/byted-web-components/commit/5f1733995)).

## [0.14.0] - 2025-06-11

### 新增

- (KsCheckboxGroup) 为 KsCheckboxGroup 新增上下文支持 - ([68cd43063](https://code.byted.org/ad/byted-web-components/commit/68cd43063)).

### 变更

- (KsSegmentedControl) **[重大变更]** 将 KsSegmentedControl 的 `value` 类型从 `string[]` 更改为 `string | number` - ([c2ad3f776](https://code.byted.org/ad/byted-web-components/commit/c2ad3f776)).

### 修复

- (KsCascader) 修复 KsCascader 在使用自定义 key 属性时不工作的问题 - ([31bbd7a03](https://code.byted.org/ad/byted-web-components/commit/31bbd7a03)).
- (KsGuidance) 修复 KsGuidance 中初始 `show` 属性设置为 false 时不工作的问题 - ([9c14deb45](https://code.byted.org/ad/byted-web-components/commit/9c14deb45)).
- (KsTable) 修复 KsTable 中重新排序列后自定义渲染内容消失或显示错误的问题 - ([1921bfbe4](https://code.byted.org/ad/byted-web-components/commit/1921bfbe4)).

## [0.13.4] - 2025-06-09

### 新增

- (KsDrawer) 为 KsDrawer 新增 `disableTopLayer` 属性 - ([005eb4095](https://code.byted.org/ad/byted-web-components/commit/005eb4095)).

### 变更

- (KsDrawer) 允许在 KsDrawer 处于活动状态时进行交互 - ([ac610b2ee](https://code.byted.org/ad/byted-web-components/commit/ac610b2ee)).

## [0.13.3] - 2025-06-06

### 变更

- (KsModal) 禁用 KsModal 处于活动状态时的滚动 - ([00a996b84](https://code.byted.org/ad/byted-web-components/commit/00a996b84)).

## [0.13.2] - 2025-06-06

### 新增

- (KsGuidance) 为 KsGuidance 新增 `secondaryLink` 和 `compact` 属性的支持 - ([577e4f3ef](https://code.byted.org/ad/byted-web-components/commit/577e4f3ef)).

## [0.13.1] - 2025-06-05

### 新增

- (KsButton) 为 KsButton 组件新增 `alert` 变体 - ([afa49ffb0](https://code.byted.org/ad/byted-web-components/commit/afa49ffb0)).
- (KsDropUpload) 为 KsDropUpload 组件新增替换图标的能力 - ([afa49ffb0](https://code.byted.org/ad/byted-web-components/commit/afa49ffb0)).
- (KsDropUpload) 为 KsDropUpload 组件新增隐藏说明的选项 - ([afa49ffb0](https://code.byted.org/ad/byted-web-components/commit/afa49ffb0)).
- (KsDropUpload) 为 KsDropUpload 组件新增 `width` 参数以防止水平收缩 - ([afa49ffb0](https://code.byted.org/ad/byted-web-components/commit/afa49ffb0)).
- (KsDropUpload, KsIconUpload) 为 KsDropUpload 和 KsIconUpload 组件新增 `description` 属性 - ([afa49ffb0](https://code.byted.org/ad/byted-web-components/commit/afa49ffb0)).
- (KsLink) 为 KsLink 组件新增 `neutralHigh` 变体 - ([afa49ffb0](https://code.byted.org/ad/byted-web-components/commit/afa49ffb0)).
- (KsTooltip) 为 KsTooltip 新增 `onOutClick` 事件 - ([5498f6ac9](https://code.byted.org/ad/byted-web-components/commit/5498f6ac9)).

### 修复

- (KsUpload) 修复当 `onRemove` 未定义时无法删除已上传文件的问题 - ([afa49ffb0](https://code.byted.org/ad/byted-web-components/commit/afa49ffb0)).

## [0.13.0] - 2025-06-04

### 新增

- (KsInputNumber) 为 KsInputNumber 新增 `showControls` 属性 - ([da196db19](https://code.byted.org/ad/byted-web-components/commit/da196db19)).
- (KsQuarterPicker) 新增 KsQuarterPicker 组件 - ([68a443110](https://code.byted.org/ad/byted-web-components/commit/68a443110)).
- (KsNuxPopover) 为 KsNuxPopover 新增 `content` 插槽 - ([416c45bb7](https://code.byted.org/ad/byted-web-components/commit/416c45bb7)).
- (KsTag) 为 KsTag 新增 `icon` 插槽 - ([97000dcfa](https://code.byted.org/ad/byted-web-components/commit/97000dcfa)).
- (KsThumbnail) 为 KsThumbnail 新增 `onAction` 事件 - ([97000dcfa](https://code.byted.org/ad/byted-web-components/commit/97000dcfa)).
- (KsAvatar) 为 KsAvatar 新增禁用状态支持 - ([97000dcfa](https://code.byted.org/ad/byted-web-components/commit/97000dcfa)).

### 移除

- (KsSideNavigation) **[重大变更]** 移除 KsSideNavigation 的 `defaultOpeneds` 属性，功能已迁移到 KsSubMenu 的 `defaultExpanded` 和 `expanded` 属性 - ([b24ca964b](https://code.byted.org/ad/byted-web-components/commit/b24ca964b)).
- (KsSubMenu) **[重大变更]** 移除 KsSubMenu 的 `showBadge` 和 `tagText` 属性，重构为更灵活的 `prefix` 和 `suffix` 插槽 - ([b24ca964b](https://code.byted.org/ad/byted-web-components/commit/b24ca964b)).

### 修复

- (KsSideNavigation) 修复设置 KsSideNavigation 的 `title` 属性无效的问题 - ([b24ca964b](https://code.byted.org/ad/byted-web-components/commit/b24ca964b)).
- (KsPagination) 修复 KsPagination 组件中 `renderTotal` 属性的类型错误 - ([38fc44215](https://code.byted.org/ad/byted-web-components/commit/38fc44215)).

## [0.12.17] - 2025-05-30

### 新增

- (KsTable) 为 KsTable 新增单列排序支持 - ([3617da1ad](https://code.byted.org/ad/byted-web-components/commit/3617da1ad)).
- (KsCascader) 为 KsCascader 新增带高亮样式的标签搜索支持 - ([c377a6f1a](https://code.byted.org/ad/byted-web-components/commit/c377a6f1a)).
- (KsCascader) 为 KsCascader 的标签新增省略号提示支持 - ([c377a6f1a](https://code.byted.org/ad/byted-web-components/commit/c377a6f1a)).
- (KsDropdownButton) 为 KsDropdownButton 新增 `shape` 属性支持 - ([c377a6f1a](https://code.byted.org/ad/byted-web-components/commit/c377a6f1a)).
- (KsFieldPresenter) 为 KsFieldPresenter 新增省略号提示支持 - ([c377a6f1a](https://code.byted.org/ad/byted-web-components/commit/c377a6f1a)).

### 修复

- (KsTooltip) 修复 KsTooltip 中自动计算位置功能的问题 - ([c377a6f1a](https://code.byted.org/ad/byted-web-components/commit/c377a6f1a)).

## [0.12.16] - 2025-05-29

### 修复

- (KsDropdownMenu) 修复 KsDropdownMenu 单选后的自动关闭行为 - ([c08f0c228](https://code.byted.org/ad/byted-web-components/commit/c08f0c228)).

## [0.12.13] - 2025-05-27

### 新增

- (KsDropdownMenu) 为 KsDropdownMenu 的分组标题新增头像支持 - ([50acd1263](https://code.byted.org/ad/byted-web-components/commit/50acd1263)).

## [0.12.12] - 2025-05-23

### 新增

- (KsTable) 为 KsTable 新增单列排序支持 - ([c99b4c19d](https://code.byted.org/ad/byted-web-components/commit/c99b4c19d)).
- (所有组件) 集成 TikTok Sans 字体资源 - ([8b663df47](https://code.byted.org/ad/byted-web-components/commit/8b663df47)).

### 修复

- (KsTreeView) 修复 KsTreeView 项目标签的自动省略功能 - ([6ef166aa2](https://code.byted.org/ad/byted-web-components/commit/6ef166aa2)).

## [0.12.10] - 2025-05-20

### 新增

- (KsInput, KsSearch) 为 KsInput 和 KsSearch 组件的值变更跟踪事件新增节流 - ([27704edcd](https://code.byted.org/ad/byted-web-components/commit/27704edcd)).

### 移除

- (KsInputPassword) 移除 KsInputPassword 组件中值变更事件的跟踪点 - ([27704edcd](https://code.byted.org/ad/byted-web-components/commit/27704edcd)).

## [0.12.8] - 2025-05-16

### 修复

- (KsDateRangePicker) 修复日期范围选择器 getDaysPreset 函数中的时区处理 - ([77231dccf](https://code.byted.org/ad/byted-web-components/commit/77231dccf)).
- (KsDropdownMenu) 修复 KsDropdownMenu 中 `dataSource` 更改时标签页不更新的问题 - ([0bb4c4eae](https://code.byted.org/ad/byted-web-components/commit/0bb4c4eae)).

## [0.12.7] - 2025-05-16

### 修复

- (KsDropdownMenu) 修复 KsDropdownMenu 搜索后滚动条位置重置的问题 - ([ffdd172e1](https://code.byted.org/ad/byted-web-components/commit/ffdd172e1)).

## [0.12.6] - 2025-05-15

### 修复

- (KsPagination) 修复 KsPagination 中页码超过 3 位数时的样式问题 - ([e8e088d3b](https://code.byted.org/ad/byted-web-components/commit/e8e088d3b)).
- (所有可滚动组件) 修复 `onReachBottom` 和 `renderContent` 的错误触发行为 - ([381fb8542](https://code.byted.org/ad/byted-web-components/commit/381fb8542)).

## [0.12.5] - 2025-05-13

### 新增

- (KsDateRangePicker) 为 KsDateRangePicker 新增额外快捷选项的支持 - ([d81164d51](https://code.byted.org/ad/byted-web-components/commit/d81164d51)).
- (KsDateRangePicker) 为 KsDateRangePicker 的 `disableDate` 属性新增当前选中日期参数 - ([054075167](https://code.byted.org/ad/byted-web-components/commit/054075167)).

## [0.12.4] - 2025-05-12

### 修复

- (Core) 修复 popover-polyfill 打包配置以保持副作用 - ([2966a87c9](https://code.byted.org/ad/byted-web-components/commit/2966a87c9)).

## [0.12.3] - 2025-05-09

### 移除

- (KsMultipleCascader) 移除 KsMultipleCascader 的最大宽度限制 - ([67e013c87](https://code.byted.org/ad/byted-web-components/commit/67e013c87)).

### 修复

- (KsTooltip) 修复 KsTooltip 中 `startOffset` 属性的功能 - ([f435e4463](https://code.byted.org/ad/byted-web-components/commit/f435e4463)).

## [0.12.1] - 2025-05-08

### 新增

- (所有组件) 为所有组件新增内置 `data-testid` 属性支持，用于 E2E 测试 - ([8d7bb3a3c](https://code.byted.org/ad/byted-web-components/commit/8d7bb3a3c)).

## [0.12.0] - 2025-05-07

### 新增

- (所有组件) 新增内置跟踪报告功能，可与 `@tt4b/platform-tracking-sdk` 无缝集成 - ([a14ee9062](https://code.byted.org/ad/byted-web-components/commit/a14ee9062)).
- (KsDropdownMenu) 为 KsDropdownMenu 新增 `listAutoHeight` 属性支持 - ([b0eb4dc83](https://code.byted.org/ad/byted-web-components/commit/b0eb4dc83)).

## [0.11.14] - 2025-05-07

### 变更

- (KsInputSelector) 仅在存在 `loadMore` 功能时限制 KsInputSelector 高度 - ([c0962f575](https://code.byted.org/ad/byted-web-components/commit/c0962f575)).

## [0.11.13] - 2025-04-30

### 修复

- (KsDrawer, KsModal) 修复在抽屉内触发和关闭模态对话框时也会关闭抽屉的问题 - ([ddf18cf28](https://code.byted.org/ad/byted-web-components/commit/ddf18cf28)).

## [0.11.12] - 2025-04-30

### 新增

- (KsSideNavigation) 为 KsSideNavigation 新增标签支持 - ([ba01463fd](https://code.byted.org/ad/byted-web-components/commit/ba01463fd)).
- (KsSwitch) 为 KsSwitch 新增标签支持 - ([ba01463fd](https://code.byted.org/ad/byted-web-components/commit/ba01463fd)).
- (KsSlider) 为滑块控制器新增标签支持 - ([ba01463fd](https://code.byted.org/ad/byted-web-components/commit/ba01463fd)).
- (KsProgress) 为进度条组件新增警告状态支持 - ([ba01463fd](https://code.byted.org/ad/byted-web-components/commit/ba01463fd)).

### 修复

- (KsInputSelector) 修复选择器最大高度以确保 `loadMore` 功能正常工作 - ([baf48ace2](https://code.byted.org/ad/byted-web-components/commit/baf48ace2)).

## [0.11.11] - 2025-04-29

### 修复

- (KsDropdownMenu) 修复 KsDropdownMenu 在切换标签页后的 scrollTop 重置行为 - ([12041cb08](https://code.byted.org/ad/byted-web-components/commit/12041cb08)).

## [0.11.10] - 2025-04-29

### 修复

- (KsDatePicker, KsDropdownMenu) 修复 KsDatePicker 中的时区支持和 KsDropdownMenu 中的高度扩展 - ([6a0d224cb](https://code.byted.org/ad/byted-web-components/commit/6a0d224cb)).

## [0.11.9] - 2025-04-28

### 新增

- (KsTag) 为 KsTag 新增最大宽度 - ([2f50c0bac](https://code.byted.org/ad/byted-web-components/commit/2f50c0bac)).

### 修复

- (KsTag) 修复 KsTag 中的文本溢出行为 - ([2f50c0bac](https://code.byted.org/ad/byted-web-components/commit/2f50c0bac)).

## [0.11.8] - 2025-04-27

### 新增

- (KsTreeView) 为 KsTreeView 新增 `expandedKeys` 控制功能 - ([51e02a607](https://code.byted.org/ad/byted-web-components/commit/51e02a607)).

## [0.11.7] - 2025-04-25

### 新增

- (KsGuidance) 为 KsGuidance 新增内部展开和折叠函数 - ([59b6714af](https://code.byted.org/ad/byted-web-components/commit/59b6714af)).

## [0.11.5] - 2025-04-24

### 新增

- (KsRadio) 为 KsRadio 新增 `content` 插槽，用于显示功能组件而不触发单选点击 - ([7ffb6daea](https://code.byted.org/ad/byted-web-components/commit/7ffb6daea)).

## [0.11.4] - 2025-04-24

### 新增

- (KsThumbnail) 为 KsThumbnail 新增块状态和比例支持 - ([66c3c3119](https://code.byted.org/ad/byted-web-components/commit/66c3c3119)).

### 变更

- (KsSpace) 改进 KsSpace 的紧凑样式以支持内部包装项 - ([a407adff1](https://code.byted.org/ad/byted-web-components/commit/a407adff1)).

### 移除

- (KsStatusMessage) **[重大变更]** 移除 KsStatusMessage 的 `size` 属性 - ([258434cb2](https://code.byted.org/ad/byted-web-components/commit/258434cb2)).

### 修复

- (KsDropdownMenu) 修复 KsDropdownMenu 刷新 dataSource 时的滚动条位置问题 - ([2f0f8fbaa](https://code.byted.org/ad/byted-web-components/commit/2f0f8fbaa)).
- (KsDropdownMenu) 修复启用虚拟滚动与动态插槽渲染时的异常行为 - ([175354e72](https://code.byted.org/ad/byted-web-components/commit/175354e72)).

## [0.11.3] - 2025-04-23

### 修复

- (KsCascader) 修复 KsCascader 中 singleActiveItem 功能 - ([306577d07](https://code.byted.org/ad/byted-web-components/commit/306577d07)).

## [0.11.2] - 2025-04-23

### 修复

- (所有输入组件) 修复所有输入组件中中文输入的组合事件处理 - ([82c56552b](https://code.byted.org/ad/byted-web-components/commit/82c56552b)).

## [0.11.1] - 2025-04-23

### 新增

- (KsAssetTile) 为 KsAssetTile 新增 `play` 插槽 - ([214c8bc5e](https://code.byted.org/ad/byted-web-components/commit/214c8bc5e)).
- (KsThumbnail) 为 KsThumbnail 新增块状态和比例支持 - ([214c8bc5e](https://code.byted.org/ad/byted-web-components/commit/214c8bc5e)).

# @fe-infra/keystone-design-tokens

## [2.0.20] - 2026-01-13

### 变更

- (KsButtonGroupItem) 将背景色更新为使用`--ks-color-neutral-surface`， hover状态文本色更新为`--ks-color-neutral-highOnSurfaceHover`，禁用状态背景色更新为`--ks-color-neutral-surface` - ([fb01aa2c5](https://code.byted.org/ad/byted-web-components/commit/fb01aa2c5)).
- (KsButtonGroup) 将背景色更新为使用`--ks-color-neutral-surface` - ([fb01aa2c5](https://code.byted.org/ad/byted-web-components/commit/fb01aa2c5)).
- (KsButton) 在生成的颜色样式中添加缺失的颜色令牌后缀（`highOnSurfaceHover`、`highOnSurfaceActive`），将hover状态文本色更新为`--ks-color-neutral-highOnSurfaceHover`，将激活状态文本色更新为`--ks-color-neutral-highOnSurfaceActive` - ([fb01aa2c5](https://code.byted.org/ad/byted-web-components/commit/fb01aa2c5)).
- (KsValueField) 在文本变体的输入框和标签元素中添加`--ks-color-neutral-highOnSurface`颜色 - ([fb01aa2c5](https://code.byted.org/ad/byted-web-components/commit/fb01aa2c5)).

## [2.0.19] - 2025-11-19

### Patch Changes

- 10daf7645: ks-tile、ks-avatar、ks-asset-tile's 1.0.8 version style update
- 10daf7645: Add a new component named crop"

## 2.0.15

- ba01463fd: 1.0.5 update, update search、tab、switch、progress、dropdown-menu、side-navigation and slider

## 2.0.14

- 22f210257: fix the input's clear icon disabled status

## 2.0.13

- 51e02a607: add expandedKeys control to tree-view

## 2.0.12

- 7ffb6daea: add content slot for radio to show function component not trigger radio click

## 2.0.11

- 258434cb2: fix status-indicator、pagination's style

## 2.0.10

- 9f1632b43: add loading state for dropdown
- a7e6530ce: fix the empty-states's style

## 2.0.9

- 75b57e385: fix the spinner's lg size

## 2.0.8

- 7f9730cc1: fix the tile horizontal mode selection's position

## 2.0.7

- 5d49cb4e3: fix the segemented selection's style

## 2.0.6

- 38d96b61b: fix: supplement neutral overlay color tokens

## 2.0.5

- 537764b4a: chore: fix pnpm lock

## 2.0.4

- 4ed8aabe7: fix: color token values update

## 2.0.3

- 6f41bd564: Update design token `--ks-border-radius-full`

## 2.0.2

- 823d82587: chore: fix stale pnpm lock file

## 2.0.1

- 2f4977cc4: fix: supplement ks-text theme and fix wrong text token

## 2.0.0

- 80356147f: chore: design-tokens verified in prod environment and publish stable v2.0.0 with migration guide
  fix: design-tokens postinstall script error in old node versions

## [2.0.18] - 2025-09-19

### 变更

- (Core) 改善在老版本的 iPadOS Safari 16.4 上的兼容性 - ([f10bf6c83](https://code.byted.org/ad/byted-web-components/commit/f10bf6c83)).

## [2.0.17] - 2025-07-18

### 新增

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

### 变更

- (KsAssetTile) **[BREAKING]** 移除 `playable` 属性和 `ksPlay` 事件 - ([011709718](https://code.byted.org/ad/byted-web-components/commit/011709718)).
- (KsAssetTile) **[BREAKING]** 移除 `badge` 数 - ([011709718](https://code.byted.org/ad/byted-web-components/commit/011709718)).

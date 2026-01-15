# @fe-infra/keystone-design-tokens

## [2.0.20] - 2026-01-13

### Changed

- (KsButtonGroupItem) Updated background color to use `--ks-color-neutral-surface`, hover text color to `--ks-color-neutral-highOnSurfaceHover`, and disabled state background color to `--ks-color-neutral-surface` - ([fb01aa2c5](https://code.byted.org/ad/byted-web-components/commit/fb01aa2c5)).
- (KsButtonGroup) Updated background color to use `--ks-color-neutral-surface` - ([fb01aa2c5](https://code.byted.org/ad/byted-web-components/commit/fb01aa2c5)).
- (KsButton) Added missing color token suffixes (`highOnSurfaceHover`, `highOnSurfaceActive`) to generated color styles, updated hover text color to `--ks-color-neutral-highOnSurfaceHover`, and active state text color to `--ks-color-neutral-highOnSurfaceActive` - ([fb01aa2c5](https://code.byted.org/ad/byted-web-components/commit/fb01aa2c5)).
- (KsValueField) Added `--ks-color-neutral-highOnSurface` color to input and label elements in the texted variant - ([fb01aa2c5](https://code.byted.org/ad/byted-web-components/commit/fb01aa2c5)).

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

### Changed

- (Core) Improve compatibility for legacy iPadOS Safari 16.4 - ([f10bf6c83](https://code.byted.org/ad/byted-web-components/commit/f10bf6c83)).

## [2.0.17] - 2025-07-18

### Added

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

### Changed

- (KsAssetTile) **[BREAKING]** Removed `playable` prop and `ksPlay` event - ([011709718](https://code.byted.org/ad/byted-web-components/commit/011709718)).
- (KsAssetTile) **[BREAKING]** Removed `badge` array prop, replaced with single `badge` string prop - ([011709718](https://code.byted.org/ad/byted-web-components/commit/011709718)).
- (KsAssetTile) **[BREAKING]** Removed `title` prop, replaced with `assetTileContent.title` - ([011709718](https://code.byted.org/ad/byted-web-components/commit/011709718)).
- (KsAssetTile) **[BREAKING]** Removed `action` slot, replaced with dedicated action props and built-in buttons - ([011709718](https://code.byted.org/ad/byted-web-components/commit/011709718)).
- (KsAssetTile) **[BREAKING]** Changed `ksAction` event to emit action type or dropdown item instead of void - ([011709718](https://code.byted.org/ad/byted-web-components/commit/011709718)).

### Fixed

- (KsAssetTile) Fixed disabled state styling for badges and overlays - ([011709718](https://code.byted.org/ad/byted-web-components/commit/011709718)).

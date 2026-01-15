# @fe-infra/keystone-locales

## [0.5.0] - 2025-07-25

### Added

- Added logic to automatically set the default locale from the `lang_type` cookie, the common GMPT practice. This largely eliminates the need for manual multilingual configuration - ([6e5d65ad9](https://code.byted.org/ad/byted-web-components/commit/6e5d65ad9)).

### Changed

- Refactored localization system to use built-in locale files with less than 16KB in size and tree-shaking support - ([6e5d65ad9](https://code.byted.org/ad/byted-web-components/commit/6e5d65ad9)).
- Changed locale configuration to accept locale codes (e.g., 'en', 'zh') instead of the original complicated locale config objects - ([6e5d65ad9](https://code.byted.org/ad/byted-web-components/commit/6e5d65ad9)).


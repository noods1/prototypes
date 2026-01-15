# @fe-infra/keystone-locales

## [0.5.0] - 2025-07-25

### 新增

- 添加从 GMPT 普遍的 `lang_type` Cookie 自动检测设置默认 locale 的逻辑，绝大多数场景下不再需要手动配置多语言 - ([6e5d65ad9](https://code.byted.org/ad/byted-web-components/commit/6e5d65ad9)).

### 变更

- 重构本地化系统，使用不超过 16KB 的体积内置了多语言包，支持 tree-shaking - ([6e5d65ad9](https://code.byted.org/ad/byted-web-components/commit/6e5d65ad9)).
- 语言配置改为接受语言代码（如 'en'、'zh'）而非原复杂配置对象 - ([6e5d65ad9](https://code.byted.org/ad/byted-web-components/commit/6e5d65ad9)).


# @fe-infra/keystone-icons-vue

`@fe-infra/keystone-icons-vue` is a Vue specific implementation of the Keystone Icons library, built using Stencil.js. This package provides a collection of customizable icons as Vue components, allowing seamless integration into your Vue applications.

> **Note: This package is only compatible with Vue 3.x. It does not support Vue 2.**

## Installation

You can install `@fe-infra/keystone-icons-vue` using package managers:

```bash
npm install @fe-infra/keystone-icons-vue
```

or

```bash
yarn add @fe-infra/keystone-icons-vue
```

or

```bash
pnpm add @fe-infra/keystone-icons-vue
```

## Usage

### Basic Usage

To use an icon from the library, import the desired icon component and use it in your Vue template:

```javascript
<template>
  <KsIconHome />
</template>

<script>
import { defineComponent } from 'vue';
import { KsIconHome } from '@fe-infra/keystone-icons-vue';

export default defineComponent({
  components: {
    KsIconHome
  }
});
</script>
```

### Customizing Icons

You can customize the appearance of the icons using props:

```javascript
<template>
  <KsIconHome :size="24" color="#007bff" />
</template>

<script>
import { defineComponent } from 'vue';
import { KsIconHome } from '@fe-infra/keystone-icons-vue';

export default defineComponent({
  components: {
    KsIconHome
  }
});
</script>
```

#### Available Attributes

- **size**: Sets the width and height of the icon (default: 24)
- **color**: Sets the color of the icon (default: currentColor)

### Usage with Composition API

Leverage Vue 3's Composition API for more flexible component logic:

```javascript
<template>
  <KsIconHome :size="iconSize" :color="iconColor" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { KsIconHome } from '@fe-infra/keystone-icons-vue';

export default defineComponent({
  components: {
    KsIconHome
  },
  setup() {
    const iconSize = ref(24);
    const iconColor = ref('#007bff');

    return {
      iconSize,
      iconColor
    };
  }
});
</script>
```

## License

`@fe-infra/keystone-icons-vue` is released under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Support

If you encounter any issues or have questions about `@fe-infra/keystone-icons-vue`, please file an issue on our [Codebase repository](https://code.byted.org/ad/byted-web-components/issues) or join our [Lark group chat](https://applink.larkoffice.com/client/chat/chatter/add_by_link?link_token=d2fj9cdd-181d-4454-9d61-d7c4c7i7f7l8).

## Acknowledgements

`@fe-infra/keystone-icons-vue` is built with Stencil.js, a powerful toolchain for building reusable, scalable web components.

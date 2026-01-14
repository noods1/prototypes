/**
 * Design Tokens
 * Using official Keystone Design Tokens from @fe-infra/keystone-design-tokens
 */

import { ks } from '@fe-infra/keystone-design-tokens';

// Re-export the official tokens for convenience
export { ks };

// Use the official Keystone tokens
// The `ks` object contains all design tokens with CSS variable references
// For backward compatibility, we'll use `ks` directly as `tokens`
export const tokens = ks;

// Legacy export for backward compatibility
export const designTokens = ks;

// Note: CSS variables are now provided by @fe-infra/keystone-design-tokens/index.css
// All CSS variables are automatically available via the imported CSS files


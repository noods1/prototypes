/**
 * Design Tokens
 * Fallback design tokens (keystone-design-tokens package not available in build)
 */

// Fallback design tokens object with minimal structure to prevent runtime errors
const ks = {
  color: {
    neutral: {
      surface1: 'var(--color-neutral-surface1, #ffffff)',
      surface: 'var(--color-neutral-surface, #f5f5f5)',
      fillLow: 'var(--color-neutral-fillLow, #e0e0e0)',
      onSurface: 'var(--color-neutral-onSurface, #000000)',
      highOnSurface: 'var(--color-neutral-highOnSurface, #333333)',
    },
    primary: {
      fill: 'var(--color-primary-fill, #0066cc)',
    },
  },
} as any;

// Re-export the tokens for convenience
export { ks };

// Use the fallback tokens
// The `ks` object contains all design tokens with CSS variable references
// For backward compatibility, we'll use `ks` directly as `tokens`
export const tokens = ks;

// Legacy export for backward compatibility
export const designTokens = ks;

// Note: CSS variables should be provided by the app's own CSS files


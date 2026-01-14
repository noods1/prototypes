/**
 * Design Tokens
 * Keystone Design Tokens for spacing, colors, and components
 */

// Spacing tokens
export const spacing = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  9: '36px',
  10: '40px',
  12: '48px',
  14: '56px',
  16: '64px',
  18: '72px',
  20: '80px',
  22: '88px',
  24: '96px',
  // Legacy spacing aliases
  '0-5': '2px',
  100: '4px',
  200: '8px',
  '2-5': '10px',
  300: '12px',
  400: '16px',
  600: '24px',
  1000: '40px',
} as const;

// Color tokens
export const colors = {
  // Primary Colors
  primary: {
    surface: '#ffffff',
    surface1: '#f2fdfc',
    surface2: '#e8fbf9',
    surface3: '#d7f2f0',
    fill: '#009995',
    fillLow: '#9ee1dd',
    onSurface: '#017976',
    onFill: '#ffffff',
    onFillLow: '#002c2b',
  },
  // Neutral Colors
  neutral: {
    surface: '#ffffff',
    surface1: '#F8F8F9',
    surface2: '#F1F2F2',
    surface3: '#ECECED',
    surface4: '#D3D4D5',
    surface5: '#B9BBBC',
    onSurface: '#6D6E70',
    onSurface2: '#4F5052',
    onSurface3: '#262627',
    onSurface4: '#121415',
    highOnSurface: '#121415',
    fill: '#87898B',
    fillLow: '#D3D4D5',
    fillHigh: '#262627',
    onFill: '#ffffff',
    onFillLow: '#262627',
    transparentFill: 'rgba(18, 20, 21, 0)',
  },
  // Success Colors
  success: {
    fill: '#2a9c49',
    fillLow: '#99e4a2',
    onFill: '#ffffff',
    onFillLow: '#052d0f',
    onSurface: '#057e33',
    surface1: '#effff0',
    surface2: '#e7fde8',
    surface3: '#ddf9df',
  },
  // Warning Colors
  warning: {
    fill: '#d2a106',
    fillLow: '#fad253',
    onFill: '#ffffff',
    onFillLow: '#342209',
    onSurface: '#8d670b',
    surface1: '#fffbec',
    surface2: '#fdf5da',
    surface3: '#fbebbc',
  },
  // Error Colors
  error: {
    fill: '#ef504b',
    fillLow: '#ffc6bd',
    onFill: '#ffffff',
    onFillLow: '#4e0c0b',
    onSurface: '#ca242e',
    surface1: '#fff9f8',
    surface2: '#fff2f0',
    surface3: '#ffe7e3',
  },
  // Support Colors
  support: {
    surface: '#ffffff',
    surface1: '#fbfaff',
    surface2: '#f5f4ff',
    surface3: '#e9ebff',
    fill: '#8078f6',
    fillLow: '#cdcfff',
    onFill: '#ffffff',
    onFillLow: '#221f4b',
    onSurface: '#665cd6',
  },
} as const;

// Border Radius tokens
export const borderRadius = {
  sm: '2px',
  md: '4px',
  lg: '6px',
  xl: '8px',
  full: '9999px',
} as const;

// Export all tokens
export const tokens = {
  spacing,
  colors,
  borderRadius,
} as const;

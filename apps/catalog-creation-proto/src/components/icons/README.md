# Icon Library

This directory contains the icon library extracted from Figma. All icons are React components that can be imported and used throughout the application.

## Structure

Icons are organized by category:
- `arrows/` - Arrow, chevron, and navigation icons
- `media/` - Media-related icons (video, audio, images)
- `objects/` - Object and tool icons
- `formatting/` - Formatting and editing icons
- `human/` - Human and user-related icons
- `ecommerce/` - E-commerce and shopping icons
- `brands/` - Brand logos
- `fileextensions/` - File type icons
- `ai/` - AI-related icons
- And more...

## Usage

```tsx
import { ArrowsChevronDown, ArrowsArrowUp, MediaVideoClip } from '@/components/icons';

function MyComponent() {
  return (
    <div>
      <ArrowsChevronDown size="16" />
      <ArrowsArrowUp size="24" color="#009995" />
      <MediaVideoClip size="32" />
    </div>
  );
}
```

## Icon Sizes

All icons support the following sizes:
- `8` - 8px
- `12` - 12px
- `14` - 14px
- `16` - 16px (default)
- `24` - 24px
- `32` - 32px
- `48` - 48px
- `64` - 64px

## Props

All icons accept the following props:

```tsx
interface IconProps {
  size?: IconSize;           // Icon size (default: '16')
  className?: string;        // Additional CSS classes
  style?: React.CSSProperties; // Inline styles
  color?: string;            // Icon color (uses currentColor by default)
  'aria-label'?: string;     // Accessibility label
  'aria-hidden'?: boolean;   // Hide from screen readers (default: true)
}
```

## Adding SVG Paths

Currently, all icons have placeholder SVG paths. To add the actual icon paths:

1. Open Figma and select the icon
2. Export the SVG or copy the path data
3. Replace the placeholder `<path>` element in the component file with the actual SVG paths

## Generating Icons

To regenerate all icon components from Figma metadata:

```bash
node scripts/generate-icons.js
```

This will:
- Parse the Figma metadata file
- Generate React components for each icon
- Organize them by category
- Update the index.ts file with all exports

## Total Icons

Currently: **336 icons** across multiple categories.


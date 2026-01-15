const DEFAULT_SIZE = 16;
const DEFAULT_VIEWBOX = 48;

const getAbsouluteStrokeWidth = (size: number, strokeWidth: number) =>
  (Number(strokeWidth) * DEFAULT_VIEWBOX) / Number(size);

const PREDEFINED_STROKE_WIDTHS = {
  14: getAbsouluteStrokeWidth(14, 1),
  16: getAbsouluteStrokeWidth(16, 1.5),
  24: getAbsouluteStrokeWidth(24, 2),
  32: getAbsouluteStrokeWidth(32, 2.5),
  48: getAbsouluteStrokeWidth(48, 3),
};

export function useIcon({ size, color }: { size: string | number; color: string }) {
  const parsedSize = parseInt(`${size}`) || DEFAULT_SIZE;
  const predefinedStrokeWidth = PREDEFINED_STROKE_WIDTHS[parsedSize];

  return {
    width: parsedSize,
    height: parsedSize,
    color,
    strokeWidth: predefinedStrokeWidth || 3,
  };
}

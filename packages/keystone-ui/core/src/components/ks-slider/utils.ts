export const valueToPercent = (value: number, min: number, max: number) => ((value - min) * 100) / (max - min);

export const percentToValue = (percent: number, min: number, max: number) => (max - min) * percent + min;

export const findClosestIndex = (values: number[], value: number) =>
  values.reduce<{ distance: number; index: number } | null>((pre, cur, index) => {
    const distance = Math.abs(value - cur);

    if (pre === null || distance <= pre.distance) {
      return {
        distance,
        index,
      };
    }

    return pre;
  }, null)?.index ?? 0;

export function progressAnimation(percent: number, isSVG: boolean) {
  let prevPercent = 0;
  const percentDiff = Math.abs(percent - prevPercent);

  const isEnter = percent > 0 && prevPercent <= 0;
  const isLeave = percent <= 0 && prevPercent > 0;
  prevPercent = percent;

  const widthDuration = 100;
  const dashDuration = Math.min(percentDiff * 4 + 100, 400);
  const dashDelay = isEnter ? widthDuration : 0;
  const widthDelay = isLeave ? dashDuration : 0;

  if (!isSVG) {
    return {
      transition: [`width ${dashDuration}ms ease-out`, `height ${dashDuration}ms ease-out`].join(', '),
    };
  }

  return {
    transition: [
      // `stroke ${dashDuration}ms ease-out ${dashDelay}ms`,
      `stroke-dashoffset ${dashDuration}ms ease-out ${dashDelay}ms`,
      `stroke-dasharray ${dashDuration}ms ease-out ${dashDelay}ms`,
      `stroke-width ${widthDuration}ms ease-out ${widthDelay}ms`,
    ].join(', '),
  };
}

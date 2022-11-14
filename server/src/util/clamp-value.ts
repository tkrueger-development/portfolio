const clampValue = ({ candidate, min, max }: { candidate: number, min: number, max: number}): number => {
  if (min > max) return candidate;

  let clamp = candidate;
  if (candidate > max) clamp = max;
  if (candidate < min) clamp = min;

  return clamp;
};

export { clampValue };
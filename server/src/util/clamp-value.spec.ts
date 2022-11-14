import { describe, it, expect } from 'vitest';

import { clampValue } from './clamp-value';

describe('clampValue({ @value, @min, @max })', () => {
  it('returns a number', () => {
    const candidate = 2;
    const min = 1;
    const max = 3;

    const result = clampValue({ candidate, min, max });

    expect(typeof result).equals('number');
  });

  it('clamps @candidate to @max when @value > @max', () => {
    const candidate = 4;
    const min = 1;
    const max = 3;

    const result = clampValue({ candidate, min, max });

    expect(result).equals(max);
  });

  it('clamps @candidate to @min when @value < @min', () => {
    const candidate = 0;
    const min = 1;
    const max = 3;

    const result = clampValue({ candidate, min, max });

    expect(result).equals(min);
  });

  it('returns @candidate when @min > @max', () => { 
    const candidate = 0;
    const min = 3;
    const max = 1;

    const result = clampValue({ candidate, min, max });

    expect(result).equals(candidate);
  });
});
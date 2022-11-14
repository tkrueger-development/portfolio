import { describe, it, expect } from 'vitest';

import { randomValue } from './random-value';

describe('randomValue({ @decimals })({ @min, @max })', () => {

  const randomValueZeroDecimals   = randomValue({ decimals: 0 });
  const randomValueOneDecimal     = randomValue({ decimals: 1 });
  const randomValueTwoDecimals    = randomValue({ decimals: 2 });

  it('should return a number', () => {
    expect(typeof randomValueZeroDecimals( { min: 1, max: 1 })).equals('number');
    expect(typeof randomValueOneDecimal(   { min: 1, max: 1 })).equals('number');
    expect(typeof randomValueTwoDecimals(  { min: 1, max: 1 })).equals('number');
  });

  describe('randomValueAnyDecimals({ @min, @max })', () => {
    it('should return a number between and including @min and @max', () => {
      const min = 1;
      const max = 3;
      
      const rounds = 50;
      
      for (let i = 0; i <= rounds; i++) {
        const result = randomValueZeroDecimals({ min, max });
        
        expect(result >= min).toBeTruthy();
        expect(result <= max).toBeTruthy();
      
        expect(Math.ceil (result) === result).toBeTruthy();
        expect(Math.floor(result) === result).toBeTruthy();
      }
    });
  });

  describe('randomValueOneDecimal({ @min, @max })', () => {
    it('should return a decimal number with one place between and including @min and @max', () => {
      const min = 1;
      const max = 3;
      
      const rounds = 25;
      
      for (let i = 0; i <= rounds; i++) {
        const result = randomValueOneDecimal({ min, max });
        
        expect(result >= min).toBeTruthy();
        expect(result <= max).toBeTruthy();

        expect(Number(result.toFixed(1)) === result).toBeTruthy();
      }
    });
  });

  describe('randomValueTwoDecimals({ @min, @max })', () => {
    it('should return a decimal number with two places between and including @min and @max', () => {
      const min = 1;
      const max = 3;
      
      const rounds = 25;
      
      for (let i = 0; i <= rounds; i++) {
        const result = randomValueTwoDecimals({ min, max });
        
        expect(result >= min).toBeTruthy();
        expect(result <= max).toBeTruthy();

        expect(Number(result.toFixed(2)) === result).toBeTruthy();
      }
    });
  });
});
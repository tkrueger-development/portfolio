import { describe, it, expect, beforeEach } from 'vitest';
import { UniqueRatingGenerator } from './unique-rating-generator';

describe('UniqueRatingGenerator({ @generatorFunction, @min, @max })', () => {
  const min = 1.0;
  const max = 5.0;

  const rating = new UniqueRatingGenerator({ min, max });

  beforeEach(() => {
    rating.reset();
  });

  it('initializes with @min and @max', () => {
    expect(rating instanceof UniqueRatingGenerator).toBeTruthy();
  });

  it('throws when @min and @max are equal', () => {
    expect(() => new UniqueRatingGenerator({ min: 1, max: 1 })).toThrow(/lower/);
  });

  describe('generateRandom()', () => {

    it('returns a number', () => {
      expect(typeof rating.generateRandom()).equals('number');
    });

    it('is a float', () => {
      const [int, decimal] = rating.generateRandom().toFixed(1).split('.');

      expect(int).toBeTruthy();
      expect(decimal).toBeTruthy();
    });

    it('number has one decimal place', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, decimal] = rating.generateRandom().toFixed(1).split('.');

      expect(decimal.length).equals(1);
    });

    it('never returns the same number until exhaustion', () => {
      const collectedNumbers: Array<number> = [];
      const numberOfpossibilities = (max - min) * 10 + 1;

      while (numberOfpossibilities - collectedNumbers.length > 0) {
        const result = rating.generateRandom();

        if (!collectedNumbers.includes(result)) {
          collectedNumbers.push(result);
        }
      }

      expect(collectedNumbers.length).equals(numberOfpossibilities);
      expect(new Set(collectedNumbers).size === collectedNumbers.length).toBeTruthy();
    });

    it('running out of possibilities throws an error', () => {
      const collectedNumbers: Array<number> = [];
      const numberOfpossibilities = (max - min) * 10 + 1;

      const wrapFn = () => {
      // eslint-disable-next-line no-constant-condition
        while (true) {
          const result = rating.generateRandom();
          
          if (!collectedNumbers.includes(result)) {
            collectedNumbers.push(result);
          }
        }
      };

      expect(wrapFn).toThrow(/exhaust/);
      expect(collectedNumbers.length === numberOfpossibilities).toBeTruthy();
    });
  });

  describe('possibilitiesLeft()', () => {
    it('returns a number', () => {
      expect(typeof rating.possibilitiesLeft()).equals('number');
    });

    it('returns the number of possibilities that the generator class can still output in the current state', () => {
      const min = 4.0;
      const max = 5.0;

      const numberOfpossibilities = (max - min) * 10 + 1;
    
      const rating = new UniqueRatingGenerator({ min, max });

      expect(rating.possibilitiesLeft()).equals(numberOfpossibilities);
      
      rating.generateRandom();
      expect(rating.possibilitiesLeft()).equals(numberOfpossibilities - 1);

      rating.generateRandom();
      expect(rating.possibilitiesLeft()).equals(numberOfpossibilities - 2);

      rating.generateRandom();
      expect(rating.possibilitiesLeft()).equals(numberOfpossibilities - 3);
      
       // Call generateRandom() eight times
      for (let i = 1; i <= 8; i++) rating.generateRandom();
      expect(rating.possibilitiesLeft()).equals(numberOfpossibilities - 11);

      expect(() => rating.generateRandom()).toThrow(/exhaust/);
    });
  });

  describe('reset()', () => {
    it('resets state', () => {
      const ratingIsolated = new UniqueRatingGenerator({ min: 4.9, max: 5.0 });

      ratingIsolated.generateRandom();
      ratingIsolated.generateRandom();

      expect(() => ratingIsolated.generateRandom()).toThrow(/exhaust/);

      ratingIsolated.reset();

      ratingIsolated.generateRandom();
      expect(typeof ratingIsolated.generateRandom()).equals('number');
    });
  });
});
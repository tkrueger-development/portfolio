// Solves the sorting problem (in testing) when two (or more) ratings have the 
// same value. Makes tests consistent. Example:
// ProductA.rating = 4.5 and
// ProductB.rating = 4.5 could be
// [ProductA, ProductB] or
// [ProductB, ProductA]
// which causes errors in tests.

// Formula for number of possible ratings in
// min/max range with respect to one decimal place:

// Requirement: max > min
// (max - min) * 10 + 1

// Proof:
// 5.0 - 4.9   =   0.1 * 10   =>    1 + 1   =>    2
// 5.0 - 3.0   =   2.0 * 10   =>   20 + 1   =>   21
// 4.5 - 3.0   =   1.5 * 10   =>   15 + 1   =>   16
// 4.9 - 3.5   =   1.4 * 10   =>   14 + 1   =>   15

// Special Case to avoid:
// 5.0 - 5.0   =     0 * 10   =>    0 + 1   =>   !1

class UniqueRatingGenerator {
  private usedRatings:     Array<number>       = [];
  private min:             number;
  private max:             number;
  private possibilities:   number;

  constructor(
    { min,         max }: 
    { min: number, max: number }) {
      if (min === max) throw new Error('Min has to be lower than Max.');

      this.min = min;
      this.max = max;
      this.possibilities = parseInt(((max - min) * 10 + 1).toFixed(0));
  }  
  
  private generateDecimal(): number {
    return parseFloat((Math.random() * (this.max - this.min) + this.min).toFixed(1));
  }

  public possibilitiesLeft(): number {
    return this.possibilities - this.usedRatings.length;
  }

  public generateRandom(): number {
     if (this.usedRatings.length === this.possibilities) {
      throw new Error('Unique possibilities exhausted. Try increasing min/max range for more results or reset state with reset().');
    }

    let result = this.generateDecimal();

    while (this.usedRatings.includes(result) && this.possibilitiesLeft() > 0) {
        result = this.generateDecimal();
    }

    this.usedRatings.push(result);
    return result;
  }

  public reset(): void {
    this.usedRatings = [];
  }
}

export { UniqueRatingGenerator };
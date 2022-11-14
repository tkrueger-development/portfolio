const randomValue = 
  ({ decimals }: { decimals: number }) =>
  ({ min, max }: { min: number, max: number }): number => {

  if (!decimals) return Math.floor(Math.random() * (max - min + 1)) + min;

  return Number((Math.random() * (max - min) + min).toFixed(decimals));
};

const randomInt      = randomValue({ decimals: 0 });
const randomRating   = randomValue({ decimals: 1 });
const randomPrice    = randomValue({ decimals: 2 });

export { randomValue, randomInt, randomRating, randomPrice };
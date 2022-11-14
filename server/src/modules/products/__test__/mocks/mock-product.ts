import { Product } from '../../products.model';
import { randomInt, randomRating, randomPrice } from '../../../../util/test-util/random-value';

const mockProduct = <T>({ overrides }: { overrides?: T } = {}): Omit<Product, 'id'> => {
  return {
    createdOn:       Date.now() + randomInt({ min: 1, max: 1_000 }),
    modifiedOn:      Date.now() + randomInt({ min: 1_001, max: 10_000 }),

    brand:          'testBrand',
    name:           'testName',
    category:       'testCategory',
    imagePath:      'testPath/',
    imageGallery:   ['testImage.png'],
    description:    'test description',
    tags:           ['tag1', 'tag2', 'tag3'],

    ratingNum:      randomInt({    min: 10,  max: 100 }),
    ratingAverage:  randomRating({ min: 1.0, max: 5.0 }),

    variants: [
      {
        image:      'testImage.png',
        size:       '1',
        color:      '#FFFFFF',
        price:      randomPrice({ min: 500, max: 2000 }),
        quantity:   randomInt({   min:   1, max:   50 }),
        views:      randomInt({   min:   0, max:  200 }),
        sales:      randomInt({   min:   0, max:   25 }),
      }
    ],
    
    ...overrides
  };
};

export { mockProduct };
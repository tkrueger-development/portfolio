import { describe, it, expect } from 'vitest';
import { ProductList } from './product-list';
import { mockProduct } from '../__test__/mocks/mock-product';
import { Product } from '../products.model';

const generateMockProducts = (
  { mockProductCount }: 
  { mockProductCount: number }): Array<Omit<Product, 'id'>> => {
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const mockProducts = new Array(mockProductCount).fill(0).map((_) => mockProduct());

   return mockProducts;
};

const mockProducts = generateMockProducts({ mockProductCount: 10 });

describe('ProductList({ @products })', () => {
  it('exist', () => {
    expect(ProductList).toBeTruthy();
  });

  describe('getList()', () => {
    it('returns an array', () => {
      const productList = new ProductList({ products: mockProducts });

      expect(Array.isArray(productList.getList())).toBeTruthy();
    });

    it('array has the same length as given @products', () => {
      const productList = new ProductList({ products: mockProducts });

      expect(productList.getList().length === mockProducts.length).toBeTruthy();
    });

    it('array element are the same as given @products', () => {
      const productList = new ProductList({ products: mockProducts });

      expect(productList.getList()).deep.equals(mockProducts);
    });
  });

  describe('sortByRating({ @direction })', () => {
    it('sorts products by rating in ascending order', () => {
      const sortedAscendingMockProducts = [...mockProducts].sort((a,b) => a.ratingAverage - b.ratingAverage);
      const productList = new ProductList({ products: mockProducts });

      productList.sortByRating({ direction: 'ascending' });

      expect(productList.getList()).deep.equals(sortedAscendingMockProducts);
    });

    it('sorts products by ratingAverage in descending order', () => {
      const sortedDescendingMockProducts = [...mockProducts].sort((a,b) => b.ratingAverage - a.ratingAverage);
      const productList = new ProductList({ products: mockProducts });

      productList.sortByRating({ direction: 'descending' });

      expect(productList.getList()).deep.equals(sortedDescendingMockProducts);
    });
  });

  describe('sortByLatest({ @direction })', () => {
    it('sorts products by createdOn in ascending order', () => {
      const sortedAscendingMockProducts = [...mockProducts].sort((a,b) => a.createdOn - b.createdOn);
      const productList = new ProductList({ products: mockProducts });

      productList.sortByLatest({ direction: 'ascending' });

      expect(productList.getList()).deep.equals(sortedAscendingMockProducts);
    });

    it('sorts products by createdOn in descending order', () => {
      const sortedDescendingMockProducts = [...mockProducts].sort((a,b) => b.createdOn - a.createdOn);
      const productList = new ProductList({ products: mockProducts });

      productList.sortByLatest({ direction: 'descending' });

      expect(productList.getList()).deep.equals(sortedDescendingMockProducts);
    });
  });

  describe('reduceVariantCount({ @count })', () => {
    it('reduces embedded variants array to @count', () => {
      const productList = new ProductList({ products: mockProducts });

      productList.reduceVariantCount({ count: 1 });

      const reduced = productList.getList();
      reduced.forEach((product) => { expect(product.variants.length).equals(1); });
    });
  });
});

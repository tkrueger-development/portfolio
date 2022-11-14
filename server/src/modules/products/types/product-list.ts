import { ProductVariant } from '../products.model';

type SortDirection = 'ascending' | 'descending';
type ProductListConstrains = { createdOn: number, ratingAverage: number, variants: Array<ProductVariant> };

const sortByRatingAscending  = <T extends { ratingAverage: number }>(a: T, b: T) => a.ratingAverage - b.ratingAverage;
const sortByRatingDescending = <T extends { ratingAverage: number }>(a: T, b: T) => b.ratingAverage - a.ratingAverage;
const sortByLatestAscending  = <T extends { createdOn: number }>(a: T, b: T)     => a.createdOn - b.createdOn;
const sortByLatestDescending = <T extends { createdOn: number }>(a: T, b: T)     => b.createdOn - a.createdOn;

class ProductList<T extends ProductListConstrains> {
  protected products: Array<T>;

  constructor({ products = [] }: { products?: Array<T> }) {
    this.products = [...products];
  }

  public reduceVariantCount({ count }: { count: number }): void {
    this.products.map((product) => { 
      product.variants.length = count; 
      return product;
    });
  }

  public sortByRating({ direction }: { direction: SortDirection }): void {
    this.products.sort(direction === 'descending' ? sortByRatingDescending : sortByRatingAscending);
  }

  public sortByLatest({ direction }: { direction: SortDirection }): void {
    this.products.sort(direction === 'descending' ? sortByLatestDescending: sortByLatestAscending);
  }

  public getList(): Array<T> { return this.products; }
}

export { ProductList };
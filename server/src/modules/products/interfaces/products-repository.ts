import { Product } from '../products.model';
import { ProductFilterState } from '../../../../../common/types/state/filter-state.ts.backup';
import { ProductOverviewDTO } from '../../../../../common/dtos/product-dtos';

interface IProductRepository {
  findProductById({ id }: { id: string }): Promise<Product>;
  findProductByCategory({ category, filter, productCount }: { category: string, filter: ProductFilterState, productCount: number }): Promise<Array<ProductOverviewDTO>>
  findMostPopularProducts({ ratingThreshold, productCount }: { ratingThreshold: number,  productCount: number }): Promise<Array<ProductOverviewDTO>>;
  findLatestProducts({ productCount }: { productCount: number }): Promise<Array<ProductOverviewDTO & { createdOn: number }>>;
}
export { IProductRepository };

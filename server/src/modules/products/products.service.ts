import { Product } from './products.model';
import { ProductCategory } from './types/product-category';
import { IProductRepository } from './interfaces/products-repository';
import { ProductOverviewDTO } from '../../../../common/dtos/product-dtos';
import { ProductList } from './types/product-list';
import { clampValue } from '../../util/clamp-value';
import { BadRequestException } from '../../common/exceptions/bad-request-exception';
import { ProductFilterState } from '../../../../common/types/state/filter-state.ts.backup';


const parseInteger = ({ candidate }: { candidate: string }): number => {
  const badRequestMessage = 'Product count parameter needs to be a parsable string.';
  
  if (!candidate || typeof candidate !== 'string') throw new BadRequestException(badRequestMessage);

  const number = parseInt(candidate);
  if (isNaN(number)) throw new BadRequestException(badRequestMessage);

  return number;
};

class ProductsService {
  private productsRepository: IProductRepository;

  constructor({ productsRepository }: { productsRepository: IProductRepository }) {
    this.productsRepository = productsRepository;
  }

  async getProductById({ id }: { id: string }): Promise<Product> {
    return await this.productsRepository.findProductById({ id });
  }

  async getProductByCategory({ category, filter, count = '20' }: { category: ProductCategory, filter: ProductFilterState, count: string }): Promise<Array<ProductOverviewDTO>> {
    const value        = parseInteger({ candidate: count });
    const productCount = clampValue({ candidate: value, min: 1, max: 20 });
    const products     = await this.productsRepository.findProductByCategory({ category, filter, productCount });

    const productList = new ProductList<ProductOverviewDTO>({ products });

    productList.sortByRating({ direction: 'descending' });

    return productList.getList();
  }

  async getMostPopularProducts({ count }: { count: string }): Promise<Array<ProductOverviewDTO>> {
    const ratingThreshold = 0;
    const value           = parseInteger({ candidate: count });
    const productCount    = clampValue({ candidate: value, min: 1, max: 10 });
    const products        = await this.productsRepository.findMostPopularProducts({ ratingThreshold, productCount });

    const productList = new ProductList<ProductOverviewDTO>({ products });

    productList.reduceVariantCount({ count: 1 });
    productList.sortByRating({ direction: 'descending' });

    return productList.getList();
  }

  async getLatestProducts({ count }: { count: string }): Promise<Array<ProductOverviewDTO & { createdOn: number }>> {
    const value        = parseInteger({ candidate: count });
    const productCount = clampValue({ candidate: value, min: 1, max: 10 });
    const products     = await this.productsRepository.findLatestProducts({ productCount });

    const productList = new ProductList<ProductOverviewDTO & { createdOn: number }>({ products });

    productList.reduceVariantCount({ count: 1 });
    productList.sortByLatest({ direction: 'descending' });

    return productList.getList();
  }
}

export { ProductsService };
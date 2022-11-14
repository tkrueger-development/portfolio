import { Product } from '../products.model';

type ProductOverviewDTO = Pick<Product, 'createdOn' | 'brand' | 'name' | 'category' | 'imagePath' | 'ratingAverage' | 'variants'> & { id: string };

export { ProductOverviewDTO };
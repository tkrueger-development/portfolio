import { Product } from './product'; 

type ProductOverviewDTO = Pick<Product, 'createdOn' | 'brand' | 'name' | 'category' | 'imagePath' | 'ratingAverage' | 'variants'> & { id: string };

export { Product, ProductOverviewDTO };
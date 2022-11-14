import { MongoRepository } from '../../common/database/mongo-repository';
import { MongoPipeline } from '../../common/database/mongo-pipeline';
import { IProductRepository } from './interfaces/products-repository';

import { ProductOverviewDTO } from './dtos/product-overview';
import { NotFoundException } from '../../common/exceptions/not-found-exception';

import { Product } from './products.model';
import { ProductFilterState } from './dtos/filter-state';

import { ObjectId } from 'mongodb';

const productRemapPrefix       = 'variants.';
const productAttributesToRemap = ['price', 'size', 'quantity', 'color', 'sales', 'image'];

const productOverviewProjection = { 
  _id:             0,
  id:         '$_id',
  brand:           1,
  name:            1,
  category:        1,
  imagePath:       1,
  ratingAverage:   1,
  variants:        1
};

class ProductsRepository implements IProductRepository {
  private repository: MongoRepository<Product>;

  constructor({ repository }: { repository: MongoRepository<Product> }) {
    this.repository = repository;
  }

  async findProductById({ id }: { id: string }): Promise<Product> {
    const product = await this.repository.findOne({ filter: { _id: new ObjectId(id) } });

    return product as unknown as Product;
  }

  async findProductByCategory({ category, filter, productCount }: { category: string, filter: ProductFilterState, productCount: number }): Promise<Array<ProductOverviewDTO>> {
    const filterKeys = Object.keys(filter) as Array<keyof ProductFilterState>;

    const productPipeline = new MongoPipeline({ 
      remapPrefix: productRemapPrefix,
      attributesToRemap: productAttributesToRemap
    });

    productPipeline.match({ field: 'category', values: [category] });

    if (filterKeys.length > 0) {
      filterKeys.forEach((filterKey) => {

        productPipeline.match({ field: filterKey, values: filter[filterKey]! }); // filter is validated and has no undefined fields
      });
    }

    const pipeline = [
      productPipeline.createMatchStage(),
      { $sort: { ratingAverage: -1 } },
      { $limit: productCount },
      { $project: productOverviewProjection }
    ];

    const documentCursor = this.repository.aggregate({ pipeline });

    if (!documentCursor) {
      throw new NotFoundException('No documents found.');
    }

    return await documentCursor.toArray();
  }

  async findMostPopularProducts(
    { ratingThreshold,         productCount }: 
    { ratingThreshold: number, productCount: number }): Promise<Array<ProductOverviewDTO>> {

    const pipeline = [
      { $match: { ratingAverage: { $gte: ratingThreshold } } },
      { $sort:  { ratingAverage: -1 } },
      { $limit: productCount },
      { $project: productOverviewProjection }
    ];

    const documentCursor = this.repository.aggregate({ pipeline });

    if (!documentCursor) {
      throw new NotFoundException('No documents found.');
    }

    return await documentCursor.toArray();
  }


  async findLatestProducts({ productCount }: { productCount: number }): Promise<Array<ProductOverviewDTO & { createdOn: number }>> {
      const pipeline = [
        { $sort: { createdOn: -1 } },
        { $limit: productCount },
        { $project: { 
          ...productOverviewProjection,
          createdOn:       1
        } }
      ];

      const documentCursor = this.repository.aggregate({ pipeline });

      if (!documentCursor) {
        throw new NotFoundException('No documents found.');
      }

      return await documentCursor.toArray();
  }
}

export { ProductsRepository };
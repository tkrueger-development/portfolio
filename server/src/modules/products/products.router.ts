import { Router } from 'express';
import { validateFilterDTO } from './middleware/validate-filter-dto';
import { validateId } from './middleware/validate-id';

import { Product } from './products.model';
import { appEvent } from '../../common/services/event';

import { MongoRepository } from '../../common/database/mongo-repository';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

class ProductsRouter {
  private router = Router();
  private productsController: ProductsController;

  constructor({ productsController }: { productsController: ProductsController }) {
    this.productsController = productsController;
    this.bindRoutes();
  }

  private bindRoutes() {
    this.router.get('/:productId',             validateId, this.productsController.getProductById);

    this.router.post('/kites/:count',          validateFilterDTO, this.productsController.getKites);
    this.router.post('/kitebars/:count',       validateFilterDTO, this.productsController.getKiteBars);
    this.router.post('/kiteboards/:count',     validateFilterDTO, this.productsController.getKiteBoards);
    this.router.post('/harnesses/:count',      validateFilterDTO, this.productsController.getHarnesses);
    this.router.post('/wetsuits/:count',       validateFilterDTO, this.productsController.getWetsuits);
    
    this.router.get('/most-popular/:count',    this.productsController.getMostPopularProducts);
    this.router.get('/latest-products/:count', this.productsController.getLatestProducts);
  }

  public get() { return this.router; }
}

const mongoRepository      = new MongoRepository<Product>({ eventEmitter: appEvent, collectionName: 'products' });
const productsRepository   = new ProductsRepository({ repository: mongoRepository });
const productsService      = new ProductsService({ productsRepository });
const productsController   = new ProductsController({ productsService });
const productsRouter       = new ProductsRouter({ productsController });

export { productsRouter };
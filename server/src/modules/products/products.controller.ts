import { Request, Response } from 'express';
import { ProductsService } from './products.service';
import { ProductCategory } from './types/product-category';

class ProductsController {
  private productsService: ProductsService;
  
  constructor({ productsService }: { productsService: ProductsService }) {
    this.productsService = productsService;
  }

  getProductById = async (req: Request, res: Response): Promise<void> => {
    const id = res.locals.validatedProductId;

    const product = await this.productsService.getProductById({ id });

    res.status(200).json(product);
  };
  
  getWetsuits = async (req: Request, res: Response): Promise<void> => {
    const { count }         = req.params;
    const { validatedBody } = res.locals;

    const wetsuits = await this.productsService.getProductByCategory({ category: ProductCategory.WETSUIT, filter: validatedBody, count });

    res.status(200).json(wetsuits);
  };

  getHarnesses = async (req: Request, res: Response): Promise<void> => {
    const { count } = req.params;
    const { validatedBody } = res.locals;

    const harnesses = await this.productsService.getProductByCategory({ category: ProductCategory.HARNESS, filter: validatedBody, count });

    res.status(200).json(harnesses);
  };

  getKiteBoards = async (req: Request, res: Response): Promise<void> => {
    const { count } = req.params;
    const { validatedBody } = res.locals;

    const kiteboards = await this.productsService.getProductByCategory({ category: ProductCategory.KITEBOARD, filter: validatedBody, count });

    res.status(200).json(kiteboards);
  };

  getKiteBars = async (req: Request, res: Response): Promise<void> => {
    const { count } = req.params;
    const { validatedBody } = res.locals;

    const kitebars = await this.productsService.getProductByCategory({ category: ProductCategory.KITEBAR, filter: validatedBody, count });

    res.status(200).json(kitebars);
  };

  getKites = async (req: Request, res: Response): Promise<void> => {
    const { count }         = req.params;
    const { validatedBody } = res.locals;

    const kites = await this.productsService.getProductByCategory({ category: ProductCategory.KITE, filter: validatedBody, count });

    res.status(200).json(kites);
  };


  getMostPopularProducts = async (req: Request, res: Response): Promise<void> => {
    const { count } = req.params;

    const products = await this.productsService.getMostPopularProducts({ count });

    res.status(200).json(products);
  };


  getLatestProducts = async (req: Request, res: Response): Promise<void> => {
    const { count } = req.params;

    const products = await this.productsService.getLatestProducts({ count });

    res.status(200).json(products);
  };
}

export { ProductsController };
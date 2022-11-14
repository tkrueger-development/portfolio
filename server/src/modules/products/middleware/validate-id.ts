import { ObjectId } from 'mongodb';
import { NextFunction, Request, Response } from 'express';
import { BadRequestException } from '../../../common/exceptions/bad-request-exception';

const validateId = (req: Request, res: Response, next: NextFunction): void => {

  if (!req.params.productId) {
    next(new BadRequestException('You need to provide an id.'));
    return;
  }

  const { productId } = req.params;

  if (!ObjectId.isValid(productId)) {
    next(new BadRequestException('Invalid id.'));
    return;
  }

  res.locals.validatedProductId = productId;

  next();
};

export { validateId };
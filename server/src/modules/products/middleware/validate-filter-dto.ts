import { NextFunction, Request, Response } from 'express';
import { BadRequestException } from '../../../common/exceptions/bad-request-exception';
import { productFilterSchema } from '../products.schema';
import { logger } from '../../../common/services/logger';

const validateFilterDTO = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.body) {
    next(new BadRequestException('You have to provide a filter.'));
    return;
  }

  try { 
    res.locals.validatedBody = productFilterSchema.parse(req.body);
  } 
  catch (ex: unknown) {
    logger.warn({ message: (ex as Error).message });
    next(new BadRequestException('Your request does not meet requirements.'));
    return;
  }

  next();
};

export { validateFilterDTO };
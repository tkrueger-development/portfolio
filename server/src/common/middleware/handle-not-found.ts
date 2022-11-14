import { Request, Response, NextFunction } from 'express';
import { NotFoundException } from '../exceptions/not-found-exception';

const handleNotFound = (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundException('Route not found.'));
};

export { handleNotFound };
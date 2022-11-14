import { Request, Response, NextFunction } from 'express';
import { BaseException } from '../exceptions/base-exception';
import { logger } from '../services/logger';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleErrors = (error: Error, req: Request, res: Response, next: NextFunction) => {
  let code      = 500;
  let message   = 'Internal Server Exception.';

  if (error instanceof BaseException) {
    message   = error.message;
    code      = error.statusCode;
  }

  if (code === 500) logger.error({ message: `${error.message}` });

  res.status(code).json({ message });
};

export { handleErrors };
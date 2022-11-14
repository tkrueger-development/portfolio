import { BaseException } from './base-exception';

class InternalServerException extends BaseException {
  statusCode = 500;
}

export { InternalServerException };
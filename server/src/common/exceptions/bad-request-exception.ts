import { BaseException } from './base-exception';

class BadRequestException extends BaseException {
  statusCode = 400;
}

export { BadRequestException };
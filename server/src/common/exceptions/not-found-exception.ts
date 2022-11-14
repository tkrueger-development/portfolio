import { BaseException } from './base-exception';

class NotFoundException extends BaseException {
  statusCode = 404;
}

export { NotFoundException };
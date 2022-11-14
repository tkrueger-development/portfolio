import { BaseException } from './base-exception';

class ForbiddenException extends BaseException {
  statusCode = 403;
}

export { ForbiddenException };
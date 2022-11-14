import { BaseException } from './base-exception';

class UnauthorizedException extends BaseException {
  statusCode = 401;
}

export { UnauthorizedException };
import { HttpStatus } from '../../util/http-status';

abstract class BaseException extends Error {
  readonly isOperational = true;
  abstract statusCode: HttpStatus;

  constructor(message: string) {
    super(message);
  
    if (!message || message.length === 0) {
      throw new Error('Subclasses of BaseException need non empty message.');
    }

  }
}

export { BaseException };
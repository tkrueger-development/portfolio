import { describe, it, expect } from 'vitest';

import { BaseException } from './base-exception';
import { BadRequestException } from './bad-request-exception';
import { NotFoundException } from './not-found-exception';
import { UnauthorizedException } from './unauthorized-exception';
import { ForbiddenException } from './forbidden-exception';
import { InternalServerException } from './internal-server-exception';

describe('Exceptions', () => {
  const errorMessage = 'test';

  const exceptionTestCases = [
    { exceptionClass: BadRequestException,     statusCode: 400 },
    { exceptionClass: UnauthorizedException,   statusCode: 401 },
    { exceptionClass: ForbiddenException,      statusCode: 403 },
    { exceptionClass: NotFoundException,       statusCode: 404 },
    { exceptionClass: InternalServerException, statusCode: 500 }
  ];

  for (const testCase of exceptionTestCases) {
    const { exceptionClass, statusCode } = testCase;

    const nameOfCandidate = exceptionClass.toString().split(' ')[1];

    describe(nameOfCandidate, () => {
      it('extends BaseException', () => {
        const exception = new exceptionClass(errorMessage);
        
        const isInstanceOfBaseException = exception instanceof BaseException;

        expect(isInstanceOfBaseException).toBeTruthy();
      });

      it(`has status code of ${statusCode}`, () => {
        const exception = new exceptionClass(errorMessage);
        
        expect(exception.statusCode).equals(statusCode);
      });
    });
 
  }
});
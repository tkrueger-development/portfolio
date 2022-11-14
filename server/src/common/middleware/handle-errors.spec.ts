import express, { Request, Response, NextFunction, Application } from 'express';
import 'express-async-errors';

import request from 'supertest';
import { describe, it, expect, beforeEach } from 'vitest';
import { BadRequestException } from '../exceptions/bad-request-exception';

import { handleErrors } from './handle-errors';

describe('handleErrors(@error, @req, @res, @next)', () => {
  let app: Application;

  beforeEach(() => {
    app = express();
    app.use(handleErrors);
  });

  it('catch and handle synchronous exceptions forwarded by next()', async () => {
    const testPath   = '/expectedSyncException';
    const handler    = (req: Request, res: Response, next: NextFunction): void => next(new BadRequestException(testPath));
    app.get(testPath, handler);

    const { statusCode } = await request(app).get(testPath);

    expect(statusCode).equals(400);
  });

  it('catch and handle asynchronous exceptions forwarded by next()', async () => {
    const testPath   = '/expectedAsyncException';
    const handler    = async (req: Request, res: Response, next: NextFunction): Promise<void> => next(new BadRequestException(testPath));
    app.get(testPath, handler);

    const { statusCode } = await request(app).get(testPath);

    expect(statusCode).equals(400);
  });

  it('catch and handle synchronous unexpected errors', async () => {
    const testPath = '/unexpectedSyncError';

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handler = (req: Request, res: Response, next: NextFunction): never => { throw new Error(testPath); };
    app.get(testPath, handler);

    const { statusCode } = await request(app).get(testPath);

    expect(statusCode).equals(500);
  });

  it('catch and handle asynchronous unexpected errors - with "express-async-errors" monkey patch', async () => {
    const testPath = '/unexpectedAsyncError';

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handler = async (req: Request, res: Response, next: NextFunction): Promise<never> => { throw new Error(testPath); };
    app.get(testPath, handler);

    const { statusCode } = await request(app).get(testPath);

    expect(statusCode).equals(500);
  });
});

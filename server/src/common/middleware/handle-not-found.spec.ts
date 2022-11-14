import request from 'supertest';
import express, { NextFunction, Request, Response } from 'express';
import { describe, it } from 'vitest';

import { handleNotFound } from './handle-not-found';

describe('handleNotFound(@req, @res, @next)', () => {
  const code = 999;
  const body = { message: 'testError' };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleErrors = (error: Error, req: Request, res: Response, next: NextFunction) => res.status(code).json(body);

  it('forwards NotFoundException with next() to error handler that replies', async () => {
    const app = express();

    app.use('*', handleNotFound);
    app.use(handleErrors);

    await request(app).get('/doesNotExist')
                      .expect('Content-Type', /json/)
                      .expect(body)
                      .expect(code);
  });
});
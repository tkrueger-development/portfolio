import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { ProductFilterState } from '../../../../../common/types/state/filter-state.ts.backup';

import { validateFilterDTO } from './validate-filter-dto';

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
const handleRequest = (req: Request, res: Response) => res.json({ message: 'ok' });

app.use('/test/validateFilterDTO', validateFilterDTO, handleRequest);

describe('validateFilterDTO()', () => {
  it('passes with a valid body', async () => {
    const validTestCase: ProductFilterState = {
      brand: ['test'],
      size: ['test'],
      price: [0, 1000],
      ratingAverage: 5
    };

    const response = await request(app).post('/test/validateFilterDTO').send(validTestCase);

    expect(response.status).equals(200);
  });

  it('denies if one entry is invalid', async () => {
    const invalidTestCase = {
      brand: 'asd',
      size: ['test'],
      price: [0, 1000],
      ratingAverage: 5
    };

    const response = await request(app).post('/test/validateFilterDTO').send(invalidTestCase);

    expect(response.status).equals(400);
  });
});
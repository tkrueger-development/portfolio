import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import bodyParser from 'body-parser';

import { handleErrors } from './common/middleware/handle-errors';
import { handleNotFound } from './common/middleware/handle-not-found';

import { productsRouter } from './modules/products/products.router';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/products', productsRouter.get());

app.use('*', handleNotFound);
app.use(handleErrors);

export { app };
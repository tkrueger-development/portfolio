import axios from 'axios';
import { Product } from '../types/product';
import { ProductOverviewDTO} from '../types/product-dto';

import {
   BarFilterState,
   KiteFilterState,
   BoardFilterState,
   HarnessFilterState,
   WetsuitFilterState
  } from '../types/filter-state';

const windandwave = axios.create({ baseURL: 'http://localhost:4000/api' });

const fetchProductById = async ({ id }: { id: string }): Promise<Product & { id: string }> => {
  const { data } = await windandwave.get('/products/' + id);

  return data as Product & { id: string };
};

const fetchLatestProducts = async (): Promise<Array<ProductOverviewDTO>> => {
  const { data } = await windandwave.get('/products/latest-products/5');

  return data as Array<ProductOverviewDTO>;
};

const fetchPopularProducts = async (): Promise<Array<ProductOverviewDTO>> => {
  const { data } = await windandwave.get('/products/most-popular/5');
  
  return data as Array<ProductOverviewDTO>;
};

const fetchKites = async ({ filters }: { filters: Partial<KiteFilterState> }): Promise<Array<ProductOverviewDTO>> => {
  const { data } = await windandwave.post('/products/kites/20', filters);

  return data as Array<ProductOverviewDTO>;
};

const fetchBars = async ({ filters }: { filters: Partial<BarFilterState> }): Promise<Array<ProductOverviewDTO>> => {
  const { data } = await windandwave.post('/products/kitebars/20', filters);

  return data as Array<ProductOverviewDTO>;
};

const fetchBoards = async ({ filters }: { filters: Partial<BoardFilterState> }): Promise<Array<ProductOverviewDTO>> => {
  const { data } = await windandwave.post('/products/kiteboards/20', filters);

  return data as Array<ProductOverviewDTO>;
};

const fetchHarnesses = async ({ filters }: { filters: Partial<HarnessFilterState> }): Promise<Array<ProductOverviewDTO>> => {
  const { data } = await windandwave.post('/products/harnesses/20', filters);

  return data as Array<ProductOverviewDTO>;
};

const fetchWetsuits = async ({ filters }: { filters: Partial<WetsuitFilterState> }): Promise<Array<ProductOverviewDTO>> => {
  const { data } = await windandwave.post('/products/wetsuits/20', filters);

  return data as Array<ProductOverviewDTO>;
};

export { 
  fetchProductById,

  fetchLatestProducts, 
  fetchPopularProducts, 
  
  fetchKites, 
  fetchBars, 
  fetchBoards, 
  fetchHarnesses, 
  fetchWetsuits, 
};
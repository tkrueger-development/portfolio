import { ProductFilterOptions } from './filter-options';

type ProductFilterState = Omit<Partial<ProductFilterOptions>, 'ratingAverage'> & { ratingAverage?: number };

type KiteFilterState    = ProductFilterState;
type BoardFilterState   = ProductFilterState;
type HarnessFilterState = ProductFilterState;
type WetsuitFilterState = ProductFilterState;
type BarFilterState     = Omit<ProductFilterState, 'size'>;

export { 
  ProductFilterState,
  KiteFilterState,
  BoardFilterState,
  HarnessFilterState,
  WetsuitFilterState,
  BarFilterState
};
import { ProductFilterState } from '../../../../common/types/state/filter-state';

const cleanupFilters = ({ filters }: { filters: ProductFilterState }): ProductFilterState => {
  const keys = Object.keys(filters);
  const cleaned: ProductFilterState = {};

  keys.forEach((key) => {

    // remove ' m2' from kite filters
    if (key === 'size') {
      cleaned[key] = filters[key].map((entry) => entry.replace(' m2', ''));
      return;
    }

    // dont copy default price range
    if (key === 'price' && filters[key][0] === 0 && filters[key][1] === 1500) return;

    cleaned[key] = filters[key];
  });

  return cleaned;
};

const condenseFilters = ({ filters }: { filters: ProductFilterState }): ProductFilterState => {
  const condensed: ProductFilterState = {};
  const keys = Object.keys(filters);


  keys.forEach((key) => {
    const candidate = filters[key];

    if (Array.isArray(candidate)) {
      if (candidate.length !== 0) condensed[key] = candidate;

    }

    if (typeof candidate === 'number' && candidate > 0) condensed[key] = candidate;
  });

  return condensed;
};

const createFilterDTO = ({ filters }: { filters: ProductFilterState }): ProductFilterState => {
  const condensed = condenseFilters({ filters });
  const cleaned   = cleanupFilters({ filters: condensed });

  return cleaned;
};

export { createFilterDTO };
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchHarnesses } from '../api/wind-and-wave';

import { useAppDispatch, useAppSelector } from '../state/hooks';
import { toggleBrandFilter, toggleSizeFilter, setPriceFilter, setRatingAverageFilter, resetFilters } from '../state/features/harness-filter-slice';

import { ProductFilterOptions } from '../../../common/types/state/filter-options';

import { createFilterDTO } from './util/create-filter-dto';
import { getFilterOptions } from './util/get-filter-options';

import { Container } from '../components/technical/atoms/layout/container';
import { Group } from '../components/technical/atoms/layout/group';
import { AccordionFilter } from '../components/technical/molecules/accordion-filter';
import { RangeFilter } from '../components/technical/molecules/range-filter';
import { RatingFilter } from '../components/technical/molecules/rating-filter';
import { FilterButton } from '../components/domain/product/filter-button';
import { ProductGrid } from '../components/domain/product/product-grid';

const HarnessesCategory = () => {
  const [allPossibleFilters, setAllPossibleFilters] = useState<Partial<ProductFilterOptions>>({ });

  const filterState = useAppSelector((state) => state.harnessFilters);
  const dispatch = useAppDispatch();

  const { data: harnesses, isError, error, isLoading, refetch } = useQuery(
    ['harness'], 
    () => fetchHarnesses({ filters: createFilterDTO({ filters: filterState }) }), {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setAllPossibleFilters((state) => {
        if (Object.keys(state).length > 0) return state;

        return getFilterOptions({ products: data });
      });
    }
  });

  useEffect(() => () => { dispatch(resetFilters()); }, []);

  return (
    <Container center>
      {isLoading && <h2>Loading..</h2>}
      {isError   && <h2>{(error as Error).message}</h2>}

      {!isLoading && !isError &&
      <Group className={['flex-col', 'items-start', 'gap-x-4', 'md:flex-row', 'mx-auto', 'w-full']}>
        <div className='flex w-full md:w-72 mt-10 flex-col gap-4'>
          
          <AccordionFilter 
            label           = 'Brand'
            filterOptions   = {allPossibleFilters.brand}
            activeFilters   = {filterState.brand}
            update          = {(value: string) => dispatch(toggleBrandFilter(value))}
          />

          <AccordionFilter 
            label           = 'Size'
            filterOptions   = {allPossibleFilters.size}
            activeFilters   = {filterState.size}
            update          = {(value: string) => dispatch(toggleSizeFilter(value))}
          />

          <RangeFilter 
            label           = 'Price'
            defaultRange    = {allPossibleFilters.price}
            activeRange     = {filterState.price}
            update          = {(value: [number, number]) => dispatch(setPriceFilter(value))}
          />

          <RatingFilter
            label           = 'Rating'
            activeFilter    = {filterState.ratingAverage}
            update          = {(value: number) => dispatch(setRatingAverageFilter(value))}
          />

          <FilterButton onClick={refetch} />

        </div>
        <ProductGrid products={harnesses} />
      </Group>
      }

    </Container>
  );
};

export { HarnessesCategory };
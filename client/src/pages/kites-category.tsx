import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchKites } from '../api/wind-and-wave';

import { useAppDispatch, useAppSelector } from '../state/hooks';
import { toggleBrandFilter, toggleSizeFilter, setPriceFilter, setRatingAverageFilter, resetFilters } from '../state/features/kite-filter-slice';

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

const KitesCategory = () => {
  const [filterOptions, setFilterOptionss] = useState<Partial<ProductFilterOptions>>({ });

  const dispatch    = useAppDispatch();
  const filterState = useAppSelector((state) => state.kiteFilters);

  const { data: kites, isError, error, isLoading, refetch } = useQuery(
    ['kites'], 
    () => fetchKites({ filters: createFilterDTO({ filters: filterState }) }), {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setFilterOptionss((state) => {
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
            filterOptions   = {filterOptions.brand}
            activeFilters   = {filterState.brand}
            update          = {(value: string) => dispatch(toggleBrandFilter(value))}
          />

          <AccordionFilter 
            label           = 'Size'
            filterOptions   = {filterOptions.size}
            activeFilters   = {filterState.size}
            update          = {(value: string) => dispatch(toggleSizeFilter(value))}
          />

          <RangeFilter 
            label           = 'Price'
            defaultRange    = {filterOptions.price}
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
        <ProductGrid products={kites} />
      </Group>
      }

    </Container>
  );
};

export { KitesCategory };
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toggleListItem } from './util/toggle-list-item';
// import { BarFilterState } from '../../../../common/types/bar-filter-state';

interface BarFilterState {
  brand?:         Array<string>;
  price?:         [number, number];
  ratingAverage?: number;
}

const initialState: BarFilterState = {
  brand:         [],
  price:         [0, 1500],
  ratingAverage: 0
};

const barFilterSlice = createSlice({
  initialState,
  name : 'bar-filter',

  reducers: {
    toggleBrandFilter: (state, action: PayloadAction<string>) => {
      state.brand = toggleListItem({ list: state.brand, filterName: action.payload });
    },

    setPriceFilter: (state, action: PayloadAction<BarFilterState['price']>) => {
      state.price = action.payload;
    },

    setRatingAverageFilter: (state, action: PayloadAction<BarFilterState['ratingAverage']>) => {
      if (state.ratingAverage === action.payload) {
        state.ratingAverage = initialState.ratingAverage;
        return;
      }

      state.ratingAverage = action.payload;
    },

    resetFilters: (state) => { 
        state.brand         = initialState.brand;
        state.price         = initialState.price;
        state.ratingAverage = initialState.ratingAverage;
    }
  }
});

export { BarFilterState };
export default barFilterSlice.reducer;
export const { toggleBrandFilter, setPriceFilter, setRatingAverageFilter, resetFilters } = barFilterSlice.actions;
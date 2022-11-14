import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toggleListItem } from './util/toggle-list-item';

interface KiteFilterState {
  brand:         Array<string>;
  size:          Array<string>;
  price:         [number, number];
  ratingAverage: number;
}

const initialState: KiteFilterState = {
  brand: [],
  size: [],
  price: [0, 1500],
  ratingAverage: 0,
};

const kiteFilterSlice = createSlice({
  initialState,
  name : 'kite-filter',

  reducers: {
    toggleBrandFilter: (state, action: PayloadAction<string>) => {
      state.brand = toggleListItem({ list: state.brand, filterName: action.payload });
    },

    toggleSizeFilter: (state, action: PayloadAction<string>) => {
      state.size = toggleListItem({ list: state.size, filterName: action.payload });
    },

    setPriceFilter: (state, action: PayloadAction<KiteFilterState['price']>) => {
      state.price = action.payload;
    },

    setRatingAverageFilter: (state, action: PayloadAction<KiteFilterState['ratingAverage']>) => {
      if (state.ratingAverage === action.payload) {
        state.ratingAverage = initialState.ratingAverage;
        return;
      }

      state.ratingAverage = action.payload;
    },

    resetFilters: (state) => { 
        state.brand         = initialState.brand;
        state.size          = initialState.size;
        state.price         = initialState.price;
        state.ratingAverage = initialState.ratingAverage;
    }
  }
});

export { KiteFilterState };
export default kiteFilterSlice.reducer;
export const { toggleBrandFilter, toggleSizeFilter, setPriceFilter, setRatingAverageFilter, resetFilters } = kiteFilterSlice.actions;
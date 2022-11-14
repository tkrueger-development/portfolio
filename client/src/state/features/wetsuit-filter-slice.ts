import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toggleListItem } from './util/toggle-list-item';

interface WetsuitFilterState {
  brand:         Array<string>;
  size:          Array<string>;
  price:         [number, number];
  ratingAverage: number;
}

const initialState: WetsuitFilterState = {
  brand:         [],
  size:          [],
  price:         [0, 1500],
  ratingAverage: 0
};

const wetsuitFilterSlice = createSlice({
  initialState,
  name : 'wetsuit-filter',

  reducers: {
    toggleBrandFilter: (state, action: PayloadAction<string>) => {
      state.brand = toggleListItem({ list: state.brand, filterName: action.payload });
    },

    toggleSizeFilter: (state, action: PayloadAction<string>) => {
      state.size = toggleListItem({ list: state.size, filterName: action.payload });
    },

    setPriceFilter: (state, action: PayloadAction<WetsuitFilterState['price']>) => {
      state.price = action.payload;
    },

    setRatingAverageFilter: (state, action: PayloadAction<WetsuitFilterState['ratingAverage']>) => {
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

export { WetsuitFilterState };
export default wetsuitFilterSlice.reducer;
export const { toggleBrandFilter, toggleSizeFilter, setPriceFilter, setRatingAverageFilter, resetFilters } = wetsuitFilterSlice.actions;
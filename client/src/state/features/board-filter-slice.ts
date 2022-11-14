import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toggleListItem } from './util/toggle-list-item';

interface BoardFilterState {
  brand:         Array<string>;
  size:          Array<string>;
  price:         [number, number];
  ratingAverage: number;
}

const initialState: BoardFilterState = {
  brand:         [],
  size:          [],
  price:         [0, 1500],
  ratingAverage: 0
};

const boardFilterSlice = createSlice({
  initialState,
  name : 'board-filter',

  reducers: {
    toggleBrandFilter: (state, action: PayloadAction<string>) => {
      state.brand = toggleListItem({ list: state.brand, filterName: action.payload });
    },

    toggleSizeFilter: (state, action: PayloadAction<string>) => {
      state.size = toggleListItem({ list: state.size, filterName: action.payload });
    },

    setPriceFilter: (state, action: PayloadAction<BoardFilterState['price']>) => {
      state.price = action.payload;
    },

    setRatingAverageFilter: (state, action: PayloadAction<BoardFilterState['ratingAverage']>) => {
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

export { BoardFilterState };
export default boardFilterSlice.reducer;
export const { toggleBrandFilter, toggleSizeFilter, setPriceFilter, setRatingAverageFilter, resetFilters } = boardFilterSlice.actions;
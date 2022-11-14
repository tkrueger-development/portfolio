import { configureStore } from '@reduxjs/toolkit';

import kiteFilterReducer from './features/kite-filter-slice';
import barFilterReducer from './features/bar-filter-slice';
import boardFilterReducer from './features/board-filter-slice';
import harnessFilterReducer from './features/harness-filter-slice';
import wetsuitFilterReducer from './features/wetsuit-filter-slice';

const store = configureStore({
  reducer: {
    kiteFilters: kiteFilterReducer,
    barFilters: barFilterReducer,
    boardFilters: boardFilterReducer,
    harnessFilters: harnessFilterReducer,
    wetsuitFilters: wetsuitFilterReducer
  }
});

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;

export { store, AppDispatch, RootState };
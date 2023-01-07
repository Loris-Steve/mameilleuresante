import { configureStore, ThunkAction, Action, createSlice } from '@reduxjs/toolkit';

import { IngredientModel } from "../models/IngredientModel";

const counterSlice = createSlice({
  name: 'counter',
  initialState: {},
  reducers: {}
});
export const store = configureStore({
  reducer: {
    reducer: counterSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

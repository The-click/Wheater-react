import  daysReducer from './daysReducer';
import { configureStore } from "@reduxjs/toolkit";


export const store = configureStore({
    reducer: {
      daysData: daysReducer,
    },
  });


import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  currentDay:{},
  forecastDays:[],
  isDay: true,
}

export const weatherSlice = createSlice({
  name: 'weather-data',
  initialState,
  reducers: {
    loadCurrentDay: (state, action) => {  
        state.currentDay = action.payload;
    },
    loadForecastDays: (state, action) => {  
        state.forecastDays = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { loadCurrentDay, loadForecastDays, incrementByAmount } = weatherSlice.actions

export default weatherSlice.reducer
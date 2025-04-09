import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  forecast: null,
  loading: false,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setForecast: (state, action) => {
      state.forecast = action.payload;
    },
    setWeatherLoading: (state, action) => {
      state.loading = action.payload;
    },
    resetWeather: (state) => {
      state.forecast = null;
      state.loading = false;
    },
  },
});

export const { setForecast, setWeatherLoading, resetWeather } = weatherSlice.actions;
export default weatherSlice.reducer;

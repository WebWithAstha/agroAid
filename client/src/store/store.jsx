import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import agmarknetSlice from "./slices/agarmarknetSlice.jsx";
import weatherSlice from "./slices/weatherSlice.jsx";
import pesticidesSlice from "./slices/pesticidesSlice.jsx";

export const store = configureStore({
  reducer: {
    authReducer: authSlice,
    agmarknetReducer: agmarknetSlice,
    weatherReducer: weatherSlice,
    pesticidesReducer: pesticidesSlice,
  },
});

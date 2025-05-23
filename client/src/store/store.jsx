import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import agmarknetSlice from "./slices/agarmarknetSlice.jsx";
import weatherSlice from "./slices/weatherSlice.jsx";
import cropSlice from './slices/cropSlice.jsx'
import diagnosisSlice from "./slices/diagnosisSlice.jsx";
import querySlice from "./slices/querySlice.jsx";
import  blockchainSlice from "./slices/blockChainSlice.jsx";

export const store = configureStore({
  reducer: {
    authReducer: authSlice,
    agmarknetReducer: agmarknetSlice,
    weatherReducer: weatherSlice,
    cropReducer:cropSlice,
    diagnosisReducer: diagnosisSlice,
    queryReducer: querySlice,
    blockchainReducer: blockchainSlice,
  },
});

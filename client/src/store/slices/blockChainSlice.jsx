// src/redux/slices/blockchainSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  account: null,
  balance: null,
  loading: false,
};

export const blockchainSlice = createSlice({
  name: 'blockchain',
  initialState,
  reducers: {
    setAccount: (state, action) => {
      state.account = action.payload;
    },
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    resetBlockchain: (state) => {
      state.account = null;
      state.balance = null;
      state.loading = false;
    },
  },
});

export const { setAccount, setBalance, setLoading, resetBlockchain } = blockchainSlice.actions;
export default blockchainSlice.reducer;

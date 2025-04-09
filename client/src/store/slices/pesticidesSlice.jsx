import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pesticides: [],
  loading: false,
};

const pesticidesSlice = createSlice({
  name: "pesticides",
  initialState,
  reducers: {
    setPesticides: (state, action) => {
      state.pesticides = action.payload;
    },
    setPesticidesLoading: (state, action) => {
      state.loading = action.payload;
    },
    resetPesticides: (state) => {
      state.pesticides = [];
      state.loading = false;
    },
  },
});

export const { setPesticides, setPesticidesLoading, resetPesticides } = pesticidesSlice.actions;
export default pesticidesSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
};

const agmarknetSlice = createSlice({
  name: "agmarknet",
  initialState,
  reducers: {
    setAgmarknetData: (state, action) => {
      state.data = action.payload;
    },
    setAgmarknetLoading: (state, action) => {
      state.loading = action.payload;
    },
    resetAgmarknet: (state) => {
      state.data = [];
      state.loading = false;
    },
  },
});

export const { setAgmarknetData, setAgmarknetLoading, resetAgmarknet } = agmarknetSlice.actions;
export default agmarknetSlice.reducer;

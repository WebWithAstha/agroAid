import { createSlice } from '@reduxjs/toolkit';

const querySlice = createSlice({
  name: 'queries',
  initialState: {
    queries: null,
    botTyping: false,
  },
  reducers: {
    loadQueries: (state, action) => {
      state.queries = action.payload;
      state.botTyping = false;
    },
    addTempQuery: (state, action) => {
      state.queries.push(action.payload);
      state.botTyping = true;
    }
  },
});

export const { loadQueries, addTempQuery } = querySlice.actions;
export default querySlice.reducer;

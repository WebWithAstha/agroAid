import { createSlice } from '@reduxjs/toolkit';

const querySlice = createSlice({
  name: 'queries',
  initialState: {
    queries: null,
    botTyping: false,
  },
  reducers: {
    setQueriesFromStorageOrAPI: (state, action) => {
      state.queries = action.payload;
    },
    addTempQuery: (state, action) => {
      state.queries.push(action.payload);
      state.botTyping = true;
    },
    updateQueryWithResponse: (state, action) => {
      const {queryWithResponse,tempId} = action.payload;
      state.queries = state.queries.map(q =>
        q.id === tempId ? queryWithResponse : q
      );
      state.botTyping = false;
    },
  },
});

export const { setQueriesFromStorageOrAPI, addTempQuery, updateQueryWithResponse } = querySlice.actions;
export default querySlice.reducer;

import { Axios } from "../../utils/axios";
import {
  setQueriesFromStorageOrAPI,
  addTempQuery,
  updateQueryWithResponse
} from '../slices/querySlice.jsx';

const SESSION_KEY = "farming-queries";

// Load queries on initial page load
export const loadQueries = () => async (dispatch) => {
  const cached = sessionStorage.getItem(SESSION_KEY);
  console.log("cached data ",cached)
  if (cached) {
    dispatch(setQueriesFromStorageOrAPI(JSON.parse(cached)));
  } else {
    try {
        console.log("hello")
      const res = await Axios.get('/assist/user-queries'); // your GET API
      console.log(res)
      dispatch(setQueriesFromStorageOrAPI(res.data));
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(res.data));
    } catch (err) {
        console.log(err)
      console.error("Failed to load queries", err);
    }
  }
};

// Send user query (text or voice)
export const sendUserQuery = (queryText, isVoice = false) => async (dispatch, getState) => {
  const tempId = Date.now();

  const tempQuery = {
    id: tempId,
    query: queryText,
    isVoice,
    createdAt: new Date().toISOString(),
    response: null,
  };

  dispatch(addTempQuery(tempQuery));

  try {
    const res = await Axios.post('/assist/query', {
      data: queryText,
      isVoice,
    });

    const queryWithResponse = res.data;

    dispatch(updateQueryWithResponse(queryWithResponse,tempId));

    // ✅ Update sessionStorage too
    const updatedQueries = getState().queries.queries;
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(updatedQueries));
  } catch (error) {
    console.error('Query error:', error);
    const fallback = {
      ...tempQuery,
      response: {
        text: "Something went wrong. Please try again later.",
        audioUrl: null,
      },
    };
    dispatch(updateQueryWithResponse(fallback));

    const updatedQueries = getState().queries.queries;
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(updatedQueries));
  }
};

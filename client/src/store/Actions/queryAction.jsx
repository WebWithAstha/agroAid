import { Axios } from "../../utils/axios";
import {
  loadQueries,
  addTempQuery,
} from '../slices/querySlice.jsx';

const SESSION_KEY = "farming-queries";

// Load queries on initial page load
export const loadUserQueries = () => async (dispatch) => {
  const cached = sessionStorage.getItem(SESSION_KEY);
  if (cached) {
    dispatch(loadQueries(JSON.parse(cached)));
    console.log("queries fetch from cache")
  } else {
    try {
        console.log("hello")
      const res = await Axios.get('/assist/user-queries'); // your GET API
      dispatch(loadQueries(res.data.data));
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(res.data.data));
      console.log("queries fetch from bk")
    } catch (err) {
      console.log(err)
      console.log("Failed to fetch queries")
      console.error("Failed to load queries", err);
    }
  }
};

// Send user query (text or voice)
export const sendUserQuery = (queryText, isVoice = false) => async (dispatch, getState) => {
  const tempId = Date.now();

  const tempQuery = {
    _id: tempId,
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
    const curQueries = getState().queryReducer.queries;

    const queryWithResponse = res.data.data;
    console.log(res.data.data)
    const updatedQueries = curQueries.map(q=> q._id === tempId ? queryWithResponse :q)
    dispatch(loadQueries(updatedQueries))

    sessionStorage.setItem(SESSION_KEY, JSON.stringify(updatedQueries));
  } catch (error) {
    console.error('Query error:', error);
    console.log("err getting response for wuery")
  }
};

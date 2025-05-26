import { Axios } from "../../utils/axios";

import { setAllDiagnosis, setDiagnosisLoading, selectDiagnosis } from "../slices/diagnosisSlice.jsx";

export const fetchAllDiagnosisAction = () => async (dispatch) => {
  try {
    dispatch(setDiagnosisLoading(true));
    const response = await Axios.get("/services/all-diagnosis"); // change to your API
    // console.log(response.data)
    dispatch(setAllDiagnosis(response.data.data));
  } catch (err) {
    console.error("Failed to fetch diagnosis", err);
  } finally {
    dispatch(setDiagnosisLoading(false));
  }
};
export const uploadForDiagnosisAction = (file) => async (dispatch,getState) => {
  try {
    dispatch(setDiagnosisLoading(true));
    const response = await Axios.post("/services/diagnosis", {
        images: Array.isArray(file) ? file : [file],
        "similar_images" :true // ensure it's always an array
    });
    // console.log("diagnosed data fetched")
    let allDiagnosis = getState().diagnosisReducer.allDiagnosis;
    let copyAllDia = [...allDiagnosis,response.data.data]
    dispatch(setAllDiagnosis(copyAllDia));
    dispatch(selectDiagnosis(response.data.data._id))
    dispatch(setDiagnosisLoading(false));
  } catch (err) {
    console.error("Failed to fetch diagnosis", err);
  } finally {
    dispatch(setDiagnosisLoading(false));
  }
};
// 
export const selectDiagnosisAction = (id) => async (dispatch) => {
  dispatch(setDiagnosisLoading(true));
  dispatch(selectDiagnosis(id))
  dispatch(setDiagnosisLoading(false));
};

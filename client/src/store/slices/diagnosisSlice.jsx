import { createSlice } from "@reduxjs/toolkit";

// Get initial data from sessionStorage if available
const storedDiagnosis = sessionStorage.getItem("allDiagnosis");
const parsedDiagnosis = storedDiagnosis ? JSON.parse(storedDiagnosis) : null;

const initialState = {
  allDiagnosis: parsedDiagnosis,
  loading: false,
  selectedDiagnosis: null,
};

const updateSessionStorage = (data) => {
  sessionStorage.setItem("allDiagnosis", JSON.stringify(data));
};

const diagnosisSlice = createSlice({
  name: "diagnosis",
  initialState,
  reducers: {
    setDiagnosisLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAllDiagnosis: (state, action) => {
      state.allDiagnosis = action.payload;
      updateSessionStorage(state.allDiagnosis);
    },
    selectDiagnosis: (state, action) => {
      state.selectedDiagnosis = action.payload; // payload is the _id string
      sessionStorage.setItem("selectedDiagnosisId", action.payload);
    }
  },
});

export const {
  setDiagnosisLoading,
  setAllDiagnosis,
  selectDiagnosis,
} = diagnosisSlice.actions;

export default diagnosisSlice.reducer;
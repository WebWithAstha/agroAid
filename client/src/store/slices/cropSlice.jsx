import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allCrops: [],
    myCrops:[],
    loading: false,
};

const cropSlice = createSlice({
    name: "crop",
    initialState,
    reducers: {
        setallCrops: (state, action) => {
            state.allCrops = action.payload;
        },
        addAllCrop: (state, action) => {
            state.allCrops.push(action.payload);
        },
        setMyCrops: (state, action) => {
            state.myCrops = action.payload;
        },
        addMyCrop: (state, action) => {
            state.myCrops.push(action.payload);
        },
        setCropLoading: (state, action) => {
            state.loading = action.payload;
        },
        removeMyCrop: (state, action) => {
            state.myCrops = state.myCrops.filter(crop => crop._id !== action.payload);
        },
        updateMyCrop: (state, action) => {
            const index = state.myCrops.findIndex(crop => crop._id === action.payload._id);
            if (index !== -1) {
                state.myCrops[index] = action.payload;
            }
        },
    },  
});

export const {
    setCropLoading,
    setMyCrops,
    setallCrops,
    addAllCrop,
    addMyCrop,
    removeMyCrop,
    updateMyCrop
} = cropSlice.actions;

export default cropSlice.reducer;

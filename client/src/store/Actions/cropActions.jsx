import {
    setallCrops,
    addAllCrop,
    setMyCrops,
    addMyCrop,
    setCropLoading,
    removeMyCrop,
    updateMyCrop,
} from "../slices/cropSlice";

import {
    getAllCrops,
    getMyCrops,
    addCrop,
    deleteCrop,
    getCropById,
} from "../../Services/cropService.js";

export const fetchAllCrops = () => async (dispatch) => {
    try {
        dispatch(setCropLoading(true));
        const data = await getAllCrops();
        dispatch(setallCrops(data.data));
    } catch (error) {
        console.error("Error in fetchAllCrops:", error);
    } finally {
        dispatch(setCropLoading(false));
    }
};

// Fetch current user's crops
export const fetchMyCrops = () => async (dispatch) => {
    try {
        dispatch(setCropLoading(true));
        const data = await getMyCrops();
        dispatch(setMyCrops(data.data));
    } catch (error) {
        console.error("Error in fetchMyCrops:", error);
    } finally {
        dispatch(setCropLoading(false));
    }
};

// Create new crop
export const createCrop = (cropData) => async (dispatch) => {
    try {
        dispatch(setCropLoading(true));
        const data = await addCrop(cropData);
        console.log(data);
        
        dispatch(addMyCrop(data.data));
        dispatch(addAllCrop(data.data));
    } catch (error) {
        console.error("Error in createCrop:", error);
    } finally {
        dispatch(setCropLoading(false));
    }
};

// Delete a crop
export const removeCrop = (id) => async (dispatch) => {
    try {
        dispatch(setCropLoading(true));
        await deleteCrop(id);
        dispatch(removeMyCrop(id));
    } catch (error) {
        console.error("Error in removeCrop:", error);
    } finally {
        dispatch(setCropLoading(false));
    }
};

// Get a single crop (if needed temporarily)
export const fetchCropById = (id) => async () => {
    try {
        const data = await getCropById(id);
        return data.data;
    } catch (error) {
        console.error("Error in fetchCropById:", error);
        throw error;
    }
};

// Update crop data in myCrops list (assuming cropData contains _id)
export const updateCropInStore = (cropData) => (dispatch) => {
    dispatch(updateMyCrop(cropData));
};

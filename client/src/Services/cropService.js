// src/services/cropService.js
import { Axios } from "../utils/axios";

export const getAllCrops = async () => {
  try {
    const response = await Axios.get("/crops/all");
    return response.data;
  } catch (error) {
    console.error("Error fetching crops:", error);
    throw error;
  }
};
export const getMyCrops = async () => {
  try {
    const response = await Axios.get("/crops/my-crops");
    return response.data;
  } catch (error) {
    console.error("Error fetching crops:", error);
    throw error;
  }
};

export const addCrop = async (cropData) => {
  try {
    const response = await Axios.post("/crops/create", cropData);
    return response.data;
  } catch (error) {
    console.error("Error adding crop:", error);
    throw error;
  }
};

export const deleteCrop = async (id) => {
  try {
    const response = await Axios.delete(`/crops/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting crop:", error);
    throw error;
  }
};

export const getCropById = async (id) => {
  try {
    const response = await Axios.get(`/crops/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching crop:", error);
    throw error;
  }
};

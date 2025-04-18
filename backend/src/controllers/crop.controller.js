import Crop from '../models/crop.model.js';
import { badRequest, forbiddenResponse, serverError, successResponse, errorResponse } from '../utils/responseHandler.js';

export const createCrop = async (req, res) => {
  try {
    const { name, image, location, description, harvestDate, deliveryAvailable, totalQuantity, perQuintalPrice } = req.body;
    const existingCrop = await Crop.findOne({
      name,
      user: req.user._id,
      location,
    });
    if (existingCrop) return badRequest(res, "Crop already listed at this location.");
    const newCrop = new Crop({
      name,
      user: req.user._id,
      image,
      description,
      location,
      harvestDate,
      deliveryAvailable,
      totalQuantity,
      perQuintalPrice,
    });
    await newCrop.save();
    return successResponse(res, { crop: newCrop }, "Crop created successfully'")
  } catch (error) {
    return serverError(res, error.message)
  }
};


export const getAllCrops = async (req, res) => {
  try {
    const crops = await Crop.find().populate('user').select("-refreshToken");
    return successResponse(res, crops, "Fetched all crops successfully");
  } catch (error) {
    return serverError(res, 'Failed to fetch crops');
  }
};

export const getUserCrops = async (req, res) => {
  try {
    const crops = await Crop.find({ user: req.user._id });
    return successResponse(res, crops, "Fetched user crops successfully");
  } catch (error) {
    return serverError(res, 'Failed to fetch crops');
  }
};
export const deleteCrop = async (req, res) => {
  try {
    const { id } = req.params;
    const crop = await Crop.findById(id);
    if (!crop) {
      return errorResponse(res, "Crop not found", 404);
    }
    if (!crop.user.equals(req.user._id)) return forbiddenResponse(res)
    await crop.deleteOne();
    return successResponse(res, null, "Crop deleted successfully");
  } catch (error) {
    return serverError(res, "Failed to delete crop");
  }
};


export const getCropById = async (req, res) => {
  try {
    const { id } = req.params;
    const crop = await Crop.findById(id);
    if (!crop) {
      return errorResponse(res, "Crop not found", 404);
    }
    return successResponse(res, crop, "Crop fetched successfully");
  } catch (error) {
    return serverError(res, "Failed to fetch crop");
  }
};
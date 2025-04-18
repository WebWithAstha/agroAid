import Crop from '../models/crop.model.js';
import { badRequest, serverError, successResponse } from '../utils/responseHandler.js';

export const createCrop = async (req, res) => {
    try {
        const { name, image, location, harvestDate, deliveryAvailable, totalQuantity, perQuintalPrice } = req.body;
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
        const crops = await Crop.find().populate('user', 'name email');
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

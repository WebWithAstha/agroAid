import axios from 'axios';
import { config } from '../config/config.js';
import { successResponse, errorResponse, badRequest, serverError } from '../utils/responseHandler.js';
import { Diagnosis } from '../models/diagonsis.model.js';
import { getDiseaseDetailByGemini } from '../services/gemini.diagnosis.service.js';
import marketModel from '../models/market.model.js';
import ImageKit from "imagekit";
import redis from '../services/redis.service.js';


// controller
export const agmarknetController = async (req, res) => {
    try {
        const today = new Date();
        const formattedDate = today.toLocaleDateString('en-GB'); // dd/mm/yyyy

        // Pagination params from query (default page 1, limit 10)
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Fetch data from API
        const { data } = await axios.get('https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070', {
            params: {
                'api-key': config.AGMARKNET_API_KEY,
                format: 'json',
                limit: 100,
            },
        });

        const crops = data.records;

        await Promise.all(crops.map(async ({ commodity: name, market, max_price, min_price }) => {
            const existing = await marketModel.findOne({ name, market });

            if (existing) {
                const alreadyExists = existing.prices.some(p => p.date === formattedDate);
                if (!alreadyExists) {
                    existing.prices.push({ max_price, min_price, date: formattedDate });
                    existing.prices = existing.prices
                        .sort((a, b) => new Date(b.date.split('/').reverse().join('/')) - new Date(a.date.split('/').reverse().join('/')))
                        .slice(0, 5);
                    await existing.save();
                }
            } else {
                await marketModel.create({
                    name,
                    market,
                    prices: [{ max_price, min_price, date: formattedDate }],
                });
            }
        }));

        // Paginated response
        const total = await marketModel.countDocuments();
        const updatedData = await marketModel.find().skip(skip).limit(limit);

        return successResponse(res, {
            data: updatedData,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
                hasNextPage: page * limit < total,
                hasPrevPage: page > 1,
            }
        }, 'Agmarknet data fetched successfully.');
    } catch (error) {
        console.error('Agmarknet Error:', error.message);
        return errorResponse(res, 'Failed to fetch Agmarknet data', error.status || 500);
    }
};


export const weatherController = async (req, res) => {
    const { city = 'bhopal' } = req.query;

    if (!city) {
        return badRequest(res, 'City is required');
    }

    try {
        const forecastCache = await redis.get(`${city}-forecast`);
        const currentCache = await redis.get(`${city}-current`);
        
        if (forecastCache && currentCache) {
            const parsedForecast = JSON.parse(forecastCache);
            const parsedCurrent = JSON.parse(currentCache);
            return successResponse(res, {
                forecastResponse: parsedForecast,
                currentResponse: parsedCurrent
            }, 'Weather data fetched successfully from cache');
        }
        const forecastResponse = await axios.get('https://api.weatherapi.com/v1/forecast.json', {
            params: {
                key: config.WEATHER_API_KEY,
                q: city,
                aqi: 'no',
                days: 6
            },
        });
        const currentResponse = await axios.get('https://api.weatherapi.com/v1/forecast.json', {
            params: {
                key: config.WEATHER_API_KEY,
                q: city,
                aqi: 'no',
            },
        });
        await redis.set(`${city}-forecast`, JSON.stringify(forecastResponse.data), 'EX', 3600);
        await redis.set(`${city}-current`, JSON.stringify(currentResponse.data), 'EX', 3600);
        return successResponse(res, {
            forecastResponse: forecastResponse.data,
            currentResponse: currentResponse.data
        }, 'Weather data fetched successfully from API');
    } catch (error) {
        console.error('Weather API Error:', error.message);
        return errorResponse(res, 'Failed to fetch weather data', error.response?.status || 500);
    }
};


export const cropHealthController = async (req, res) => {
    const requestData = req.body;

    const axiosConfig = {
        method: 'post',
        url: 'https://crop.kindwise.com/api/v1/identification',
        headers: {
            'Api-Key': config.CROP_HEALTH_API_KEY,
            'Content-Type': 'application/json',
        },
        data: requestData,
        maxBodyLength: Infinity,
    };

    try {
        const response = await axios(axiosConfig);
        // console.log(response.data.result.is_plant)
        if (response.data.result.is_plant.probability < 0.03)
            return errorResponse(res, 'Only crop images allowed.', 404);
        // console.log(response.data.result.disease.suggestions[0].similar_images)
        const { name, scientific_name: scientificName, probability } = response.data.result.disease.suggestions[0]
        const similarImages = response.data.result.disease.suggestions[0].similar_images.map(img => img.url);

        // console.log(response.data.result.disease.suggestions[0].similarImages)
        const { description, treatment, symptoms, preventions } = await getDiseaseDetailByGemini(name, scientificName);
        const diagnosis = await Diagnosis.create({
            userId: '67fccf1dd19811b34b9daee9',
            disease: name,
            scientificName,
            description, treatment, symptoms, preventions,
            severity: probability,
            similarImages,
            image: response.data.input.images[0],
        })
        // console.log(diagnosis)
        return successResponse(res, diagnosis, 'Crop health data fetched successfully');
    } catch (error) {
        console.error('Crop Health API Error:', error.message);
        return errorResponse(res, 'Failed to fetch crop health data', error?.status);
    }
};

export const getAllDiagnosis = async (req, res) => {
    try {
        const allDiagnosis = await Diagnosis.find({ userId: '67fccf1dd19811b34b9daee9' })
        return successResponse(res, allDiagnosis, 'All diagnosis fetched!');
    } catch (error) {
        console.log(error)
        return errorResponse(res, 'Failed to fetch crop health data', error?.status);
    }
}

export const uploadFileController = async (req, res) => {
    if (!req.files || !req.files.data) {
        return badRequest(res, 'No file uploaded. Please upload an image file.');
    }
    const data = req.files.data;
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.mp3'];
    const fileExtension = data.name.slice(((data.name.lastIndexOf(".") - 1) >>> 0) + 2);
    if (!allowedExtensions.includes(`.${fileExtension.toLowerCase()}`)) {
        return badRequest(res, 'Invalid file type. Only files (.jpg, .jpeg, .png, .gif , .mp3) are allowed.');
    }
    const imagekit = new ImageKit({
        publicKey: config.imageKit.publicKey,
        privateKey: config.imageKit.privateKey,
        urlEndpoint: config.imageKit.urlEndpoint,
    });

    try {
        const response = await imagekit.upload({
            file: data.data,
            fileName: data.name,
            useUniqueFileName: true,
        });
        return successResponse(res, response, 'File uploaded successfully.');
    } catch (error) {
        console.error('Error uploading file to ImageKit:', error);
        return serverError(res, 'Failed to upload file to ImageKit.');
    }
};
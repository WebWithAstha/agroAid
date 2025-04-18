import axios from 'axios';
import { config } from '../config/config.js';
import { successResponse, errorResponse, badRequest } from '../utils/responseHandler.js';
import { Diagnosis } from '../models/diagonsis.model.js';
import { getDiseaseDetailByGemini } from '../services/gemini.diagnosis.service.js';
import marketModel from '../models/market.model.js';

// controller
export const agmarknetController = async (req, res) => {
    try {
        const today = new Date();
        const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
        const response = await axios.get('https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070', {
            params: {
                'api-key': config.AGMARKNET_API_KEY,
                format: 'json',
                limit: 100,
            },
        });
        const crops = response.data.records;
        for (const crop of crops) {
            const { commodity: name, market, max_price, min_price } = crop;
            const existing = await marketModel.findOne({ name, market });
            if (existing) {
                const isTodayInserted = existing.prices.some(p => p.date === formattedDate);
                if (!isTodayInserted) {
                    existing.prices.push({ max_price, min_price, date: formattedDate });
                    if (existing.prices.length > 5) {
                        existing.prices = existing.prices
                            .sort((a, b) => new Date(b.date.split('/').reverse().join('/')) - new Date(a.date.split('/').reverse().join('/')))
                            .slice(0, 5);
                    }
                    await existing.save();
                }
            } else {
                await marketModel.create({
                    name,
                    market,
                    prices: [{ max_price, min_price, date: formattedDate }],
                });
            }
        }
        const updatedData = await marketModel.find({})
        return successResponse(res, updatedData, 'Agmarknet data saved successfully.');
    } catch (error) {
        console.error('Agmarknet Error:', error.message);
        return errorResponse(res, 'Failed to fetch Agmarknet data', error.status);
    }
};

export const weatherController = async (req, res) => {
    const { city = 'bhopal' } = req.query;

    if (!city) {
        return badRequest(res, 'City is required');
    }

    try {

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

        return successResponse(res, { forecastResponse: forecastResponse.data, currentResponse: currentResponse.data }, 'Weather data fetched successfully');
    } catch (error) {
        console.error('Weather API Error:', error.message);
        return errorResponse(res, 'Failed to fetch weather data', error.status);
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
        if(response.data.result.is_plant.probability < 0.03 ) 
            return errorResponse(res, 'Only crop images allowed.', 404);
        // console.log(response.data.result.disease.suggestions[0].similar_images)
        const {name,scientific_name:scientificName,probability} = response.data.result.disease.suggestions[0]
        const similarImages = response.data.result.disease.suggestions[0].similar_images.map(img => img.url);

        // console.log(response.data.result.disease.suggestions[0].similarImages)
        const {description,treatment,symptoms,preventions} = await getDiseaseDetailByGemini(name,scientificName);
        const diagnosis = await Diagnosis.create({
            userId:'67fccf1dd19811b34b9daee9',
            disease:name,
            scientificName,
            description,treatment,symptoms,preventions,
            severity:probability,
            similarImages,
            image:response.data.input.images[0],
        }) 
        // console.log(diagnosis)
        return successResponse(res, diagnosis, 'Crop health data fetched successfully');
    } catch (error) {
        console.error('Crop Health API Error:', error.message);
        return errorResponse(res, 'Failed to fetch crop health data', error?.status);
    }
};

export const getAllDiagnosis = async(req,res)=>{
    try {
        const allDiagnosis = await Diagnosis.find({userId:'67fccf1dd19811b34b9daee9'})
        return successResponse(res, allDiagnosis, 'All diagnosis fetched!'); 
    } catch (error) {
        console.log(error)
        return errorResponse(res, 'Failed to fetch crop health data', error?.status);
    }
}

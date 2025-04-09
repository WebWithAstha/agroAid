import { agmarknetAxios } from "../utils/axios";

export const getPrices = async (state, district, commodity, market) => {
    try {
        const response = await agmarknetAxios.get('/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001a349e2e3517944ba781b776b9d7fa71f&format=json&offset=0&limit=10');
        return response;
    } catch (error) {
        console.error("Error fetching prices:", error);
        throw error;
    }
}
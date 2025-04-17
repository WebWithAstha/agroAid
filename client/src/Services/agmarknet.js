import { Axios } from "../utils/axios";

export const getPrices = async (offset) => {
    try {
        const response = await Axios.get('/services/agmarknet?offset=0');
        return response;
    } catch (error) {
        console.error("Error fetching prices:", error);
        throw error;
    }
}
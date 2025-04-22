import { toast } from "sonner";
import { Axios } from "../utils/axios";

export const getPrices = async (page=0) => {
    try {
        const response = await Axios.get(`/services/agmarknet?page=${page}`);
        return response;
    } catch (error) {
        throw error;
    }
}
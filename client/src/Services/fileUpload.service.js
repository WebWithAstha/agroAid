import { Axios } from "../utils/axios";

export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("data", file);
    try {
        const response = await Axios.post("/services/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
import { Axios } from "../../utils/axios";
import { setPesticides, setPesticidesLoading, resetPesticides } from "../slices/pesticidesSlice";


export const fetchPesticides = (file) => async (dispatch) => {
    try {
        dispatch(setPesticidesLoading(true));

        const response = await Axios.post("/services/crop-health", {
            images: Array.isArray(file) ? file : [file],
            "similar_images" :true // ensure it's always an array
        });

        console.log(response);
        dispatch(setPesticides(response.data.pesticides));
        dispatch(setPesticidesLoading(false));
    } catch (error) {
        console.error("Error fetching pesticides:", error);
        dispatch(setPesticidesLoading(false));
    }
};

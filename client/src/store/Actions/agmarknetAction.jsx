import { getPrices } from "../../Services/agmarknet";
import { setAgmarknetData, setAgmarknetLoading, resetAgmarknet } from "../slices/agarmarknetSlice";

export const fetchAgmarknetPrices = (page) => async (dispatch) => {
  try {
    dispatch(setAgmarknetLoading(true));
    const response = await getPrices(page); 
    const records = response?.data?.data || ['empty'];
    dispatch(setAgmarknetData(records));
    dispatch(setAgmarknetLoading(false));
  } catch (error) {
    console.error("Failed to fetch Agmarknet data:", error);
    dispatch(setAgmarknetLoading(false));
  }
};

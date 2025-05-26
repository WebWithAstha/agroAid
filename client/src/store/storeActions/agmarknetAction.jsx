import { toast } from "sonner";
import { getPrices } from "../../Services/agmarknet.service.js";
import { setAgmarknetData, setAgmarknetLoading, resetAgmarknet } from "../slices/agarmarknetSlice";

export const fetchAgmarknetPrices = (page) => async (dispatch) => {
  try {
    dispatch(setAgmarknetLoading(true));
    const response = await getPrices(page); 
    const records = response?.data?.data || ['empty'];
    dispatch(setAgmarknetData(records));
    dispatch(setAgmarknetLoading(false));
  } catch (error) {
    toast.error("Failed to fetch Agmarknet data.");
    dispatch(setAgmarknetLoading(false));
  }
};

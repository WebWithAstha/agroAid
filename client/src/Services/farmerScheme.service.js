import { Axios } from "../utils/axios";

export const getSchemeList = async () => {
  try {
    const response = await Axios.get("services/scheme-list");
    return response.data;
  } catch (error) {
    console.error("Error fetching scheme list:", error);
    return null;
  }
};

export const getSchemeDetails = async (schemeName) => {
  try {
    const response = await Axios.get("services/scheme-details", {
      params: {
        name: schemeName,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching scheme details:", error);
    return null;
  }
};

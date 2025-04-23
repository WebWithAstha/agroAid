// src/services/cropService.js
import { Axios } from "../utils/axios";

export const initiateDemoCall = async (setIsDisabled) => {
  try {
     await Axios.get("/ivr/start-call");
     setTimeout(() => {
      setIsDisabled(false);
    }, 1500); 
  } catch (error) {
    console.log(error)
    throw error;
  }
};

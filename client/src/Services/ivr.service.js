// src/services/cropService.js
import { Axios } from "../utils/axios";

export const initiateDemoCall = async () => {
  try {
     await Axios.get("/ivr/start-call");
  } catch (error) {
    throw error;
  }
};

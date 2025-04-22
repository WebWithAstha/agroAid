import { Axios } from "../utils/axios";
import { toast } from "sonner";

export const signinAndSignup = async (phoneNumber) => {
  try {
    const response = await Axios.post('/auth/signin-signup', { phone: phoneNumber });
    return { success: true, data: response.data };
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const verifyOtpAndAuthenticate = async (phoneNumber, otp) => {
  try {
    const response = await Axios.post('/auth/verify-otp', { phone: phoneNumber, otp });
    return { success: true, data: response.data };
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const updateDetails = async (userData) => {
  try {
    const response = await Axios.post('/auth/update', userData);
    return { success: true, data: response.data };
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const fetchCurrentUser = async () => {
  try {
    const response = await Axios.get('/auth/current-user');
    return { success: true, data: response.data };
  } catch (error) {
    return handleAxiosError(error);
  }
};

const handleAxiosError = (error) => {
  let message = "An unexpected error occurred.";

  if (error.response) {
    message = error.response.data?.message || "Something went wrong on the server.";
  } else if (error.request) {
    message = "No response from server. Please check your internet connection.";
  } else {
    message = error.message;
  }

  toast.error(message);
  return {
    success: false,
    error: message,
    status: error.response?.status,
  };
};

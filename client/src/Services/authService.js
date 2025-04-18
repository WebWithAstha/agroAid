import { Axios } from "../utils/axios";

// Send OTP for sign-in/signup
export const signinAndSignup = async (phoneNumber) => {
  const response = await Axios.post('/auth/signin-signup', { phone:phoneNumber });
  return response.data;
};

// Verify OTP and authenticate user
export const verifyOtpAndAuthenticate = async (phoneNumber, otp) => {
  const response = await Axios.post('/auth/verify-otp', { phone:phoneNumber, otp });
  return response.data;
};

// Update user details (requires auth)
export const updateDetails = async (userData) => {
  const response = await Axios.post('/auth/update', userData);
  return response.data;
};

// Fetch current authenticated user
export const fetchCurrentUser = async () => {
  const response = await Axios.get('/auth/current-user');
  return response.data;
};

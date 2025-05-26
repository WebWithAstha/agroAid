import {
  signinAndSignup as signinService,
  verifyOtpAndAuthenticate as verifyOtpService,
  updateDetails as updateDetailsService,
  fetchCurrentUser as fetchCurrentUserService,
} from "../../Services/auth.service.js";
import { setUser, setLoading, logout } from "../slices/authSlice.jsx";
import { toast } from "sonner";

export const signinAndSignup = (phoneNumber) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const result = await signinService(phoneNumber);
    dispatch(setLoading(false));
    if (!result.success) toast.error(result.error || "Something went wrong");
    return result;
  } catch (error) {
    dispatch(setLoading(false));
    toast.error("Failed to send OTP. Please try again.");
  }
};

export const verifyOtpAndAuthenticate =
  (phoneNumber, otp, navigate) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const result = await verifyOtpService(phoneNumber, otp);
      if (result.success) {
        dispatch(setUser(result.data));
        dispatch(setLoading(false));
        if (result.data.isCompleted) {
          if (result.data.type === "buyer") navigate("/directmarket");
          navigate("/dashboard");
        } else navigate("/register");
        return result.data;
      } else {
        toast.error(result.error || "Invalid OTP");
        dispatch(setLoading(false));
      }
    } catch (error) {
      dispatch(setLoading(false));
      toast.error("Failed to verify OTP. Please try again.");
    }
  };

export const updateDetails = (userData, navigate) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const result = await updateDetailsService(userData);
    if (result.success) {
      dispatch(setUser(result.data));
    } else {
      toast.error(result.error || "Failed to update details.");
    }
    if (result.data.type === "buyer") navigate("/directmarket");
    navigate("/dashboard");
    dispatch(setLoading(false));
    return result;
  } catch (error) {
    dispatch(setLoading(false));
    toast.error("Something went wrong while updating details.");
  }
};

export const fetchCurrentUser = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const result = await fetchCurrentUserService();
    if (result.success) {
      dispatch(setUser(result.data));
    } else {
      toast.error(result.error || "User not found. Logging out.");
      dispatch(logout());
    }
    dispatch(setLoading(false));
    return result;
  } catch (error) {
    dispatch(setLoading(false));
    toast.error("Session expired or network error.");
    dispatch(logout());
  }
};

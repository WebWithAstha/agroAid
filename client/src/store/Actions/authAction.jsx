import {
    signinAndSignup as signinService,
    verifyOtpAndAuthenticate as verifyOtpService,
    updateDetails as updateDetailsService,
    fetchCurrentUser as fetchCurrentUserService,
} from "../../Services/authService.js";
import { setUser, setLoading, logout } from "../slices/authSlice.jsx";

export const signinAndSignup = (phoneNumber) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const data = await signinService(phoneNumber);
        dispatch(setLoading(false));
        console.log(data);
        
    } catch (error) {
        dispatch(setLoading(false));
        throw error;
    }
};

// Verify OTP and log in
export const verifyOtpAndAuthenticate = (phoneNumber, otp, navigate) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const {data} = await verifyOtpService(phoneNumber, otp);
        dispatch(setUser(data));
        dispatch(setLoading(false));
        // console.log(data)
        if(user.isCompleted)navigate('/dashboard')
        else navigate('/detail')
        return data;
    } catch (error) {
        dispatch(setLoading(false));
        throw error;
    }
};

export const updateDetails = (userData) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const data = await updateDetailsService(userData);
        // console.log(data);
        
        dispatch(setUser(data.updatedUser || data.user));
        dispatch(setLoading(false));
        return data;
    } catch (error) {
        dispatch(setLoading(false));
        throw error;
    }
};

export const fetchCurrentUser = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const data = await fetchCurrentUserService();
        dispatch(setUser(data.user));
        dispatch(setLoading(false));
        return data;
    } catch (error) {
        dispatch(setLoading(false));
        dispatch(logout());
        throw error;
    }
};

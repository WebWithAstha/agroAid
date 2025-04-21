import {
    signinAndSignup as signinService,
    verifyOtpAndAuthenticate as verifyOtpService,
    updateDetails as updateDetailsService,
    fetchCurrentUser as fetchCurrentUserService,
} from "../../Services/auth.service.js";
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
        if(data.isCompleted)navigate('/dashboard')
        else navigate('/register')
        return data;
    } catch (error) {
        dispatch(setLoading(false));
        throw error;
    }
};

export const updateDetails = (userData) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const {data} = await updateDetailsService(userData);
        dispatch(setUser(data));
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
        const {data} = await fetchCurrentUserService();
        console.log(data);
        dispatch(setUser(data));
        dispatch(setLoading(false));
        return data;
    } catch (error) {
        dispatch(setLoading(false));
        dispatch(logout());
        throw error;
    }
};

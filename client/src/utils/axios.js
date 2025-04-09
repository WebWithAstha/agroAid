import axios from 'axios';

export const authAxios = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true
})
export const weatherAxios = axios.create({
    baseURL: "",
    withCredentials: true
})
export const pesticidesAxios = axios.create({
    baseURL: "",
    withCredentials: true
})
export const agmarknetAxios = axios.create({
    baseURL: "",
    withCredentials: true
})
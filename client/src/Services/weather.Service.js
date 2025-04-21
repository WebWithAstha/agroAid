import { Axios } from "../utils/axios";


export const dailyWeatherForecastService = async () => {
    const { data } = await Axios.get("/services/weather");
    // console.log(data);
    return data;
    
}
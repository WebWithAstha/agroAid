import { Axios } from "../../utils/axios";
import { setWeatherLoading, setForecast, resetWeather } from "../slices/weatherSlice";

export const dailyWeatherForecast = () => async (dispatch) => {
    try {
        dispatch(setWeatherLoading(true));
        const { data } = await Axios.get("/services/weather");
        const today = data.data.forecast.forecastday[0];

        const weatherUIData = {
            main: {
                temperature: today.day.avgtemp_c, // or today.day.maxtemp_c
                condition: today.day.condition.text,
                icon: today.day.condition.icon,
                sunrise: today.astro.sunrise,
                sunset: today.astro.sunset,
            },
            weatherDetails: {
                humidity: today.day.avghumidity,
                windSpeed: today.day.maxwind_kph,
                soilMoisture: 30 // custom/static/dynamic from another source
            },
            cropTips: {
                tip: "Keep your crops hydrated and monitor soil condition.",
                recommended: ["Wheat", "Corn", "Soybean"]
            },
            fiveDayForecast: data.data.forecast.forecastday
            .slice(1)
            .map((day) => ({
              date: day.date,
              temperature: day.day.avgtemp_c,
              condition: day.day.condition.text,
              icon: day.day.condition.icon,
            })),
            soilMoistureLevel: {
                value: 68,
                level: "Optimal" // based on value range
            }
        };
        console.log(weatherUIData);

        dispatch(setForecast(weatherUIData));
        dispatch(setWeatherLoading(false));
    } catch (error) {
        console.log(error);
        dispatch(setWeatherLoading(false));
    }
}
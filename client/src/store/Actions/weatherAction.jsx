import { dailyWeatherForecastService } from "../../Services/weatherService";
import { Axios } from "../../utils/axios";
import { setWeatherLoading, setForecast, resetWeather } from "../slices/weatherSlice";

export const dailyWeatherForecast = () => async (dispatch) => {
    try {
        dispatch(setWeatherLoading(true));
        const data = await dailyWeatherForecastService();
        const today = data.data.currentResponse.current;
        const weatherUIData = {
            main: {
                temperature: today.temp_c, // or today.day.maxtemp_c
                condition: today.condition.text,
                icon: today.condition.icon,
                sunrise: data.data.forecastResponse.forecast.forecastday[0].astro?.sunrise ,
                sunset: data.data.forecastResponse.forecast.forecastday[0].astro?.sunset,
            },
            weatherDetails: {
                humidity: today.humidity,
                windSpeed: today.wind_kph,
                soilMoisture: 30 // custom/static/dynamic from another source
            },
            cropTips: {
                tip: "Keep your crops hydrated and monitor soil condition.",
                recommended: ["Wheat", "Corn", "Soybean"]
            },
            fiveDayForecast: data.data.forecastResponse.forecast.forecastday
            .slice(1)
            .map((day) => ({
              date: day.date,
              temperature: day.day.avgtemp_c,
              condition: day.day.condition.text,
              icon: day.day.condition.icon,
            })),
        };
        console.log("weather data fetched");

        dispatch(setForecast(weatherUIData));
        dispatch(setWeatherLoading(false));
    } catch (error) {
        console.log(error);
        dispatch(setWeatherLoading(false));
    }
}
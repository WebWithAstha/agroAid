import { useState, useEffect } from 'react';
import { Cloud, Droplets, Sun, Wind, Thermometer, CloudRain, Snowflake, Leaf, Sunrise, Sunset } from 'lucide-react';
import Navbar from '../partials/Navbar';

const Weather = () => {
  const [weatherData, setWeatherData] = useState({
    location: "Farmland Valley",
    temperature: 24,
    condition: "Sunny",
    humidity: 45,
    windSpeed: 12,
    sunrise: "6:15 AM",
    sunset: "7:45 PM",
    forecast: [
      { day: "Mon", temp: 24, condition: "Sunny" },
      { day: "Tue", temp: 26, condition: "Partly Cloudy" },
      { day: "Wed", temp: 22, condition: "Rain" },
      { day: "Thu", temp: 20, condition: "Cloudy" },
      { day: "Fri", temp: 23, condition: "Sunny" },
    ],
    soilMoisture: 68,
    cropTips: "Ideal conditions for planting spring crops. Consider light irrigation in the evening.",
    idealCrops: ["Wheat", "Corn", "Soybeans"]
  });

  // Weather icon selector based on condition
  const getWeatherIcon = (condition, size = 24) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun className="text-yellow-500" size={size} />;
      case 'partly cloudy':
        return <Cloud className="text-gray-400" size={size} />;
      case 'cloudy':
        return <Cloud className="text-gray-500" size={size} />;
      case 'rain':
        return <CloudRain className="text-blue-400" size={size} />;
      case 'snow':
        return <Snowflake className="text-blue-200" size={size} />;
      default:
        return <Sun className="text-yellow-500" size={size} />;
    }
  };
  
  return (
    <>
        <Navbar/>
    <div className="bg-green-50 pt-20 rounded-xl shadow-xl overflow-hidden border border-green-200 w-full max-w-4xl mx-auto font-sans relative">
      {/* Decorative Farm Elements */}
      <div className="absolute right-0 top-0 w-24 h-24 opacity-10">
        <svg viewBox="0 0 100 100" fill="currentColor" className="text-green-800">
          <path d="M30,10 C35,25 65,25 70,10 C70,35 100,35 100,60 C85,65 85,95 60,95 C65,80 35,80 40,95 C15,95 15,65 0,60 C0,35 30,35 30,10Z" />
        </svg>
      </div>
      
      {/* Header with Wooden Texture
      <div className="bg-gradient-to-r from-amber-700 to-amber-900 text-white p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <pattern id="woodPattern" patternUnits="userSpaceOnUse" width="200" height="200">
              <rect width="200" height="200" fill="#8B4513" />
              <path d="M0,0 L200,200 M50,0 L250,200 M100,0 L300,200 M150,0 L350,200 M-50,0 L150,200" 
                    stroke="#704214" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#woodPattern)" />
          </svg>
        </div>
        <div className="flex justify-between items-center relative z-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Leaf className="text-green-300" />
              {weatherData.location}
            </h2>
            <div className="text-sm text-amber-100 mt-1">Your Farm's Weather Assistant</div>
          </div>
          <div className="text-sm bg-amber-950 bg-opacity-30 rounded-lg px-3 py-1">
            Updated: Today 12:00 PM
          </div>
        </div>
      </div> */}

      {/* Current Weather - Enhanced Design */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gradient-to-b from-green-50 to-green-100">
        {/* Temperature and Condition */}
        <div className="col-span-1 flex flex-col items-center justify-center bg-white rounded-xl p-6 shadow-md border border-green-100 transform hover:scale-105 transition-transform">
          <div className="flex items-center justify-center gap-3">
            <span className="text-5xl font-bold text-green-800">{weatherData.temperature}°C</span>
            <div className="w-16 h-16">
              {getWeatherIcon(weatherData.condition, 64)}
            </div>
          </div>
          <div className="text-xl text-gray-600 mt-3 font-medium">{weatherData.condition}</div>
          
          {/* Sunrise/Sunset */}
          <div className="flex justify-between w-full mt-4 px-2 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Sunrise size={16} className="text-amber-500" />
              <span>{weatherData.sunrise}</span>
            </div>
            <div className="flex items-center gap-1">
              <Sunset size={16} className="text-amber-600" />
              <span>{weatherData.sunset}</span>
            </div>
          </div>
        </div>

        {/* Weather Details */}
        <div className="col-span-1 bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-400">
          <h3 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
            <Cloud size={18} />
            Weather Details
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 bg-blue-50 p-2 rounded-lg">
              <div className="bg-blue-100 p-2 rounded-full">
                <Droplets className="text-blue-500" size={20} />
              </div>
              <span className="text-gray-700">Humidity: <span className="font-bold">{weatherData.humidity}%</span></span>
            </div>
            <div className="flex items-center gap-3 bg-blue-50 p-2 rounded-lg">
              <div className="bg-blue-100 p-2 rounded-full">
                <Wind className="text-blue-500" size={20} />
              </div>
              <span className="text-gray-700">Wind: <span className="font-bold">{weatherData.windSpeed} km/h</span></span>
            </div>
            <div className="flex items-center gap-3 bg-blue-50 p-2 rounded-lg">
              <div className="bg-amber-100 p-2 rounded-full">
                <Droplets className="text-amber-600" size={20} />
              </div>
              <span className="text-gray-700">Soil Moisture: <span className="font-bold">{weatherData.soilMoisture}%</span></span>
            </div>
          </div>
        </div>

        {/* Farming Tips - More Attractive */}
        <div className="col-span-1 bg-gradient-to-br from-green-100 via-green-50 to-green-100 rounded-xl p-6 shadow-md border border-green-200 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10">
            <svg viewBox="0 0 100 100" width="120" height="120" fill="currentColor" className="text-green-800">
              <path d="M10,90 C30,90 25,10 50,10 C75,10 70,90 90,90 Z" />
            </svg>
          </div>
          
          <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
            <Leaf size={18} />
            Today's Crop Tips
          </h3>
          <p className="text-green-700 relative z-10 font-medium">{weatherData.cropTips}</p>
          
          <div className="mt-4 pt-3 border-t border-green-200">
            <h4 className="text-sm font-medium text-green-700 mb-2">Recommended Crops:</h4>
            <div className="flex flex-wrap gap-2">
              {weatherData.idealCrops.map((crop, idx) => (
                <span key={idx} className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                  {crop}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5-Day Forecast - Enhanced */}
      <div className="p-6 bg-white border-t border-green-100">
        <h3 className="font-semibold text-green-800 mb-4 flex items-center gap-2">
          <Calendar size={18} />
          5-Day Forecast
        </h3>
        <div className="grid grid-cols-5 gap-3">
          {weatherData.forecast.map((day, index) => (
            <div key={index} className="flex flex-col items-center p-3 rounded-xl bg-gradient-to-b from-sky-50 to-sky-100 shadow-sm border border-sky-100 hover:shadow-md transition-all">
              <div className="font-medium text-gray-700">{day.day}</div>
              <div className="my-3">{getWeatherIcon(day.condition)}</div>
              <div className="text-lg font-semibold text-sky-800">{day.temp}°C</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer with Soil Moisture Indicator - Enhanced */}
      <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-6 border-t border-amber-200">
        <div className="mb-3">
          <div className="flex justify-between mb-2">
            <span className="font-medium text-amber-800 flex items-center gap-1">
              <Droplets size={16} />
              Soil Moisture Level
            </span>
            <span className="font-bold text-amber-800">{weatherData.soilMoisture}%</span>
          </div>
          <div className="w-full bg-white rounded-full h-3 p-0.5 shadow-inner">
            <div 
              className="bg-gradient-to-r from-red-400 via-yellow-400 to-green-500 h-2 rounded-full shadow-sm" 
              style={{ width: `${weatherData.soilMoisture}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs font-medium mt-2">
            <span className="text-red-600">Dry</span>
            <span className="text-yellow-600">Moderate</span>
            <span className="text-green-600">Optimal</span>
          </div>
        </div>

        {/* Additional Decorative Element */}
        <div className="flex justify-center mt-4">
          <div className="flex items-center gap-1 text-xs text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L8 6H4v4l-2 4 2 4v4h4l4 2 4-2h4v-4l2-4-2-4V6h-4L12 2z" />
            </svg>
            <span>Weather data optimized for agricultural decisions</span>
          </div>
        </div>
      </div>
    </div>
    </>

  );
}

export default Weather

// Calendar icon component
function Calendar({ size = 24, className = "" }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
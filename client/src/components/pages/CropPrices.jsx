import React, { useState } from "react";

import {
  IndianRupee,
  ChevronDown,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Leaf,
  ArrowLeftSquare,
  ArrowLeft,
  ArrowLeftIcon,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";
import { crops, marketData, marketTrends } from "../../data/cropPrices";
import Header from "../Header";

// ================= Subcomponents =================

{
  /* <IndianRupee size={16} className="text-emerald-600 mr-1" /> */
}
const ChartToggleAndSelector = ({
  selectedCrop,
  setSelectedCrop,
  chartView,
  setChartView,
}) => (
  <div className="relative w-full ">
    
    <Header title={"Crop Price Trends"} des={"Upload crop images for instant disease detection & treatment advice"}/>
    <div className="flex absolute right-4 bottom-8 z-99 items-center space-x-2">
      <div className="flex overflow-hidden rounded-md border border-gray-200">
        {["price", "volume"].map((view) => (
          <button
            key={view}
            onClick={() => setChartView(view)}
            className={`px-3 py-1 text-sm ${
              chartView === view
                ? "bg-green-800 text-white"
                : "bg-white text-gray-600"
            }`}
          >
            {view.charAt(0).toUpperCase() + view.slice(1)}
          </button>
        ))}
      </div>
      <div className="relative">
        <select
          value={selectedCrop}
          onChange={(e) => setSelectedCrop(e.target.value)}
          className="appearance-none bg-white border border-gray-200 rounded-md py-1 pl-2 pr-8 text-sm text-gray-700 focus:outline-none"
        >
          {crops.map((crop) => (
            <option key={crop.name} value={crop.name}>
              {crop.name}
            </option>
          ))}
        </select>
        <ChevronDown
          className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
          size={12}
        />
      </div>
    </div>
  </div>
);

const CropCard = ({ crop, selectedCrop, setSelectedCrop }) => {
  const trend = marketTrends[crop.name];
  const current = marketData[crop.name].at(-1).price;

  return (
    <div
      key={crop.name}
      onClick={() => setSelectedCrop(crop.name)}
      className={`cursor-pointer hover:bg-zinc-50 hover:text-black transition-all h-max rounded-md border border-transparent ${
        selectedCrop === crop.name
          ? "border-l-2 border-l-emerald-500 bg-emerald-800 text-white"
          : "border-gray-100 bg-white hover:border-l-2 hover:border-l-gray-300"
      }`}
    >
      <div className="p-2">
        <p className="text-sm font-medium">{crop.name}</p>
        <div className="flex items-center justify-between mt-1">
          <p className="text-xs">₹{current}</p>
          <div
            className={`flex items-center text-xs bg-white px-1 rounded-xl ${
              trend.change >= 0 ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {trend.change >= 0 ? (
              <ArrowUp size={10} />
            ) : (
              <ArrowDown size={10} />
            )}
            <span>{Math.abs(trend.change).toFixed(1)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const CropChart = ({
  selectedCrop,
  chartView,
  combinedData,
  currentPrice,
  priceChange,
}) => (
  <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-3 flex-grow">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center">
        <div
          className="mr-2 w-1 h-8 rounded-full"
          style={{
            backgroundColor: crops.find((c) => c.name === selectedCrop)?.color,
          }}
        ></div>
        <div>
          <h2 className="text-base font-medium text-gray-800">
            {selectedCrop}
          </h2>
          <div className="flex items-center">
            <span className="text-md font-medium">₹{currentPrice}</span>
            <div
              className={`flex items-center ml-2 ${
                priceChange >= 0 ? "text-emerald-600" : "text-red-500"
              }`}
            >
              {priceChange >= 0 ? (
                <ArrowUp size={12} />
              ) : (
                <ArrowDown size={12} />
              )}
              <span className="ml-px text-md">
                {Math.abs(priceChange).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ResponsiveContainer width="100%" height="100%" minHeight={210}>
      {chartView === "price" ? (
        <LineChart
          data={combinedData}
          margin={{ top: 30, right: 20, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f1f5f9"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tick={{ fill: "#64748b", fontSize: 12 }}
            axisLine={{ stroke: "#f1f5f9" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#64748b", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            content={({ payload, label }) => {
              if (!payload || !payload.length) return null;
              return (
                <div className="bg-white p-2 rounded-md shadow-lg border border-gray-100 text-xs">
                  <p className="text-gray-700 font-medium">{label}</p>
                  {payload.map((data, idx) => (
                    <p
                      key={idx}
                      className="text-gray-800 flex items-center gap-1"
                    >
                      <span
                        className="w-1 h-1 rounded-full inline-block"
                        style={{ backgroundColor: data.color }}
                      ></span>
                      {data.name}:{" "}
                      <span className="font-medium">₹{data.value}</span>
                    </p>
                  ))}
                </div>
              );
            }}
          />
          <Line
            type="monotone"
            dataKey={selectedCrop}
            stroke={crops.find((c) => c.name === selectedCrop)?.color}
            strokeWidth={2}
            dot={{
              r: 3,
              stroke: "#fff",
              strokeWidth: 1,
              fill: crops.find((c) => c.name === selectedCrop)?.color,
            }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      ) : (
        <AreaChart
          data={marketData[selectedCrop]}
          margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f1f5f9"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tick={{ fill: "#64748b", fontSize: 12 }}
            axisLine={{ stroke: "#f1f5f9" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#64748b", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            content={({ payload, label }) => {
              if (!payload || !payload.length) return null;
              return (
                <div className="bg-white p-2 rounded-md shadow-lg border border-gray-100 text-xs">
                  <p className="text-gray-700 font-medium">{label}</p>
                  <p className="text-gray-800">
                    Volume:{" "}
                    <span className="font-medium">{payload[0].value}</span>{" "}
                    quintals
                  </p>
                </div>
              );
            }}
          />
          <Area
            type="monotone"
            dataKey="volume"
            stroke={crops.find((c) => c.name === selectedCrop)?.color}
            fill={crops.find((c) => c.name === selectedCrop)?.color + "20"}
          />
        </AreaChart>
      )}
    </ResponsiveContainer>
  </div>
);

const ForecastCard = ({ selectedCrop }) => {
  const forecast = marketTrends[selectedCrop];
  return (
    <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-3">
      <h2 className="text-sm font-medium text-gray-800 mb-2">
        Market Forecast
      </h2>
      <div>
        <p className="text-xs text-gray-500">Forecasted Price (May)</p>
        <div className="flex items-center justify-between mt-1">
          <p className="text-2xl font-medium">₹{forecast.forecast}</p>
          <div
            className={`flex items-center ${
              forecast.change >= 0 ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {forecast.change >= 0 ? (
              <TrendingUp size={14} />
            ) : (
              <ArrowDown size={14} />
            )}
            <span className="ml-1 text-2xl">
              {Math.abs(forecast.change).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
const CropCompare = ({ crops, selectedCrop, marketData }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-3 flex-grow">
      <h2 className="text-sm font-medium text-gray-800 mb-2">
        Price Comparison
      </h2>
      <div className="space-y-2">
        {crops
          .filter((c) => c.name !== selectedCrop)
          .slice(0, 3)
          .map((crop, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-2 rounded-md bg-gray-50"
            >
              <div className="flex items-center">
                <div
                  className="w-1 h-6 rounded-full mr-2"
                  style={{ backgroundColor: crop.color }}
                ></div>
                <p className="text-sm font-medium text-gray-800">{crop.name}</p>
              </div>
              <p className="text-sm font-medium">
                ₹{marketData[crop.name].at(-1).price}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

// ================= Main Component =================

const CropPrices = () => {
  const [selectedCrop, setSelectedCrop] = useState("Wheat");
  const [chartView, setChartView] = useState("price");

  const currentPrice = marketData[selectedCrop].at(-1).price;
  const previousPrice = marketData[selectedCrop].at(-2).price;
  const priceChange = ((currentPrice - previousPrice) / previousPrice) * 100;


  const combinedData = marketData[selectedCrop].map((item, index) => {
    const dataForMonth = { month: item.month };
    crops.forEach((crop) => {
      dataForMonth[crop.name] = marketData[crop.name][index]?.price || 0;
    });
    return dataForMonth;
  });

  return (
    <div className="md:h-screen flex  flex-col overflow-hidden">
      <main className="flex-grow flex flex-col ">
        <ChartToggleAndSelector
          selectedCrop={selectedCrop}
          setSelectedCrop={setSelectedCrop}
          chartView={chartView}
          setChartView={setChartView}
        />

        <div className="grid grid-cols-4 p-4 w-full gap-3 flex-grow">
          <div className="space-y-2">
            {crops.map((crop) => (
              <CropCard
                key={crop.name}
                crop={crop}
                selectedCrop={selectedCrop}
                setSelectedCrop={setSelectedCrop}
              />
            ))}
          </div>

          <div className="col-span-2 h-max flex flex-1 flex-col">
            <CropChart
              selectedCrop={selectedCrop}
              chartView={chartView}
              combinedData={combinedData}
              currentPrice={currentPrice}
              priceChange={priceChange}
            />
          </div>

          <div className="space-y-3 h-max">
            <ForecastCard selectedCrop={selectedCrop} />
            <CropCompare
              selectedCrop={selectedCrop}
              crops={crops}
              marketData={marketData}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CropPrices;

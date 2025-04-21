import React, { use, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
import Header from "../partials/Header";
import { fetchAgmarknetPrices } from "../../store/Actions/agmarknetAction";

// ================= Subcomponents =================

{
  /* <IndianRupee size={16} className="text-emerald-600 mr-1" /> */
}
const ChartToggleAndSelector = ({
  selectedCrop,
  setSelectedCrop,
  chartView,
  crops,
  setChartView,
}) => {
  return (
    <div className="relative w-full">
      <div className="flex absolute right-4 bottom-8 z-99 items-center space-x-2">
        {/* Crop Selector */}
        <div className="relative">
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="appearance-none bg-emerald-700 text-white border border-gray-200 rounded-md py-1 pl-2 pr-8 text-sm text-gray-700 focus:outline-none"
          >
            {crops.map((crop) => (
              <option className="bg-zinc-50 text-emerald-800 hover:bg-emerald-300" key={crop.name} value={crop.name}>
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
};

const CropCard = ({ crop, selectedCrop, setSelectedCrop }) => {
  return (
    <div
      key={crop._id}
      onClick={() => setSelectedCrop(crop.name)}
      className={`cursor-pointer hover:bg-green-50 px-2 hover:text-black transition-all h-max rounded-md border border-transparent ${
        selectedCrop === crop.commodity
          ? "border-l-2 border-l-emerald-500 bg-emerald-800 text-white"
          : "border-gray-100 bg-white hover:border-l-2 hover:border-l-gray-300"
      }`}
    >
      <div className="p-2">
        <p className="text-sm font-medium">{crop.name}</p>
        <div className="flex items-center justify-between mt-1">
          <p className="text-xs">
            ₹{crop.prices[crop.prices.length - 1].min_price} - ₹
            {crop.prices[crop.prices.length - 1].max_price}
          </p>
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
}) => {
  const chartData = useMemo(() => {
    const crop = combinedData.find((item) => item.name === selectedCrop);
    if (!crop || !crop.prices) return [];

    return crop.prices
      .filter((priceObj) => {
        const [day, month, year] = priceObj.date.split("/");
        return !isNaN(new Date(`${year}-${month}-${day}`));
      })
      .map((priceObj) => {
        const [day, month, year] = priceObj.date.split("/");
        const dateObj = new Date(`${year}-${month}-${day}`);

        return {
          date: dateObj.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
          }),
          max_price: priceObj.max_price,
          min_price: priceObj.min_price,
        };
      });
  }, [combinedData, selectedCrop]);

  const cropColor =
    crops.find((c) => c.name === selectedCrop)?.color || "#0ea5e9";

  return (
    <div className="h-full w-full m-auto border border-gray-100 rounded-lg shadow-sm p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div
            className="mr-2 w-1 h-8 rounded-full"
            style={{ backgroundColor: cropColor }}
          ></div>
          <div>
            <h2 className="text-sm font-bold bg-sky-400 mb-1 px-4 py-1.5 rounded-xl text-gray-600">
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

      <ResponsiveContainer width="100%" height="80%" minHeight={150}>
        <AreaChart
          data={chartData}
          margin={{ top: 40, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#888888"
            vertical={false}
          />

          <XAxis
            dataKey="date"
            tick={{ fill: "#64748b", fontSize: 12 }}
            axisLine={{ stroke: "#888888" }}
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
                  <p className="text-gray-800">
                    Max Price:{" "}
                    <span className="font-medium">
                      ₹{payload[0]?.payload?.max_price}
                    </span>
                  </p>
                  <p className="text-gray-800">
                    Min Price:{" "}
                    <span className="font-medium">
                      ₹{payload[0]?.payload?.min_price}
                    </span>
                  </p>
                </div>
              );
            }}
          />

          {/* Max Price Area */}
          <Area
            type="monotone"
            dataKey="max_price"
            stroke={cropColor}
            fill={cropColor + "20"}
            strokeWidth={2}
            dot={{ r: 2 }}
            activeDot={{ r: 4 }}
            name="Max Price"
          />

          {/* Min Price Area */}
          <Area
            type="monotone"
            dataKey="min_price"
            stroke="#f87171"
            fill="#f8717120"
            strokeWidth={2}
            dot={{ r: 2 }}
            activeDot={{ r: 4 }}
            name="Min Price"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const CropCompare = ({ currentPrice, crops, selectedCrop, marketData }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-3 flex-grow">
      <h2 className="text-lg font-medium text-gray-800 mb-3">
        Price Comparison
      </h2>
      <div className="space-y-2 grid gap-3 grid-cols-3">
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
                  style={{
                    backgroundColor: `rgb(${
                      Math.abs(
                        crop.prices[crop.prices.length - 1].max_price -
                          currentPrice
                      ) /
                        255 +
                      10
                    }, ${
                      Math.abs(
                        crop.prices[crop.prices.length - 1].max_price -
                          currentPrice
                      ) /
                        255 +
                      100
                    }, ${
                      Math.abs(
                        crop.prices[crop.prices.length - 1].max_price -
                          currentPrice
                      ) /
                        255 +
                      50
                    })`,
                  }}
                ></div>
                <p className="text-sm font-medium text-gray-800">{crop.name}</p>
              </div>
              <p className="text-sm font-medium">
                ₹{crop.prices[crop.prices.length - 1].max_price}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

// ================= Main Component =================

const CropPrices = () => {
  const [selectedCrop, setSelectedCrop] = useState("");
  const [chartView, setChartView] = useState("price");
  const [currentPrice, setCurrentPrice] = useState(0);
  const [previousPrice, setPreviousPrice] = useState(0);
  const [priceChange, setPriceChange] = useState(0);

  const combinedData = () => {
    return cropPrices
      .find((c) => c.name === selectedCrop)
      .prices.map((price) => {});
  };

  const dispatch = useDispatch();
  const { data: cropPrices, pagination } = useSelector(
    (state) => state?.agmarknetReducer.data
  );

  const get = async () => {
    dispatch(fetchAgmarknetPrices());
  };
  useEffect(() => {
    if (cropPrices.length == 0) get();
  }, [cropPrices]);

  const uniqueCommodities = Array.from(
    new Map(cropPrices.map((item) => [item.name, item])).values()
  );

  useEffect(() => {
    const crop = cropPrices.find((c) => c.name === selectedCrop);
    if (crop && crop.prices.length >= 2) {
      const lastPrice = crop.prices[crop.prices.length - 1].max_price;
      const secondLastPrice = crop.prices[crop.prices.length - 2].max_price;
      setCurrentPrice(lastPrice);
      setPreviousPrice(secondLastPrice);
      const change = ((lastPrice - secondLastPrice) / secondLastPrice) * 100;
      setPriceChange(change);
    }
  }, [selectedCrop, cropPrices]);

  const handleNextPage = () => {
    if (pagination?.hasNextPage) {
      dispatch(fetchAgmarknetPrices(pagination.page + 1));
    }
  };

  const handlePrevPage = () => {
    if (pagination?.hasPrevPage) {
      dispatch(fetchAgmarknetPrices(pagination.page - 1));
    }
  };

  useEffect(() => {
    if (uniqueCommodities.length > 0) {
      if (!uniqueCommodities.some((crop) => crop.name === selectedCrop)) {
        setSelectedCrop(uniqueCommodities[0].name); // Set the first crop by default if current selection is unavailable
      }
    }
  }, [uniqueCommodities, selectedCrop]);

  return (
    <div className="md:h-screen flex bg-zinc-50 flex-col ">
      <div className="relative">
        <Header
          title={"Crop Price Trends"}
          des={
            "Upload crop images for instant disease detection & treatment advice"
          }
        />
        <ChartToggleAndSelector
          selectedCrop={selectedCrop}
          setSelectedCrop={setSelectedCrop}
          chartView={chartView}
          setChartView={setChartView}
          crops={uniqueCommodities}
        />
      </div>
      <main className="h-[86vh] flex flex-col ">
        <div className="grid grid-cols-3 h-full overflow-hidden grid-rows-2 py-2 px-20 w-full gap-4  flex-grow">
          <div className="relative shadow row-span-2 flex-col h-full ">
            <div className="w-full h-[93%] bg-gradient-to-br from-zinc-50 space-y-1.5 overflow-y-auto">
              {uniqueCommodities.map((crop, i) => (
                <CropCard
                  key={i}
                  crop={crop}
                  selectedCrop={selectedCrop}
                  setSelectedCrop={setSelectedCrop}
                />
              ))}
            </div>

            <div className="flex gap-2 px-2 pb-2  sticky top-full">
              <button
                disabled={!pagination?.hasPrevPage}
                onClick={handlePrevPage}
                className="bg-emerald-600 disabled:bg-zinc-300 disabled:text-black/[.8] hover:bg-emerald-700 w-1/2 text-white font-medium py-2 px-4 rounded-lg shadow transition duration-200"
              >
                Prev
              </button>
              <button
                disabled={!pagination?.hasNextPage}
                onClick={handleNextPage}
                className="bg-emerald-600 disabled:bg-zinc-100 hover:bg-emerald-700 w-1/2 text-white font-medium py-2 px-4 rounded-lg shadow transition duration-200"
              >
                Next
              </button>
            </div>
          </div>

          <div className="col-span-2 flex flex-col h-full gap-3">
            <div className="h-[60vh] bg-white relative flex items-center justify-center rounded-xl shrink-0">
              <CropChart
                selectedCrop={selectedCrop}
                chartView={chartView}
                combinedData={cropPrices}
                currentPrice={currentPrice}
                priceChange={priceChange}
              />
            </div>

            <div className="h-40  rounded-xl shrink-0 overflow-hidden  ">
              <CropCompare
                selectedCrop={selectedCrop}
                crops={uniqueCommodities}
                marketData={marketData}
                currentPrice={currentPrice}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CropPrices;

import React, { useMemo } from 'react'
import {
    ArrowUp,
    ArrowDown,
    IndianRupee,

} from 'lucide-react';
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
import CropPrices from '../pages/CropPrices';

const CropChart = ({
    selectedCrop,
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

    return (
        <div className="h-full w-full m-auto border border-gray-100 rounded-lg shadow-sm p-2 sm:p-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 mr-2 gap-2">
                <div className="flex items-center">
                    <div
                        className="mr-2 w-1 h-8 rounded-full"
                        style={{ backgroundColor: "#0ea5e9" }}
                    ></div>
                    <div>
                        <h2 className="text-xs sm:text-sm font-bold bg-sky-400 mb-1 px-2 sm:px-4 py-1 sm:py-1.5 rounded-xl text-gray-600">
                            {selectedCrop}
                        </h2>
                        <div className="flex items-center">
                            <span className="text-sm sm:text-md font-medium">₹{currentPrice}</span>
                            <div
                                className={`flex items-center ml-2 ${priceChange >= 0 ? "text-emerald-600" : "text-red-500"
                                    }`}
                            >
                                {priceChange >= 0 ? (
                                    <ArrowUp size={12} />
                                ) : (
                                    <ArrowDown size={12} />
                                )}
                                <span className="ml-px text-sm sm:text-md">
                                    {Math.abs(priceChange).toFixed(1)}%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap justify-end items-center gap-2 text-xs sm:text-sm text-gray-600 font-medium">
                    <div className="flex items-center ">
                        <span
                            className="inline-block w-3 h-3 mr-1 rounded-full"
                            style={{ backgroundColor: "#0ea5e9" }}
                        ></span>
                        Max Price
                    </div>
                    <div className="flex items-center">
                        <span className="inline-block w-3 h-3 mr-1 rounded-full bg-red-400"></span>
                        Min Price
                    </div>
                </div>
            </div>

            <ResponsiveContainer width="100%" height={window.innerWidth < 640 ? 180 : "80%"} minHeight={120}>
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

                    <Area
                        type="monotone"
                        dataKey="max_price"
                        stroke={"#0ea5e9"}
                        fill={"#0ea5e9" + "20"}
                        strokeWidth={2}
                        dot={{ r: 2 }}
                        activeDot={{ r: 4 }}
                        name="Max Price"
                    />

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

export default CropChart;
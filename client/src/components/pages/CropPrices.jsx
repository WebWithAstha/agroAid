import React, { useState } from "react";
import {
  IndianRupee,
  BarChart2,
  Leaf,
  ChevronDown,
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Navbar from "../partials/Navbar";

const crops = [
  { name: "Wheat", color: "#059669" },
  { name: "Barley", color: "#d97706" },
  { name: "Mustard", color: "#7c3aed" },
  { name: "Gram", color: "#2563eb" },
];

const dummyData = {
  Wheat: [
    { month: "Jan", price: 2200 },
    { month: "Feb", price: 2300 },
    { month: "Mar", price: 2450 },
    { month: "Apr", price: 2500 },
  ],
  Barley: [
    { month: "Jan", price: 1800 },
    { month: "Feb", price: 1900 },
    { month: "Mar", price: 2100 },
    { month: "Apr", price: 2000 },
  ],
  Mustard: [
    { month: "Jan", price: 5000 },
    { month: "Feb", price: 5200 },
    { month: "Mar", price: 5100 },
    { month: "Apr", price: 5300 },
  ],
  Gram: [
    { month: "Jan", price: 4400 },
    { month: "Feb", price: 4550 },
    { month: "Mar", price: 4700 },
    { month: "Apr", price: 4600 },
  ],
};

const CropPrices = () => {
  const [selectedCrop, setSelectedCrop] = useState("Wheat");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-white px-4 sm:px-6 md:px-10">
      <Navbar />
      <main className="max-w-6xl mx-auto py-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <IndianRupee className="text-emerald-600" /> Crop Price Trends
        </h1>

        <div className="bg-white border border-gray-100 rounded-xl p-6 mb-10 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Seasonal Crops in Your Area</h2>
              <p className="text-sm text-gray-500">Rabi Season • Navsari, Gujarat</p>
            </div>
            <div className="relative w-full sm:w-60">
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="appearance-none w-full bg-white border border-gray-300 rounded-lg py-2 px-4 pr-8 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {crops.map((crop, idx) => (
                  <option key={idx} value={crop.name}>
                    {crop.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dummyData[selectedCrop]}>
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="price"
                stroke={crops.find((c) => c.name === selectedCrop)?.color}
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {crops.map((crop, index) => (
            <div
              key={index}
              onClick={() => setSelectedCrop(crop.name)}
              className={`cursor-pointer p-4 rounded-xl border shadow-sm hover:shadow-md transition-all flex items-center gap-3 ${
                selectedCrop === crop.name ? "bg-emerald-50 border-emerald-300" : "bg-white border-gray-100"
              }`}
            >
              <Leaf size={24} className={`text-[${crop.color}]`} />
              <div>
                <h3 className="font-medium text-gray-800">{crop.name}</h3>
                <p className="text-xs text-gray-500">
                  ₹{dummyData[crop.name].at(-1).price} / quintal
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CropPrices;

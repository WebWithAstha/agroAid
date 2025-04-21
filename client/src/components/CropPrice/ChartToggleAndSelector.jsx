import { ChevronDown } from 'lucide-react';
import React from 'react'

const ChartToggleAndSelector = ({
    selectedCrop,
    setSelectedCrop,
    crops,
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

export default ChartToggleAndSelector
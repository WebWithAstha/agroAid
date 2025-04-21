import React from 'react'

const CropCard = ({ crop, selectedCrop, setSelectedCrop }) => {
    return (
      <div
        key={crop._id}
        onClick={() => setSelectedCrop(crop.name)}
        className={`cursor-pointer hover:bg-green-50 px-2 hover:text-black transition-all h-max rounded-md border border-transparent ${selectedCrop === crop.commodity
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

export default CropCard
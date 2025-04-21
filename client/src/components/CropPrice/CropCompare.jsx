import React from 'react'

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
                      backgroundColor: `rgb(${Math.abs(
                        crop.prices[crop.prices.length - 1].max_price -
                        currentPrice
                      ) /
                        255 +
                        10
                        }, ${Math.abs(
                          crop.prices[crop.prices.length - 1].max_price -
                          currentPrice
                        ) /
                        255 +
                        100
                        }, ${Math.abs(
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

export default CropCompare
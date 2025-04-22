import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../partials/Header";
import { fetchAgmarknetPrices } from "../../store/Actions/agmarknetAction";
import CropChart from "../CropPrice/CropChart";
import CropCompare from "../CropPrice/CropCompare";
import ChartToggleAndSelector from "../CropPrice/ChartToggleAndSelector";
import CropCard from "../CropPrice/CropCard";
import PaginationControls from "../partials/PaginationControls";
import HeaderLoading from "../loading/HeaderLoading";

// ================= Subcomponents =================

{
  /* <IndianRupee size={16} className="text-emerald-600 mr-1" /> */
}

// ================= Main Component =================

const CropPrices = () => {
  const [selectedCrop, setSelectedCrop] = useState("");
  const [chartView, setChartView] = useState("price");
  const [currentPrice, setCurrentPrice] = useState(0);
  const [previousPrice, setPreviousPrice] = useState(0);
  const [priceChange, setPriceChange] = useState(0);

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
        {!uniqueCommodities || uniqueCommodities.length === 0 ? (
          <HeaderLoading />
        ) : (
          <>
          <Header
            title="Crop Price Trends"
            des="Upload crop images for instant disease detection & treatment advice"
            />
        <ChartToggleAndSelector
          selectedCrop={selectedCrop}
          setSelectedCrop={setSelectedCrop}
          chartView={chartView}
          setChartView={setChartView}
          crops={uniqueCommodities}
        />
            </>
        )}

      </div>
      <main className="md:h-[86vh] flex flex-col ">
        <div className="md:grid md:grid-cols-3 h-full md:overflow-hidden md:grid-rows-2 py-2 px-10 md:px-20 w-full gap-4  flex-grow">
          <div className="relative w-full bg-white md:mb-0 mb-3 shadow md:row-span-2 flex-col h-full">
            <div className="w-full h-80 shrink-0 md:h-[93%] bg-gradient-to-br from-zinc-50 space-y-1.5 overflow-y-auto">
              {!uniqueCommodities || uniqueCommodities.length === 0 ? (
                <div className="w-full h-full px-4 py-2 flex flex-col gap-4">
                  {[1, 2, 3, 4, 5, 6].map((e) => (
                    <div
                      key={e}
                      className="w-full h-14 bg-zinc-300 animate-pulse"
                    ></div>
                  ))}
                </div>
              ) : (
                uniqueCommodities.map((crop, i) => (
                  <CropCard
                    key={i}
                    crop={crop}
                    selectedCrop={selectedCrop}
                    setSelectedCrop={setSelectedCrop}
                  />
                ))
              )}
            </div>

            {uniqueCommodities?.length > 0 && (
              <PaginationControls
                hasPrevPage={pagination?.hasPrevPage}
                hasNextPage={pagination?.hasNextPage}
                onPrev={handlePrevPage}
                onNext={handleNextPage}
              />
            )}
          </div>

          <div className="col-span-2 flex flex-col h-full gap-3">
            <div className="h-[60vh] bg-white relative flex items-center justify-center rounded-xl shrink-0">
              {!selectedCrop || !cropPrices || cropPrices.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="w-32 h-32 rounded-full border-8 border-zinc-300 animate-spin border-t-transparent"></div>
                  <p className="text-zinc-500 font-medium text-md ">
                    Loading chart data...
                  </p>
                </div>
              ) : (
                <CropChart
                  selectedCrop={selectedCrop}
                  chartView={chartView}
                  combinedData={cropPrices}
                  currentPrice={currentPrice}
                  priceChange={priceChange}
                />
              )}
            </div>

            <div className="h-40 rounded-xl shrink-0 overflow-hidden bg-white flex items-center justify-center">
              {!uniqueCommodities || uniqueCommodities.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="w-10 h-10 border-4 border-zinc-300 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-zinc-500 text-sm">
                    Loading comparison data...
                  </p>
                </div>
              ) : (
                <CropCompare
                  selectedCrop={selectedCrop}
                  crops={uniqueCommodities}
                  currentPrice={currentPrice}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CropPrices;

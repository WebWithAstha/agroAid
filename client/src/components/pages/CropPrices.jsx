import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../partials/Header";
import { fetchAgmarknetPrices } from "../../store/Actions/agmarknetAction";
import CropChart from "../CropPrice/CropChart";
import CropCompare from "../CropPrice/CropCompare";
import ChartToggleAndSelector from "../CropPrice/ChartToggleAndSelector";
import CropCard from "../CropPrice/CropCard";

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
      <main className="md:h-[86vh] flex flex-col ">
        <div className="md:grid md:grid-cols-3 h-full md:overflow-hidden md:grid-rows-2 py-2 px-10 md:px-20 w-full gap-4  flex-grow">
          <div className="relative w-full bg-white md:mb-0 mb-3 shadow md:row-span-2 flex-col h-full ">
            <div className="w-full h-80 shrink-0 md:h-[93%] bg-gradient-to-br from-zinc-50 space-y-1.5 overflow-y-auto">
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

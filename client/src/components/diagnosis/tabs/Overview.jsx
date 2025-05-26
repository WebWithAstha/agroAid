import { AlertTriangle, BarChart4, Info, Shell } from "lucide-react";
import React from "react";

const Overview = ({ selectedDiagnosis }) => {
  console.log(selectedDiagnosis);

  return (
    <div className="">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 md:pr-4 mb-4 md:mb-0">
          <div className="rounded-lg bg-gray-100 overflow-hidden">
            <img
              src={selectedDiagnosis.image}
              alt={selectedDiagnosis.cropName}
              className="w-full text-sm h-48 sm:h-56 md:h-64 object-cover"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 md:pl-4">
          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center">
              <BarChart4 size={20} className="mr-2 text-green-600" /> Diagnosis
              Summary
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Crop</p>
                <p className="font-medium">{selectedDiagnosis.cropName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Disease</p>
                <p className="font-medium">{selectedDiagnosis.disease}</p>
              </div>
              <div className="w-full max-w-md">
                <p className="text-sm text-gray-600 mb-1">Severity</p>

                {/* Gradient bar container */}
                <div className="relative h-3 rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 shadow-inner overflow-hidden">

                  {/* Pointer */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border border-white bg-gray-800 shadow-md transition-all duration-300 ease-in-out"
                    style={{ left: `calc(${selectedDiagnosis.severity * 100}% - 10px)` }}
                  />
                </div>

                {/* Percentage */}
                <div className=" text-sm text-gray-700 mt-1 font-medium tracking-wide">
                  {(selectedDiagnosis.severity * 100).toFixed(1)}%
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{new Date(selectedDiagnosis.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-rose-50 p-3 sm:p-4 rounded-lg mb-4 mt-4">
        <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center">
          <AlertTriangle size={20} className="mr-2 text-yellow-600" />{" "}
          Description
        </h3>
        <p className="text-gray-700">{selectedDiagnosis.description}</p>
      </div>
    </div>
  );
};

export default Overview;

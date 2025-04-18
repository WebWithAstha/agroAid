import { AlertTriangle, BarChart4, Info, Shell } from "lucide-react";
import React from "react";

const Overview = ({ selectedDiagnosis }) => {
  return (
    <div className="">
      <div className="flex">
        <div className="w-1/2 pr-4">
          <div className="rounded-lg bg-gray-100 overflow-hidden mb-4">
            <img
              src={selectedDiagnosis.image}
              alt={selectedDiagnosis.cropName}
              className="w-full text-sm h-64 object-cover"
            />
          </div>
        </div>
        <div className="w-1/2 pl-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center">
              <BarChart4 size={20} className="mr-2 text-green-600" /> Diagnosis
              Summary
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Crop</p>
                <p className="font-medium">{selectedDiagnosis.cropName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Disease</p>
                <p className="font-medium">{selectedDiagnosis.disease}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Severity</p>
                <p className="font-medium">{selectedDiagnosis.severity}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{selectedDiagnosis.uploadDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-rose-50 p-4  rounded-lg mb-4">
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

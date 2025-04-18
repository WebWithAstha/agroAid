import { Leaf, Shell } from "lucide-react";
import React from "react";

const Treatments = ({selectedDiagnosis}) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-lime-50 p-5 rounded-lg">
          <h3 className="text-xl font-medium text-gray-800 mb-4 flex items-center">
            <Shell size={24} className="mr-2 text-green-600" /> Chemical
            Treatment
          </h3>
          <div className="space-y-4">
            <p className="text-gray-700">
              {selectedDiagnosis.chemicalTreatment}
            </p>
            <div className="bg-white p-4 rounded-md border border-lime-200">
              <h4 className="font-medium text-gray-800 mb-2">
                Application Guidelines
              </h4>
              <ul className="text-sm text-gray-600 space-y-2">
              {selectedDiagnosis.treatment.chemical.map((t,i)=>(
                <li>• {t}</li>

              ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-emerald-50 p-5 rounded-lg">
          <h3 className="text-xl font-medium text-gray-800 mb-4 flex items-center">
            <Leaf size={24} className="mr-2 text-emerald-600" /> Organic
            Treatment
          </h3>
          <div className="space-y-4">
            <p className="text-gray-700">
              {selectedDiagnosis.organicTreatment}
            </p>
            <div className="bg-white p-4 rounded-md border border-emerald-200">
              <h4 className="font-medium text-gray-800 mb-2">
                Benefits of Organic Approach
              </h4>
              <ul className="text-sm text-gray-600 space-y-2">
              {selectedDiagnosis.treatment.organic.map((t,i)=>(
                <li>• {t}</li>

              ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 bg-blue-50 p-5 rounded-lg">
        <h3 className="text-xl font-medium text-gray-800 mb-3">
          Treatment Timeline
        </h3>
        <div className="relative">
          <div className="absolute left-0 top-0 h-full w-px bg-blue-300 ml-3"></div>
          <div className="space-y-6 relative">
            <div className="flex">
              <div className="w-6 h-6 rounded-full bg-blue-500 z-10 mr-4"></div>
              <div className="flex-1 bg-white p-3 rounded-md border border-blue-200">
                <h4 className="font-medium text-gray-800">
                  Day 1: Initial Treatment
                </h4>
                <p className="text-sm text-gray-600">
                  Apply first treatment as soon as symptoms are detected
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="w-6 h-6 rounded-full bg-blue-500 z-10 mr-4"></div>
              <div className="flex-1 bg-white p-3 rounded-md border border-blue-200">
                <h4 className="font-medium text-gray-800">
                  Days 3-5: Monitor Results
                </h4>
                <p className="text-sm text-gray-600">
                  Check for improvement or spread of disease
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="w-6 h-6 rounded-full bg-blue-500 z-10 mr-4"></div>
              <div className="flex-1 bg-white p-3 rounded-md border border-blue-200">
                <h4 className="font-medium text-gray-800">
                  Days 7-10: Reapplication
                </h4>
                <p className="text-sm text-gray-600">
                  Apply follow-up treatment as recommended
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Treatments;
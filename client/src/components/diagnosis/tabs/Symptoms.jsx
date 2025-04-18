import { AlertTriangle } from "lucide-react";
import React from "react";

const Symptoms = ({selectedDiagnosis}) => {
  return (
    <div>
      <div className="flex mb-6">
        
        <div className="w-full bg-yellow-50 p-4 rounded-lg">
          <h3 className="text-xl font-medium text-gray-800 mb-3 flex items-center">
            <AlertTriangle size={24} className="mr-2 text-yellow-600" />{" "}
            Symptoms Detail
          </h3>
          {
            selectedDiagnosis.symptoms.map((s,i)=>(

              <p key={i} className="text-gray-700 mb-4">{i+1}. {s}</p>
            ))
          }
          <div className="bg-white p-3 rounded-md border border-yellow-200">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Early detection is critical. Monitor your
              crops regularly for these symptoms to prevent spread.
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h4 className="font-medium text-gray-800 mb-2">Early Stage</h4>
          <p className="text-sm text-gray-600">
            First signs may include slight discoloration and small spots
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h4 className="font-medium text-gray-800 mb-2">Mid Stage</h4>
          <p className="text-sm text-gray-600">
            Lesions expand, leaves begin to wilt or curl
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h4 className="font-medium text-gray-800 mb-2">Advanced Stage</h4>
          <p className="text-sm text-gray-600">
            Widespread damage, potential crop loss if untreated
          </p>
        </div>
      </div>
    </div>
  );
};

export default Symptoms;

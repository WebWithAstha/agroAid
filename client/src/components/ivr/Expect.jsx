import { Clock} from "lucide-react";

const WhatToExpect = () => (
  <div className="bg-blue-50 p-4 lg:col-span-1 md:col-span-2">
    <div className="px-6 py-4 w-full text-center border-b border-gray-200">
      <h4 className="font-medium text-blue-800 mb-2 flex items-center">
        <Clock size={16} className="mr-2" /> What to Expect
      </h4>
    </div>
    <ul className="text-sm text-gray-700 py-4 space-y-2">
      <li className="flex items-start">
        <span className="w-5 h-5 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 text-xs mr-2 flex-shrink-0 mt-0.5">
          1
        </span>
        <span>You'll receive a call within 30 seconds</span>
      </li>
      <li className="flex items-start">
        <span className="w-5 h-5 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 text-xs mr-2 flex-shrink-0 mt-0.5">
          2
        </span>
        <span>IVR will guide you through language selection</span>
      </li>
      <li className="flex items-start">
        <span className="w-5 h-5 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 text-xs mr-2 flex-shrink-0 mt-0.5">
          3
        </span>
        <span>Experience crop diagnosis and advisory features</span>
      </li>
      <li className="flex items-start">
        <span className="w-5 h-5 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 text-xs mr-2 flex-shrink-0 mt-0.5">
          4
        </span>
        <span>No charges - completely free demo call</span>
      </li>
    </ul>
  </div>
);

export default WhatToExpect;

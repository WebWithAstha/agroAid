import { ChevronDown, ChevronUp, Globe, CheckCircle } from 'lucide-react';

const features = [
  ['Crop Disease Diagnosis', 'Identify problems from symptoms and get tailored advice'],
  ['Weather Alerts', 'Receive localized weather forecasts and farming recommendations'],
  ['Market Prices', 'Get current market rates for various crops in nearby mandis'],
  ['Expert Callback', 'Request a callback from agriculture experts for complex issues'],
  ['Seasonal Advisories', 'Receive timely information about seasonal farming activities']
];

const FeaturesSection = ({ expanded, toggle }) => (
  <div className="bg-white rounded-xl shadow-xs overflow-hidden">
    <div
      className="px-6 py-4 border-b border-gray-200 flex justify-between items-center cursor-pointer"
      onClick={() => toggle('features')}
    >
      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
        <Globe size={24} className="mr-4 text-green-600" /> Key Features
      </h3>
      {expanded === 'features' ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
    </div>
    {expanded === 'features' && (
      <div className="p-6 space-y-4">
        {features.map(([title, desc], i) => (
          <div key={i} className="flex items-start">
            <CheckCircle size={20} className="mr-3 text-green-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-800">{title}</h4>
              <p className="text-gray-600 text-sm">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default FeaturesSection;

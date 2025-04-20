import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const steps = [
  ['Call the IVR Number', 'Dial our toll-free number from any phone'],
  ['Select Your Language', 'Choose from 8 available regional languages'],
  ['Navigate Options', 'Use voice or keypad to select from crop categories, issues, etc.'],
  ['Get Solutions', 'Receive detailed advice for your specific farming issue']
];

const HowItWorksSection = ({ expanded, toggle }) => (
  <div className="bg-white rounded-xl shadow-xs overflow-hidden mb-2">
    <div
      className="px-6 py-4 border-b border-gray-200 flex justify-between items-center cursor-pointer"
      onClick={() => toggle('howItWorks')}
    >
      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
        <HelpCircle size={24} className="mr-4 text-green-600" /> How It Works
      </h3>
      {expanded === 'howItWorks' ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
    </div>
    {expanded === 'howItWorks' && (
      <div className="p-6 relative">
        <div className="absolute left-4 top-0 h-full w-0.5 bg-green-200"></div>
        <div className="space-y-6">
          {steps.map(([title, desc], i) => (
            <div className="flex" key={i}>
              <div className="z-10 flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
                {i + 1}
              </div>
              <div className="ml-6">
                <h4 className="font-medium text-gray-800">{title}</h4>
                <p className="text-gray-600 text-sm mt-1">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

export default HowItWorksSection;

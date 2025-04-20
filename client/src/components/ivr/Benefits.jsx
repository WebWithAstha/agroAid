import { ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

const BenefitsSection = ({ expanded, toggle }) => (
  <div className="bg-white rounded-xl shadow-xs overflow-hidden mb-2">
    <div
      className="px-6 py-4 border-b border-gray-200 flex justify-between items-center cursor-pointer"
      onClick={() => toggle('benefits')}
    >
      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
        <CheckCircle size={24} className="mr-4 text-green-600" /> Benefits for Farmers
      </h3>
      {expanded === 'benefits' ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
    </div>
    {expanded === 'benefits' && (
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { title: 'Accessibility', text: 'Works on any basic phone without needing smartphones or internet connection' },
          { title: 'Convenience', text: 'Get answers while in the field, without needing to travel for consultations' },
          { title: 'Language Support', text: 'Available in 8 regional languages to ensure clear communication' },
          { title: '24/7 Availability', text: 'Access information at any time, even during non-business hours' },
        ].map(({ title, text }) => (
          <div key={title} className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">{title}</h4>
            <p className="text-gray-700 text-sm">{text}</p>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default BenefitsSection;

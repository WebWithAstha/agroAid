import { Info } from 'lucide-react'
import React from 'react'

const Preventions = ({selectedDiagnosis}) => {
  return (
    <div>
            <div className="bg-blue-50 p-5 rounded-lg mb-6">
              <h3 className="text-xl font-medium text-gray-800 mb-4 flex items-center">
                <Info size={24} className="mr-2 text-blue-600" /> Prevention
                Strategies
              </h3>
              <p className="text-gray-700 mb-4">
                {selectedDiagnosis.prevention}
              </p>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white p-4 rounded-md border border-blue-200">
                  <h4 className="font-medium text-gray-800 mb-2">
                    Cultural Practices
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                  {selectedDiagnosis.preventions.map((t,i)=>(
                <li>• {t}</li>

              ))}
                  </ul>
                </div>
                {/* <div className="bg-white p-4 rounded-md border border-blue-200">
                  <h4 className="font-medium text-gray-800 mb-2">
                    Environmental Management
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Drip irrigation instead of overhead watering</li>
                    <li>• Morning watering to allow drying before evening</li>
                    <li>• Proper field drainage</li>
                    <li>• Maintain optimal plant nutrition</li>
                  </ul>
                </div> */}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-800 mb-3">
                  Resistant Varieties
                </h4>
                <p className="text-sm text-gray-600">
                  Plant disease-resistant cultivars appropriate for your region.
                  Consult local agricultural extension for recommendations.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-800 mb-3">
                  Biological Controls
                </h4>
                <p className="text-sm text-gray-600">
                  Introduce beneficial microorganisms that can suppress
                  pathogens or strengthen plant immunity.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-800 mb-3">
                  Monitoring Schedule
                </h4>
                <p className="text-sm text-gray-600">
                  Implement regular scouting (2-3 times weekly) during critical
                  growth stages to catch problems early.
                </p>
              </div>
            </div>
          </div>
  )
}

export default Preventions
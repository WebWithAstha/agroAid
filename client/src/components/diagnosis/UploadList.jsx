import { ChevronRight } from 'lucide-react'
import React from 'react'

const UploadList = ({allDiagnosis,selectedDiagnosis,getSeverityColor,setSelectedDiagnosis}) => {
  return (
    <div className=" w-full flex-1 md:min-w-40  md:h-full h-40  bg-white border-r border-gray-200 md:overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-700">Your Uploads</h2>
          </div>
          {allDiagnosis?.length>0 ? 
          <div className="divide-y md:block flex md:overflow-x-hidden overflow-x-auto md:w-max w-full divide-gray-200">
            {[...allDiagnosis].reverse().map(diagnosis => (
              <div 
                key={diagnosis._id}
                onClick={() => setSelectedDiagnosis(diagnosis._id)} 
                className={`md:p-4 p-2 shrink-0 md:w-full w-20 cursor-pointer  hover:bg-gray-50 transition-colors ${selectedDiagnosis?._id === diagnosis._id ? 'bg-green-50 border-l-4 border-green-500' : ''}`}
              >
                <div className="flex items-center gap-2 justify-between w-full">
                  <div className="md:w-16 h-16 w-full bg-gray-100 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                    <img src={diagnosis.image} alt={diagnosis.cropName} className="w-full text-xs h-full object-cover" />
                  </div>
                  <div className="flex-1 md:block hidden ">
                    <h3 className="font-medium text-gray-900">{diagnosis.cropName}</h3>
                    <p className="text-sm text-gray-600">{diagnosis.disease}</p>
                    <div className="flex items-center mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full text-white ${getSeverityColor(diagnosis.severity)}`}>
                        {diagnosis.severity}
                      </span>
                      <span className="text-xs text-gray-500 ml-2">{diagnosis.uploadDate}</span>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </div>
              </div>
            ))}
          </div>
          : <h2 className='w-max mx-auto my-4'>No diagnosis</h2>}

        </div>
  )
}

export default UploadList
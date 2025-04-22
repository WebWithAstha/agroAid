import { Check, Upload, X } from 'lucide-react';
import React from 'react'

const UploadSection = ({ uploadedImage, isAnalyzing, handleImageUpload, resetDiagnosis }) => {
    return (
      <div className="col-span-1 md:h-[84vh] bg-white rounded-xl overflow-hidden border border-green-100">
        <div className="p-4 bg-green-50 border-b border-green-100">
          <h3 className="font-medium text-green-800 flex items-center gap-2">
            <Upload size={18} />
            Upload Crop Image
          </h3>
        </div>
        
        {!uploadedImage ? (
          <div className="p-6  h-[90%]">
            <div className="border-2 h-full border-dashed border-green-200 rounded-lg p-8 flex flex-col items-center justify-center text-center">
              {/* <Image size={48} className="text-green-300 mb-3" /> */}
              <p className="text-sm text-gray-600 mb-4">
                Upload a clear image of the affected crop part (leaf, stem, fruit)
              </p>
              <label className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors">
                Select Image
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            </div>
            
            {/* <UploadTips /> */}
          </div>
        ) : (
          <div className="p-4">
            <div className="relative mb-3">
              <img src={uploadedImage} alt="Uploaded crop" className="w-full h-48 object-cover rounded-lg" />
              <button 
                onClick={resetDiagnosis} 
                className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70 transition-opacity"
              >
                <X size={14} />
              </button>
            </div>
            
            {isAnalyzing ? (
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <div className="flex justify-center mb-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-green-500"></div>
                </div>
                <p className="text-sm text-blue-700">Analyzing your crop image...</p>
              </div>
            ) : (
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <div className="flex justify-center mb-2">
                  <Check size={20} className="text-green-600" />
                </div>
                <p className="text-sm text-green-700">Analysis complete!</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };
export default UploadSection
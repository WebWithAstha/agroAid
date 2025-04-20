import { CheckCircle } from 'lucide-react'
import React from 'react'

const Intro = () => {
  return (
    <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Farming Advice via Phone Call
                </h2>
                <p className="text-gray-600 mb-6">
                  Get instant farming solutions through our Interactive Voice Response (IVR) system. Ask questions, receive diagnostics, and get timely advice - all through a simple phone call in your local language.
                </p>
                <div className="flex items-center space-x-2 text-green-700 mb-4">
                  <CheckCircle size={20} />
                  <span>No internet connection needed</span>
                </div>
                <div className="flex items-center space-x-2 text-green-700 mb-4">
                  <CheckCircle size={20} />
                  <span>Available in 8 regional languages</span>
                </div>
                <div className="flex items-center space-x-2 text-green-700 mb-4">
                  <CheckCircle size={20} />
                  <span>24/7 automated assistance</span>
                </div>
              </div>
  )
}

export default Intro
import { useState } from 'react';
import { Upload, X, Check, Leaf, AlertTriangle, Sprout, ShieldCheck, PlusCircle, Image } from 'lucide-react';

const Diagnosis = ()=> {
  const [activeTab, setActiveTab] = useState('results');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showResults, setShowResults] = useState(false);
  
  // Sample diagnosis results
  const diagnosisResult = {
    cropType: "Tomato",
    disease: "Late Blight (Phytophthora infestans)",
    confidence: 96.7,
    severity: "Moderate",
    description: "Late blight is a potentially devastating disease of tomato and potato, infecting leaves, stems, and fruits. The disease spreads quickly in wet weather with cool nights and warm days.",
    symptoms: [
      "Brown/black lesions on leaves and stems",
      "White fungal growth on leaf undersides",
      "Rapid wilting and tissue death",
      "Fruits develop dark, firm lesions"
    ],
    solutions: [
      {
        type: "Organic",
        methods: [
          "Remove and destroy infected plants",
          "Apply copper-based fungicides",
          "Increase plant spacing for better air circulation",
          "Avoid overhead irrigation"
        ]
      },
      {
        type: "Chemical",
        methods: [
          "Chlorothalonil applications (7-10 day intervals)",
          "Mancozeb fungicide as preventive measure",
          "Metalaxyl-based fungicides for systemic control"
        ]
      }
    ],
    prevention: [
      "Plant resistant varieties",
      "Rotate crops every 2-3 years",
      "Ensure proper drainage in fields",
      "Avoid planting in locations with poor air circulation"
    ],
    similarCases: [
      {
        id: 1,
        image: "/api/placeholder/120/120",
        farmLocation: "Central Valley",
        severity: "High"
      },
      {
        id: 2,
        image: "/api/placeholder/120/120",
        farmLocation: "Eastern Highlands",
        severity: "Moderate"
      },
      {
        id: 3,
        image: "/api/placeholder/120/120",
        farmLocation: "Western Plains",
        severity: "Low"
      }
    ]
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
      setIsAnalyzing(true);
      
      // Simulate analysis delay
      setTimeout(() => {
        setIsAnalyzing(false);
        setShowResults(true);
      }, 2000);
    }
  };

  const resetDiagnosis = () => {
    setUploadedImage(null);
    setShowResults(false);
  };

  // Severity color mapping
  const getSeverityColor = (severity) => {
    switch(severity.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'moderate': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-green-200 w-full max-w-4xl mx-auto font-sans">
      {/* Header Section with Natural Texture Background */}
      <div className="relative bg-gradient-to-r from-green-800 to-green-600 text-white p-6 overflow-hidden">
        {/* Leaf pattern background */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <pattern id="leafPattern" patternUnits="userSpaceOnUse" width="60" height="60" patternTransform="rotate(45)">
              <path d="M30,5 C40,20 50,10 30,30 C10,50 20,40 5,30 C20,20 10,10 30,5" 
                    fill="none" stroke="#ffffff" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#leafPattern)" />
          </svg>
        </div>
        
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Leaf className="text-green-300" />
              Crop Health Diagnosis
            </h2>
            <p className="text-green-100 mt-1">Upload crop images for instant disease detection & treatment advice</p>
          </div>
          <div className="hidden md:block">
            <ShieldCheck size={40} className="text-green-200" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gradient-to-b from-green-50 to-white">
        {/* Upload Section */}
        <div className="col-span-1 bg-white rounded-xl shadow-md overflow-hidden border border-green-100">
          <div className="p-4 bg-green-50 border-b border-green-100">
            <h3 className="font-medium text-green-800 flex items-center gap-2">
              <Upload size={18} />
              Upload Crop Image
            </h3>
          </div>
          
          {!uploadedImage ? (
            <div className="p-6">
              <div className="border-2 border-dashed border-green-200 rounded-lg p-8 flex flex-col items-center justify-center text-center">
                <Image size={48} className="text-green-300 mb-3" />
                <p className="text-sm text-gray-600 mb-4">
                  Upload a clear image of the affected crop part (leaf, stem, fruit)
                </p>
                <label className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors">
                  Select Image
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              </div>
              
              <div className="mt-4 bg-blue-50 rounded-lg p-3">
                <h4 className="text-sm font-medium text-blue-700 mb-1">Tips for better diagnosis:</h4>
                <ul className="text-xs text-blue-600 list-disc pl-4 space-y-1">
                  <li>Ensure good lighting when taking photos</li>
                  <li>Include both healthy and affected areas for comparison</li>
                  <li>Take close-up shots of symptomatic areas</li>
                  <li>Include multiple angles if possible</li>
                </ul>
              </div>
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

        {/* Diagnosis Results Section */}
        <div className="col-span-1 md:col-span-2">
          {showResults ? (
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-green-100">
              {/* Diagnosis Header */}
              <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-4 border-b border-amber-200">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-green-600 text-white mb-1">
                      {diagnosisResult.cropType}
                    </span>
                    <h3 className="font-bold text-xl text-amber-900">{diagnosisResult.disease}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-600 mb-1">Confidence</div>
                    <div className="text-lg font-bold text-amber-700">{diagnosisResult.confidence}%</div>
                  </div>
                </div>
                
                <div className="mt-2 flex items-center">
                  <span className="text-sm mr-2">Severity:</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(diagnosisResult.severity)}`}>
                    {diagnosisResult.severity}
                  </span>
                </div>
              </div>
              
              {/* Tabs for different information */}
              <div className="border-b border-gray-200">
                <nav className="flex">
                  {['results', 'solutions', 'similar'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === tab 
                          ? 'border-green-500 text-green-600' 
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab === 'results' && 'Diagnosis'}
                      {tab === 'solutions' && 'Treatment'}
                      {tab === 'similar' && 'Similar Cases'}
                    </button>
                  ))}
                </nav>
              </div>
              
              {/* Tab Content */}
              <div className="p-4">
                {activeTab === 'results' && (
                  <div>
                    <div className="mb-4">
                      <p className="text-gray-700">{diagnosisResult.description}</p>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-1">
                        <AlertTriangle size={16} className="text-yellow-500" />
                        Symptoms
                      </h4>
                      <ul className="bg-gray-50 rounded-lg p-3 space-y-2">
                        {diagnosisResult.symptoms.map((symptom, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                            <div className="bg-yellow-100 rounded-full p-1 mt-0.5 flex-shrink-0">
                              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                            </div>
                            {symptom}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-1">
                        <ShieldCheck size={16} className="text-green-500" />
                        Prevention
                      </h4>
                      <ul className="bg-gray-50 rounded-lg p-3 space-y-2">
                        {diagnosisResult.prevention.map((item, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                            <div className="bg-green-100 rounded-full p-1 mt-0.5 flex-shrink-0">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                            </div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                
                {activeTab === 'solutions' && (
                  <div className="space-y-4">
                    {diagnosisResult.solutions.map((solution, index) => (
                      <div key={index} className="rounded-lg overflow-hidden border border-gray-200">
                        <div className={`p-3 font-medium ${
                          solution.type === 'Organic' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {solution.type} Methods
                        </div>
                        <ul className="p-3 space-y-2">
                          {solution.methods.map((method, methodIndex) => (
                            <li key={methodIndex} className="text-sm text-gray-700 flex items-start gap-2">
                              <Check size={16} className={`flex-shrink-0 ${
                                solution.type === 'Organic' 
                                  ? 'text-green-500' 
                                  : 'text-blue-500'
                              }`} />
                              {method}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    
                    <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                      <h4 className="text-sm font-medium text-amber-800 mb-2">Important Notice:</h4>
                      <p className="text-xs text-amber-700">
                        Always follow label instructions when applying any treatments. Consider consulting with a local agricultural extension office for recommendations tailored to your specific conditions.
                      </p>
                    </div>
                  </div>
                )}
                
                {activeTab === 'similar' && (
                  <div>
                    <p className="text-sm text-gray-600 mb-3">
                      Similar cases of {diagnosisResult.disease} reported by other farmers:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {diagnosisResult.similarCases.map((item) => (
                        <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                          <img 
                            src={item.image} 
                            alt={`Similar case ${item.id}`} 
                            className="w-full h-24 object-cover" 
                          />
                          <div className="p-2">
                            <div className="text-xs text-gray-500">{item.farmLocation}</div>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-xs">Severity:</span>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(item.severity)}`}>
                                {item.severity}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <div className="border border-dashed border-gray-300 rounded-lg flex items-center justify-center p-4 text-center">
                        <div>
                          <PlusCircle size={24} className="text-gray-400 mx-auto mb-2" />
                          <p className="text-xs text-gray-500">Submit your case to help other farmers</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-green-100 h-full flex flex-col justify-center items-center p-8 text-center">
              <Sprout size={64} className="text-green-200 mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">No Diagnosis Yet</h3>
              <p className="text-gray-500 max-w-md">
                Upload an image of your crop to receive a detailed diagnosis, treatment recommendations, and prevention tips.
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <div className="bg-gradient-to-r from-green-800 to-green-700 p-4 text-center">
        <p className="text-green-100 text-sm">
          Early detection and treatment of crop diseases can save up to 80% of your yield
        </p>
      </div>
    </div>
  );
}

export default Diagnosis;
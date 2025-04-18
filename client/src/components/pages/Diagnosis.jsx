import { useState,useEffect } from 'react';
import { Upload, Plus, X, Check } from 'lucide-react';
import { useDispatch,useSelector } from 'react-redux';
import { fetchAllDiagnosisAction,selectDiagnosisAction ,uploadForDiagnosisAction} from '../../store/Actions/diagnosisAction.jsx';
import UploadList from '../diagnosis/UploadList.jsx';
import DisplayDiagnosis from '../diagnosis/DisplayDiagnosis.jsx';
import Header from '../Header.jsx'
import Loading from '../partials/Loading.jsx'


// Main component
const Diagnosis=()=> {
  // Sample data for demonstration
  const dispatch = useDispatch();
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  const {selectedDiagnosis:selectedDiagnosisId,loading} = useSelector((state) => state.diagnosisReducer);
const allDiagnosis = useSelector((state) => state.diagnosisReducer.allDiagnosis);


const setSelectedDiagnosis = (id)=> {
  dispatch(selectDiagnosisAction(id))
  setIsFormOpen(false)
}


let selectedDiagnosis
if(allDiagnosis && allDiagnosis.length > 0){
  selectedDiagnosis = allDiagnosis.find(d => d._id === selectedDiagnosisId);
}
const storeId = sessionStorage.getItem("selectedDiagnosisId")
useEffect(() => {
  if(storeId && storeId !== 'null'){
    dispatch(selectDiagnosisAction(storeId))
    setIsFormOpen(false)
  }else{
    // console.log("hey")
    setIsFormOpen(true)
  }
  if(!allDiagnosis){
    dispatch(fetchAllDiagnosisAction());
  }
}, []);


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
      setIsAnalyzing(true);
  
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1]; 
        const imagesArray = [base64String]; 
  
        dispatch(uploadForDiagnosisAction(imagesArray))
        setIsFormOpen(false);

  
        setTimeout(() => {
          setIsAnalyzing(false);
        }, 2000);
      };
  
      reader.readAsDataURL(file);
    }
  };

  const resetDiagnosis = () => {
    setUploadedImage(null);
  };

  // Severity badge color
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const handleNewUpload =()=>{
    dispatch(selectDiagnosisAction(null))
    setIsFormOpen(true)
  }

  return (
    loading ? <Loading/> :
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
    {/* Header */}
    <div className="relative">

    <Header title={"Crop Diagnosis Dashboard"}/>

        <button 
          onClick={handleNewUpload}
          className="bg-white text-black absolute right-4 bottom-4 hover:bg-green-700 transition-all cursor-pointer hover:text-white py-2 px-4 rounded-lg flex items-center"
          >
          <Plus size={20} className="mr-1" /> New Diagnosis
        </button>
          </div>
    {/* Main Content */}
    <div className="flex flex-1 overflow-hidden">
      {/* Sidebar - List of diagnoses */}
      {
        allDiagnosis &&
        <UploadList allDiagnosis={allDiagnosis} getSeverityColor={getSeverityColor} setSelectedDiagnosis={setSelectedDiagnosis} selectedDiagnosis={selectedDiagnosis}/>
      }

      {/* Main content area */}
      <div className="w-full h-full overflow-hidden p-2">
        {!isFormOpen ? (
          <DisplayDiagnosis
          selectedDiagnosis={selectedDiagnosis}
          setSelectedDiagnosis={setSelectedDiagnosis}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          getSeverityColor={getSeverityColor}
          />
        ) : (
          <UploadSection
          uploadedImage={uploadedImage}
          isAnalyzing={isAnalyzing}
          handleImageUpload={handleImageUpload}
          resetDiagnosis={resetDiagnosis}
       
          />
        ) }
      </div>
    </div>
  </div>
   
  );
}

export default Diagnosis;

// Upload Section Component
const UploadSection = ({ uploadedImage, isAnalyzing, handleImageUpload, resetDiagnosis }) => {
  return (
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
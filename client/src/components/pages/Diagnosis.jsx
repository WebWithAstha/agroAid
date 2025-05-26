import { useState, useEffect } from "react";
import { Upload, Plus, X, Check } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllDiagnosisAction,
  selectDiagnosisAction,
  uploadForDiagnosisAction,
} from "../../store/Actions/diagnosisAction.jsx";
import UploadList from "../diagnosis/UploadList.jsx";
import DisplayDiagnosis from "../diagnosis/DisplayDiagnosis.jsx";
import Header from "../partials/Header";
import Loading from "../partials/Loading.jsx";
import Btn from "../partials/Btn.jsx";
import UploadSection from "../loading/diagnosis/UploadSection.jsx";

// Main component
const Diagnosis = () => {
  // Sample data for demonstration
  const dispatch = useDispatch();
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  const { selectedDiagnosis: selectedDiagnosisId, loading } = useSelector(
    (state) => state.diagnosisReducer
  );
  const allDiagnosis = useSelector(
    (state) => state.diagnosisReducer.allDiagnosis
  );

  

  const setSelectedDiagnosis = (id) => {
    dispatch(selectDiagnosisAction(id));
    setIsFormOpen(false);
  };

  let selectedDiagnosis;
  if (allDiagnosis && allDiagnosis?.length > 0) {
    selectedDiagnosis = allDiagnosis.find((d) => d._id === selectedDiagnosisId);
  }
  const storeId = sessionStorage.getItem("selectedDiagnosisId");
  useEffect(() => {
    if (storeId && storeId !== "null") {
      dispatch(selectDiagnosisAction(storeId));
      setIsFormOpen(false);
    } else {
      // console.log("hey")
      setIsFormOpen(true);
    }
    
    if (allDiagnosis?.length==0) {
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
        const base64String = reader.result.split(",")[1];
        const imagesArray = [base64String];

        dispatch(uploadForDiagnosisAction(imagesArray));
        setIsFormOpen(false);

        setTimeout(() => {
          setIsAnalyzing(false);
        }, 2000);
      };

      reader.readAsDataURL(file);
      setUploadedImage(null);
    }
  };

  const resetDiagnosis = () => {
    setUploadedImage(null);
  };

  // Severity badge color
  const getSeverityColor = (severity) => {
    switch (severity) {
      case "High":
        return "bg-red-500";
      case "Medium":
        return "bg-yellow-500";
      case "Low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleNewUpload = () => {
    dispatch(selectDiagnosisAction(null));
    setIsFormOpen(true);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
      {/* Header */}
      <div className="relative ">
        <Header title={"Crop Diagnosis Dashboard"} />

        <div
          className="md:absolute w-max md:mx-0 mx-4 ml-auto right-4 md:right-6 bottom-4 md:mb-0 mb-2"
          onClick={handleNewUpload}
        >
          <Btn title={" New Diagnosis"} />
        </div>
      </div>
      {/* Main Content */}
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        {/* Sidebar - List of diagnoses */}
        {allDiagnosis && (
          <div className="w-full md:w-1/3 lg:w-1/4 md:p-0 p-2 max-w-full md:max-w-xs border-r border-zinc-200 bg-white md:overflow-x-hidden overflow-x-auto md:overflow-y-auto">
            <UploadList
              allDiagnosis={allDiagnosis}
              getSeverityColor={getSeverityColor}
              setSelectedDiagnosis={setSelectedDiagnosis}
              selectedDiagnosis={selectedDiagnosis}
            />
          </div>
        )}

        {/* Main content area */}
        <div className="w-full h-full overflow-hidden p-2 sm:p-4 flex-1">
          {loading ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-4 border-zinc-300 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-zinc-500 text-sm">Loading analysis...</p>
              </div>
            </div>
          ) : !isFormOpen ? (
            <DisplayDiagnosis
              selectedDiagnosis={selectedDiagnosis}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Diagnosis;

import React from "react";
import Overview from "./tabs/Overview";
import Symptoms from "./tabs/Symptoms";
import Treatments from "./tabs/Treatments";
import Preventions from "./tabs/Preventions";
import Gallery from "./tabs/Gallery";

const DisplayDiagnosis = ({
  selectedDiagnosis,
  activeTab,
  setActiveTab,
  getSeverityColor,
}) => {
  console.log(selectedDiagnosis)
  return (
   selectedDiagnosis &&
    <div className="bg-white rounded-lg overflow-y-auto h-full shadow-md">
      {/* Detail Header */}
      <div className=" sticky top-0 bg-white">
        <div className="p-6 border-b border-gray-200 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {selectedDiagnosis.cropName}
            </h2>
            <p className="text-lg text-gray-600">{selectedDiagnosis.disease}</p>
          </div>
          <div>
            <span
              className={`inline-block px-3 py-1 rounded-full text-white ${getSeverityColor(
                selectedDiagnosis.severity
              )}`}
            >
              Severity: {selectedDiagnosis.severity}
            </span>
            <p className="text-sm text-gray-500 mt-2 text-right">
              Uploaded: {selectedDiagnosis.uploadDate}
            </p>
          </div>
        </div>
        {/* Tabs */}
        <Tab setActiveTab={setActiveTab} activeTab={activeTab} />
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "overview" && 
          <Overview selectedDiagnosis={selectedDiagnosis}/>
        }

        {activeTab === "symptoms" && (
          <Symptoms selectedDiagnosis={selectedDiagnosis}/>
        )}

        {activeTab === "treatment" && (
          <Treatments selectedDiagnosis={selectedDiagnosis}/>
        )}

        {activeTab === "prevention" && (
        <Preventions selectedDiagnosis={selectedDiagnosis}/>
        )}
        {activeTab === "gallery" && (
        <Gallery selectedDiagnosis={selectedDiagnosis}/>
        )}
      </div>
    </div>
  );
};

export default DisplayDiagnosis;

const Tab = ({ activeTab, setActiveTab }) => (
  <div className="border-b border-gray-200">
    <nav className="flex">
      <button
        onClick={() => setActiveTab("overview")}
        className={`px-4 py-3 text-sm font-medium ${
          activeTab === "overview"
            ? "border-b-2 border-green-500 text-green-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        Overview
      </button>
      <button
        onClick={() => setActiveTab("symptoms")}
        className={`px-4 py-3 text-sm font-medium ${
          activeTab === "symptoms"
            ? "border-b-2 border-green-500 text-green-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        Symptoms
      </button>
      <button
        onClick={() => setActiveTab("treatment")}
        className={`px-4 py-3 text-sm font-medium ${
          activeTab === "treatment"
            ? "border-b-2 border-green-500 text-green-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        Treatment
      </button>
      <button
        onClick={() => setActiveTab("prevention")}
        className={`px-4 py-3 text-sm font-medium ${
          activeTab === "prevention"
            ? "border-b-2 border-green-500 text-green-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        Prevention
      </button>
      <button
        onClick={() => setActiveTab("gallery")}
        className={`px-4 py-3 text-sm font-medium ${
          activeTab === "gallery"
            ? "border-b-2 border-green-500 text-green-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        Gallery
      </button>
    </nav>
  </div>
);

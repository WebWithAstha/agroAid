import { AlertTriangle, BarChart4, Info, Shell } from "lucide-react";
import React from "react";

const Gallery = ({ selectedDiagnosis }) => {
  return (
    <div className="">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {selectedDiagnosis.similarImages.map((img,i)=>(

          <div key={img} className="rounded-lg bg-gray-100 overflow-hidden mb-4">
            <img
              src={img}
              alt={selectedDiagnosis.cropName}
              className="w-full text-xs h-52 object-cover"
            />
        </div>
        ))}
        
    </div>
    </div>
  );
};

export default Gallery;

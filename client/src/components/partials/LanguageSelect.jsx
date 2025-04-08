import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import {Link} from  "react-router-dom";

const languages = [
  { name: "English", code: "en", flag: "🇺🇸" },
  { name: "हिन्दी", code: "hi", flag: "🇮🇳" },
  { name: "मराठी", code: "mr", flag: "🇮🇳" },
  { name: "தமிழ்", code: "ta", flag: "🇮🇳" },
];

const LanguageSelector = () => {
  const [selected, setSelected] = useState(null);

  const handleSelect = (code) => {
    setSelected(code);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-emerald-100 to-white px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-center text-emerald-800 mb-1">
          Choose Language / भाषा चुनें
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Select your preferred language to continue
        </p>

        <div className="grid grid-cols-2 gap-4">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={`relative flex items-center justify-between w-full p-4 border rounded-xl transition-all duration-200 shadow-sm ${
                selected === lang.code
                  ? "border-emerald-600 bg-emerald-50"
                  : "border-gray-200 bg-white hover:border-emerald-300"
              }`}
            >
              <span className="flex items-center gap-2 text-gray-800 font-medium text-base">
                <span className="text-xl">{lang.flag}</span>
                {lang.name}
              </span>
              {selected === lang.code && (
                <CheckCircle className="text-emerald-600 w-5 h-5" />
              )}
            </button>
          ))}
        </div>
          
          <Link to={'/register'}>
        <button
          disabled={!selected}
          draggable={false}
          className={`w-full mt-6 py-2.5 rounded-lg font-semibold text-white shadow-md transition ${
            selected
              ? "bg-emerald-600 hover:bg-emerald-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
        </Link>
      </div>
    </div>
  );
};

export default LanguageSelector;

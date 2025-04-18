import { ArrowLeftIcon, Leaf } from "lucide-react";
import React from "react";
import { useNavigate} from 'react-router-dom'

const Header = ({title,des}) => {
const navigate = useNavigate();
  return (
    <div className="relative pt-10 z-0 bg-gradient-to-r from-green-800 to-green-600 text-white p-6 overflow-hidden flex justify-between items-center">
      <div onClick={() => navigate(-1)} className="absolute top-3 left-4 p-1">
        <ArrowLeftIcon />
      </div>
      <div className="absolute z-[-1] inset-0 opacity-10">
        <svg width="100%" height="100%">
          <pattern
            id="leafPattern"
            patternUnits="userSpaceOnUse"
            width="60"
            height="60"
            patternTransform="rotate(45)"
          >
            <path
              d="M30,5 C40,20 50,10 30,30 C10,50 20,40 5,30 C20,20 10,10 30,5"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#leafPattern)" />
        </svg>
      </div>
      <div>
        <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Leaf className="text-green-300" />
          {title}
        </h2>
        <p className="text-green-100 mt-1">
          {des}
        </p>
      </div>
    </div>
  );
};

export default Header;

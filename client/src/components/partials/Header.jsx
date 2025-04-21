import { ArrowLeftIcon, Leaf } from "lucide-react";
import React from "react";
import { useNavigate} from 'react-router-dom'

const Header = ({title,des}) => {
const navigate = useNavigate();
  return (
    <div className="relative  z-0  border-b border-black/[.2] bg-white px-20  md:px-24 py-5  overflow-hidden flex justify-between items-center">
      <div onClick={() => navigate(-1)} className="absolute bg-green-600 rounded-full p-2 text-white top-1/2 -translate-y-1/2  md:left-8 left-3">
        <ArrowLeftIcon className="" />
      </div>
      <div className="absolute hidden z-[-1] inset-0 opacity-10">
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
      <div className=" flex flex-col">
        <h2 className="text-2xl  font-bold tracking-tight flex items-center gap-2">
          
          {title}
          <Leaf className="text-green-600" />
        </h2>
        <p className="text-sm text-sky-700 rounded">
                              {des ? des : "xyz hellp"}
        </p>
      </div>
    </div>
  );
};

export default Header;

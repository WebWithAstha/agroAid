import React from "react";
import { Home, Search, Mic, User, Bell, CloudSun, Camera, IndianRupee } from "lucide-react";
import { Link, NavLink } from "react-router-dom"; // or use `<a href>` if not using React Router

const Navbar = () => {
  const navItems = [
    { label: "Home", icon: <Home className="w-5 h-5" />, href: "/dashboard" },
    { label: "Search", icon: <Search className="w-5 h-5" />, href: "/search" },
    { label: "Speak", icon: <Mic className="w-5 h-5" />, href: "/voice" },
    { label: "Profile", icon: <User className="w-5 h-5" />, href: "/profile" },
  ];

  return (
    <>
      {/* Top Navbar for desktop */}
      <header className="hidden md:block w-full  md:px-20 fixed bg-rose-600/[0] top-0 z-10">
        <div className=" w-full flex items-center justify-between py-2.5 backdrop-blur-xl">

<NavLink to={'/dashboard'}>
               <div className="flex items-center rounded-br-xl">
                 <div className="mr-2 bg-emerald-500 text-white rounded-lg">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M12 6.5C13.5 8 15.5 8 17 7.5C17 11.5 16 14 12 16C8 14 7 11.5 7 7.5C8.5 8 10.5 8 12 6.5Z" fill="white"/>
                     <path d="M12 16C8 14 7 11.5 7 7.5C8.5 8 10.5 8 12 6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                     <path d="M12 16V21" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                     <path d="M12 6.5C10.5 8 8.5 8 7 7.5C7 5.2 8.8 3 12 3C15.2 3 17 5.2 17 7.5C15.5 8 13.5 8 12 6.5Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                   </svg>
                 </div>
                 <h1 className="text-xl font-bold text-emerald-800">AgroAid</h1>
               </div>
               </NavLink>
               <div className="flex items-center gap-4 rounded-bl-xl ">
                 <button className="relative p-1">
                   <Bell size={20} className="text-gray-600" />
                   <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                 </button>
                 <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-medium">
                   RK
                 </div>
               </div>
        </div>
             </header>

      {/* Bottom Navbar for mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-3 flex justify-around shadow-lg">
        <button className="flex flex-col items-center text-emerald-600">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="rgba(16, 185, 129, 0.1)"/>
          </svg>
          <span className="text-xs mt-1">Home</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <IndianRupee size={24} />
          <span className="text-xs mt-1">Market</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <Camera size={24} />
          <span className="text-xs mt-1">Diagnose</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <CloudSun size={24} />
          <span className="text-xs mt-1">Weather</span>
        </button>
      </nav>
    </>
  );
};

export default Navbar;

import React from "react";
import {
  Mic,
  CloudSun,
  IndianRupee,
  Camera,
  ScrollText,
  Store,
  ChevronRight,
} from "lucide-react";
import Navbar from "../partials/Navbar";
import { Link } from "react-router-dom";
import IntroCard from "./IntroCard";
import OpenMarket from "./OpenMarket";
import { services } from "../../data/serviceOffered";
import ServiceCard from "./ServiceCard";
import Logo from "../partials/Logo";




const ServicesGrid = () => {
  
  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">Services</h3>
        <button className="text-emerald-600 text-sm font-medium flex items-center">
          View All <ChevronRight size={16} />
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {services.map((service, index) => (
          <Link key={index} to={service.link}>

            <ServiceCard service={service}/>
          </Link>

        ))}
      </div>
    </div>
  );
};


const Dashboard = () => {

  return (
    <div className="min-h-screen bg-zinc-50 md:pt-16 ">
      <div className="md:hidden px-4 pt-2 sticky top-0 z-[990] bg-white pb-2">
        <Logo/>
      </div>
      <Navbar />
      <main className="flex-1 px-4 pb-20 md:px-20 mx-auto w-full">
        <IntroCard/>
        <ServicesGrid />
        <OpenMarket/>
      </main>
    </div>
  );
};

export default Dashboard;

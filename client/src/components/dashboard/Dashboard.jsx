import React, { useState } from "react";
import {
  Mic,
  CloudSun,
  IndianRupee,
  Camera,
  ScrollText,
  Store,
  ChevronRight,
  Sunrise,
  BarChart,
  Droplet,
} from "lucide-react";
import Navbar from "../partials/Navbar";
import { Link } from "react-router-dom";

const GreetingCard = ({ isRecording, toggleRecording }) => {
  const assitant = () => (
    <>
      <div className="p-4 border backdrop-blur-xl relative w-max text-white rounded-2xl mt-6">
        <div className="w-max absolute top-1/2 -translate-y-1/2 md:translate-x-1/2 right-2 md:right-0">
            <button
              onClick={toggleRecording}
              className={`flex items-center justify-center w-20 h-20 rounded-full  transition-all duration-300 ${
                isRecording
                  ? "bg-red-600 border-red-700 animate-pulse"
                  : "backdrop-blur-3xl bg-amber-300"
              }`}
            >
              <Mic size={24} className="text-white" />
            </button>
        </div>
        <div className="w-[70%]">
          <h2 className="text-2xl md:text-3xl font-semibold flex items-center gap-2">
            Ask Any Farming Query
          </h2>
          <p className=" mt-2 text-sm">
            Voice-powered assistant for instant answers
          </p>
        </div>
      </div>
    </>
  );

  const greeting = () => (
    <>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
        Welcome, Rahul <span className="ml-2 text-xl">👋</span>
      </h2>
      <div className="mt-3 flex flex-wrap gap-2 text-sm text-gray-600">
        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
          Tuesday, April 8
        </span>
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
          Rabi Season
        </span>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
          Navsari, Gujarat
        </span>
      </div>
    </>
  );
  const bg = () => (
    <div className="absolute z-[-2] bg-zinc-200 right-0  h-full bottom-0 w-full">
      <img
        src="https://plus.unsplash.com/premium_photo-1661962499636-33ffabc4b060?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        className="w-full h-full object-cover object-center"
      />
    </div>
  );

  return (
    <div className="mb-4 md:mt-0 mt-3 relative min-h-[60vh] z-[0] flex flex-col justify-end  rounded-2xl overflow-hidden bg-white border border-gray-100 px-6 py-5">
      {/* {greeting()} */}
      {assitant()}
      {bg()}
    </div>
  );
};

const QuickStats = () => {
  const stats = [
    {
      icon: <Sunrise size={20} className="text-amber-500" />,
      label: "Today",
      value: "34°C",
      color: "amber",
    },
    {
      icon: <Droplet size={20} className="text-blue-500" />,
      label: "Irrigation",
      value: "Due",
      color: "blue",
    },
    {
      icon: <BarChart size={20} className="text-emerald-500" />,
      label: "Wheat Price",
      value: "₹2,500",
      color: "emerald",
    },
  ];
  return (
    <>
      <h3 className="text-lg font-bold text-gray-800 mb-4">Quicks updates</h3>
      <div className="flex flex-wrap gap-3 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-white border shrink-0 w-40 aspect-square flex items-center justify-center flex-col border-emerald-600 p-4 rounded-full shadow-sm hover:shadow-lg hover:border-emerald-300 transition-all duration-300 cursor-pointer`}
          >
            {stat.icon}
            <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            <p className={`font-semibold text-${stat.color}-800`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

const ServicesGrid = () => {
  const services = [
    {
      title: "Weather",
      desc: "5-day forecast",
      color: "amber",
      icon: <CloudSun size={44} className="text-amber-600" />,
      link : "/price"
    },
    {
      title: "Crop Prices",
      desc: "Live updates",
      color: "green",
      icon: <IndianRupee size={44} className="text-green-600" />,
      link : "/price"
    },
    {
      title: "Crop Diagnosis",
      desc: "AI-powered analysis",
      color: "blue",
      icon: <Camera size={44} className="text-blue-600" />,
      link : "/price"
    },
    {
      title: "Govt Schemes",
      desc: "Latest benefits",
      color: "purple",
      icon: <ScrollText size={44} className="text-purple-600" />,
      link : "/price"
    },
  ];
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
            <Link  key={index} to = {service.link}>

          <div
           
            className="bg-white border border-emerald-600 p-4 rounded-xl shadow-sm hover:shadow-lg hover:border-emerald-300 transition-all duration-300 cursor-pointer"
          >
            <div
              className={`bg-${service.color}-100 w-full h-32 rounded-lg flex items-center justify-center mb-3`}
            >
              {service.icon}
            </div>
            <h3 className="font-medium text-gray-800">{service.title}</h3>
            <p className="text-xs text-gray-500 mt-1">{service.desc}</p>
          </div>
          </Link>

        ))}
      </div>
    </div>
  );
};

const FeaturedCard = () => (
  <div className="bg-gradient-to-r from-emerald-50 via-green-50 to-white border border-emerald-600 rounded-xl p-5 flex flex-col sm:flex-row items-center gap-4">
    <div className="bg-white rounded-lg p-3 w-16 h-16 flex items-center justify-center">
      <Store size={32} className="text-emerald-600" />
    </div>
    <div className="flex-1 text-center sm:text-left">
      <h3 className="font-medium text-gray-800 text-lg">
        Direct Market Connect
      </h3>
      <p className="text-sm text-gray-600 mt-1">
        Sell your crops directly to buyers without middlemen
      </p>
    </div>
    <button className="mt-3 sm:mt-0 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg transition whitespace-nowrap">
      Get Started
    </button>
  </div>
);

const Dashboard = () => {
  const [isRecording, setIsRecording] = useState(false);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="flex-1 px-3 pb-20 md:px-20 mx-auto w-full">
        <GreetingCard
          isRecording={isRecording}
          toggleRecording={toggleRecording}
        />
        {/* <QuickStats /> */}
        <ServicesGrid />
        <FeaturedCard />
      </main>
    </div>
  );
};

export default Dashboard;

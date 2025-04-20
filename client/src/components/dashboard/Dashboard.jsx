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
import video from "../../assets/hero.mp4"
import Btn from "../partials/Btn";
import { uploadFile } from "../../Services/fileUpload";

const GreetingCard = () => {
  const assitant = () => (
    <>
      <div className="p-4 border border-white/[.1] backdrop-blur-xl bg-white/[.2] relative w-max text-white rounded-2xl mt-6">
        <div className="w-max absolute top-1/2 -translate-y-1/2 md:translate-x-1/2 right-2 md:right-0">
        <Link to={'/assistant'} >
          <button
            className={`flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-300 to-rose-500 backdrop-blur-2xl cursor-pointer rounded-full  transition-all duration-1000`}
            >
            <Mic size={24} className="text-white" />
          </button>
            </Link>
        </div>
        <div className="w-[70%] mb-4">
          <h2 className="text-2xl md:text-3xl font-semibold flex items-center gap-2">
            Ask Any Farming Query
          </h2>
          <p className=" mt-2 text-sm">
            Voice-powered assistant for instant answers
          </p>
        </div>
        <Btn title={"IVR Demo"}/>
      </div>
    </>
  );

  const bg = () => (
    <div className="absolute z-[-2] bg-zinc-200 right-0  h-full bottom-0 w-full">
      <video className="w-full h-full object-cover object-center" autoPlay muted loop src={video}></video>
    </div>
  );

  return (
    <div className="mb-4 md:mt-0 mt-3 relative min-h-[60vh] z-[0] flex flex-col justify-end  rounded-2xl overflow-hidden bg-white border border-gray-100 px-6 py-5">
      {assitant()}
      {bg()}
    </div>
  );
};


const ServicesGrid = () => {
  const services = [
    {
      title: "Weather",
      desc: "5-day forecast",
      position: "object-top",
      img: "https://play-lh.googleusercontent.com/pCQw51XRP4UPr-FCYDjvNnEpFa0HDGJjjLDldN3rmw4KkwhqPu0PZXE8EopmAxzH9mQ",
      color: "amber",
      icon: <CloudSun size={44} className="text-amber-600" />,
      link: "/weather"
    },
    {
      title: "Crop Prices",
      desc: "Live updates",
      position: "object-center",
      img: "https://akm-img-a-in.tosshub.com/indiatoday/styles/medium_crop_simple/public/2024-06/msp-02.jpg?VersionId=d_DJkHEg0zYEcwwaCGCiYgEvFPTHEpB3&size=750:*",
      color: "green",
      icon: <IndianRupee size={44} className="text-green-600" />,
      link: "/price"
    },
    {
      title: "Crop Diagnosis",
      desc: "AI-powered analysis",
      position: "object-top",
      img: "https://s7d1.scene7.com/is/image/CENODS/09747-buscon2-plantix?$responsive$&wid=700&qlt=90,0&resMode=sharp2",
      color: "blue",
      icon: <Camera size={44} className="text-blue-600" />,
      link: "/diagnosis"
    },
    {
      title: "Govt Schemes",
      desc: "Latest benefits",
      position: "object-top",
      img: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/201908/Add_a_subheading_1_.png?VersionId=MoNEvek00g1J_WpgxJkZkiQbvUs3SVU7",
      color: "purple",
      icon: <ScrollText size={44} className="text-purple-600" />,
      link: "/schemes"
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
          <Link key={index} to={service.link}>

            <div

              className="bg-white border border-emerald-600 p-4 rounded-xl shadow-sm hover:shadow-lg hover:border-emerald-300 transition-all duration-300 cursor-pointer"
            >
              <div
                className={`bg-${service.color}-100 w-full overflow-hidden h-36 rounded-lg flex items-center justify-center mb-3`}
              >

                <img className={`w-full h-full object-cover ${service.position}`} src={service.img} alt="" />
                {/* {service.icon} */}
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
  <div className="bg-gradient-to-r mb-4 from-emerald-50 via-green-50 to-white border border-emerald-600 rounded-xl p-5 flex flex-col sm:flex-row items-center gap-4">
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
    <Link to={"/market"}>
    <Btn title={"Get Started"}/>
    </Link>
  </div>
);

const Dashboard = () => {
  


  return (
    <div className="min-h-screen mt-14 bg-white">
      <Navbar />
      <main className="flex-1 px-3 pb-20 md:px-20 mx-auto w-full">
        <GreetingCard/>
        <FeaturedCard />
        <ServicesGrid />
      </main>
    </div>
  );
};

export default Dashboard;

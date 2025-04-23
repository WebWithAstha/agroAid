import { Camera, ChevronRight, CloudSun, IndianRupee, Link, ScrollText } from 'lucide-react';
import React from 'react'
import ServiceCard from './ServiceCard';
import 'img'

const Services = () => {
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
  
              <ServiceCard service={service}/>
            </Link>
  
          ))}
        </div>
      </div>
    );
  };

export default Services
import React from 'react'

const ServiceCard = ({service}) => {
  return (
    <div
  
                className="bg-gradient-to-br from-zinc-100  to-gray-200 border-0  border-emerald-600 p-4 rounded-xl shadow-sm hover:shadow-lg hover:border-emerald-300 transition-all duration-300 cursor-pointer"
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
  )
}

export default ServiceCard
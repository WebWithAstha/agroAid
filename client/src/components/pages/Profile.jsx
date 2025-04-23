import { useState } from "react";
import { useSelector } from "react-redux";
import { MapPin, Phone, Mail, Star, ChevronDown, ChevronUp } from "lucide-react";
import Header from "../partials/Header";

const FarmerProfile = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { user, loading } = useSelector((state) => state.authReducer);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  // Show loading state while user data is being fetched
  if (loading) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8 flex justify-center">
        <p className="text-gray-500">Loading farmer profile...</p>
      </div>
    );
  }

  // If no user data is available
  if (!user) {
    return (
      <div className="max-w-md mx-auto my-auto bg-white rounded-xl shadow-md p-8 flex justify-center">
        <p className="text-gray-500">Farmer profile not available</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto h-screen flex items-center justify-center bg-white rounded-xl shadow-md overflow-hidden">
        <div className="absolute top-0 left-0 w-full">

        <Header title={"Profile"}/>
        </div>
      <div className="">
        <div className="md:shrink-0">
          <div className="h-48 w-full md:w-48 bg-emerald-100 flex items-center justify-center">
            <img 
              src={user.avatarUrl || "data:image/png;base64,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"}
              alt={`${user.name} avatar`}
              className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-lg" 
            />
          </div>
        </div>
        
        <div className="p-5 w-full">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>
                <div className="ml-2 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < (user.rating || 4) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-emerald-600 font-medium">{user.occupation || "Organic Farmer"}</p>
            </div>
            
            {user.verified && (
              <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                Verified
              </span>
            )}
          </div>
          
          <div className="mt-3">
            <div className="flex items-center text-gray-600 text-sm mb-1">
              <MapPin size={16} className="mr-1 text-emerald-600" />
              <span>{user.location}</span>
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <Phone size={16} className="mr-1 text-emerald-600" />
              <span>{user.phone}</span>
            </div>
          </div>
          
          <div className="mt-4 flex space-x-2">
            {user.tags && user.tags.map((tag, index) => (
              <span key={index} className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="mt-3">
            <button 
              onClick={toggleExpand}
              className="flex items-center text-sm text-emerald-600 font-medium"
            >
              {isExpanded ? "Show less" : "Show more"}
              {isExpanded ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
            </button>
            
            {isExpanded && (
              <div className="mt-3 text-sm text-gray-600">
                <p className="mb-2">{user.bio}</p>
                <div className="flex items-start mt-2">
                  <Mail size={16} className="mr-1 text-emerald-600 mt-0.5" />
                  <span>{user.email}</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-4 pt-3 border-t border-gray-200">
            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Contact Farmer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerProfile;
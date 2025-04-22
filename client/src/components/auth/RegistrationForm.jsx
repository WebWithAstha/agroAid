import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateDetails } from '../../store/Actions/authAction';
import { useNavigate } from 'react-router-dom';

export default function RegistrationForm() {
    const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    mainCrops: [],
    type: 'farmer',
    city: '',
    state: ''
  });
  
  const [newCrop, setNewCrop] = useState('');
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Custom select dropdown states
  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  
  const stateDropdownRef = useRef(null);
  const cityDropdownRef = useRef(null);
  const typeDropdownRef = useRef(null);
  
  // Simulated states data
  useEffect(() => {
    setStates([
      'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 
      'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
      'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa'
    ]);
  }, []);
  
  // Simulated cities based on state selection
  useEffect(() => {
    if (formData.state) {
      setLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        const citiesByState = {
          'California': ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento'],
          'Florida': ['Miami', 'Orlando', 'Tampa', 'Jacksonville'],
          'Georgia': ['Atlanta', 'Savannah', 'Augusta', 'Columbus'],
          'New York': ['New York City', 'Buffalo', 'Rochester', 'Syracuse'],
          'Texas': ['Houston', 'Austin', 'Dallas', 'San Antonio'],
          // Default cities for any other state
          'default': ['Springfield', 'Franklin', 'Greenville', 'Bristol', 'Madison']
        };
        
        setCities(citiesByState[formData.state] || citiesByState['default']);
        setLoading(false);
      }, 300);
    } else {
      setCities([]);
    }
  }, [formData.state]);
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (stateDropdownRef.current && !stateDropdownRef.current.contains(event.target)) {
        setStateDropdownOpen(false);
      }
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target)) {
        setCityDropdownOpen(false);
      }
      if (typeDropdownRef.current && !typeDropdownRef.current.contains(event.target)) {
        setTypeDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleAddCrop = () => {
    if (newCrop.trim() && !formData.mainCrops.includes(newCrop.trim())) {
      setFormData({
        ...formData,
        mainCrops: [...formData.mainCrops, newCrop.trim()]
      });
      setNewCrop('');
    }
  };
  
  const handleRemoveCrop = (cropToRemove) => {
    setFormData({
      ...formData,
      mainCrops: formData.mainCrops.filter(crop => crop !== cropToRemove)
    });
  };
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateDetails( {
        ...formData,
        location: `${formData.city}, ${formData.state}`,
        isCompleted:true
      },navigate))
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-4">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-green-800">Register</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your name"
            />
          </div>
          
          {/* User Type Field - Custom Dropdown */}
          <div className="relative" ref={typeDropdownRef}>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              I am a
            </label>
            <div 
              className="flex items-center justify-between w-full px-3 py-2 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500"
              onClick={() => setTypeDropdownOpen(!typeDropdownOpen)}
            >
              <span>{formData.type === 'farmer' ? 'Farmer' : 'Buyer'}</span>
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${typeDropdownOpen ? 'transform rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
            
            {typeDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                <ul className="py-1">
                  <li 
                    className={`px-3 py-2 cursor-pointer hover:bg-green-50 ${formData.type === 'farmer' ? 'bg-green-100' : ''}`}
                    onClick={() => {
                      setFormData({...formData, type: 'farmer'});
                      setTypeDropdownOpen(false);
                    }}
                  >
                    Farmer
                  </li>
                  <li 
                    className={`px-3 py-2 cursor-pointer hover:bg-green-50 ${formData.type === 'buyer' ? 'bg-green-100' : ''}`}
                    onClick={() => {
                      setFormData({...formData, type: 'buyer'});
                      setTypeDropdownOpen(false);
                    }}
                  >
                    Buyer
                  </li>
                </ul>
              </div>
            )}
          </div>
          
          {/* State Field - Custom Dropdown */}
          <div className="relative" ref={stateDropdownRef}>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              State
            </label>
            <div 
              className="flex items-center justify-between w-full px-3 py-2 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500"
              onClick={() => setStateDropdownOpen(!stateDropdownOpen)}
            >
              <span>{formData.state || 'Select State'}</span>
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${stateDropdownOpen ? 'transform rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
            
            {stateDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg max-h-60">
                <ul className="py-1">
                  {states.map(state => (
                    <li 
                      key={state} 
                      className={`px-3 py-2 cursor-pointer hover:bg-green-50 ${formData.state === state ? 'bg-green-100' : ''}`}
                      onClick={() => {
                        setFormData({...formData, state, city: ''});
                        setStateDropdownOpen(false);
                      }}
                    >
                      {state}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          {/* City Field - Custom Dropdown */}
          <div className="relative" ref={cityDropdownRef}>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              City
            </label>
            <div 
              className={`flex items-center justify-between w-full px-3 py-2 border border-gray-300 rounded-md ${!formData.state || loading ? 'bg-gray-100 cursor-not-allowed' : 'cursor-pointer'} focus:outline-none focus:ring-2 focus:ring-green-500`}
              onClick={() => {
                if (formData.state && !loading) {
                  setCityDropdownOpen(!cityDropdownOpen);
                }
              }}
            >
              <span>
                {loading ? 'Loading cities...' : formData.city || 'Select City'}
              </span>
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${cityDropdownOpen ? 'transform rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
            
            {cityDropdownOpen && cities.length > 0 && (
              <div className="absolute z-10 w-full mt-1 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg max-h-60">
                <ul className="py-1">
                  {cities.map(city => (
                    <li 
                      key={city} 
                      className={`px-3 py-2 cursor-pointer hover:bg-green-50 ${formData.city === city ? 'bg-green-100' : ''}`}
                      onClick={() => {
                        setFormData({...formData, city});
                        setCityDropdownOpen(false);
                      }}
                    >
                      {city}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          {/* Main Crops Field - Only shown for farmers */}
          {formData.type === 'farmer' && (
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Main Crops
              </label>
              
              <div className="flex mb-2">
                <input
                  type="text"
                  value={newCrop}
                  onChange={(e) => setNewCrop(e.target.value)}
                  placeholder="Add a crop"
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddCrop();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddCrop}
                  className="px-4 py-2 text-white bg-green-600 rounded-r-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Add
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.mainCrops.map(crop => (
                  <div key={crop} className="flex items-center px-3 py-1 bg-green-100 rounded-full">
                    <span className="mr-1">{crop}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCrop(crop)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {formData.mainCrops.length === 0 && (
                  <p className="text-sm text-gray-500 italic">No crops added yet</p>
                )}
              </div>
            </div>
          )}
          
          <button
            type="submit"
            className="w-full py-3 mt-6 text-white transition-colors duration-200 bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
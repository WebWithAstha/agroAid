import { useState } from 'react';
import { Check, AlertCircle } from 'lucide-react';

export default function PMKisanForm() {
    const [formState, setFormState] = useState({
        name: 'Rajesh Kumar Singh',
        aadhaar: '123456789012',
        bank: '35672819045',
        ifsc: 'SBIN0005943',
        mobile: '9876543210',
        address: 'Village Sundarpur, Post Chandauli, District Varanasi, Uttar Pradesh - 221104'
      });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formState.name.trim()) newErrors.name = "Name is required";
    
    if (!formState.aadhaar.trim()) {
      newErrors.aadhaar = "Aadhaar number is required";
    } else if (!/^\d{12}$/.test(formState.aadhaar)) {
      newErrors.aadhaar = "Aadhaar must be 12 digits";
    }
    
    if (!formState.bank.trim()) newErrors.bank = "Bank account number is required";
    
    if (!formState.ifsc.trim()) {
      newErrors.ifsc = "IFSC code is required";
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formState.ifsc)) {
      newErrors.ifsc = "Invalid IFSC format";
    }
    
    if (!formState.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formState.mobile)) {
      newErrors.mobile = "Mobile must be 10 digits";
    }
    
    if (!formState.address.trim()) newErrors.address = "Address is required";
    
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const userDetails = {
      name: data.get("name"),
      aadhaar: data.get("aadhaar"),
      bank: data.get("bank"),
      ifsc: data.get("ifsc"),
      mobile: data.get("mobile"),
      address: data.get("address"),
    };
    
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulating submission process
    setTimeout(() => {
      const popup = window.open("https://pmkisan.gov.in", "_blank");
      if (popup) {
        setTimeout(() => {
          popup.postMessage(userDetails, "*");
          setIsSubmitting(false);
          setIsSuccess(true);
          
          // Reset success message after 5 seconds
          setTimeout(() => {
            setIsSuccess(false);
          }, 5000);
        }, 3000); // Wait for tab to load
      } else {
        alert("Please allow popups to complete registration");
        setIsSubmitting(false);
      }
    }, 1500);
  };

  const FormField = ({ label, name, type = "text", placeholder, value, pattern, maxLength }) => (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2" htmlFor={name}>
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        pattern={pattern}
        maxLength={maxLength}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
          errors[name] ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-green-100'
        }`}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1 flex items-center">
          <AlertCircle size={14} className="inline mr-1" />
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <div className="w-full mx-auto">
      <div className="bg-white  shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 py-6 px-8">
          <div className="flex items-center">
            <div className="bg-white p-2 rounded-full mr-4">
              <img 
                src="/api/placeholder/48/48" 
                alt="PM-KISAN Logo" 
                className="w-12 h-12"
              />
            </div>
            <div>
              <h1 className="text-white text-2xl font-bold">PM-KISAN Yojana</h1>
              <p className="text-green-100">Pradhan Mantri Kisan Samman Nidhi</p>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-8">
          <div className="mb-6 bg-green-50 p-4 rounded-lg border border-green-100">
            <h2 className="text-green-800 font-semibold mb-2">About PM-KISAN</h2>
            <p className="text-green-700 text-sm">
              PM-KISAN is a Central Sector scheme with 100% funding from the Government of India. Under this scheme, income support of ₹6,000 per year is provided to all farmer families in three equal installments of ₹2,000 each, every four months.
            </p>
          </div>

          {isSuccess && (
            <div className="mb-6 bg-green-50 p-4 rounded-lg border border-green-200 flex items-center">
              <Check size={20} className="text-green-600 mr-2" />
              <span className="text-green-800">Registration information sent successfully! Please complete the process in the newly opened tab.</span>
            </div>
          )}
          
          <h2 className="text-gray-800 text-xl font-bold mb-6">Registration Form</h2>
          
          <form onSubmit={handleSubmit}>
            <FormField 
              label="Full Name" 
              name="name" 
              placeholder="Enter your full name as per records" 
              value={formState.name}
            />
            
            <FormField 
              label="Aadhaar Number" 
              name="aadhaar" 
              placeholder="12-digit Aadhaar number" 
              value={formState.aadhaar}
              pattern="[0-9]{12}"
              maxLength="12"
            />
            
            <FormField 
              label="Bank Account Number" 
              name="bank" 
              placeholder="Enter your bank account number" 
              value={formState.bank}
            />
            
            <FormField 
              label="IFSC Code" 
              name="ifsc" 
              placeholder="Bank IFSC code (e.g., SBIN0005943)" 
              value={formState.ifsc}
              maxLength="11"
            />
            
            <FormField 
              label="Mobile Number" 
              name="mobile" 
              placeholder="10-digit mobile number" 
              value={formState.mobile}
              pattern="[0-9]{10}"
              maxLength="10"
            />
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="address">
                Complete Address <span className="text-red-500">*</span>
              </label>
              <textarea
                id="address"
                name="address"
                value={formState.address}
                onChange={handleChange}
                placeholder="Enter your complete address with PIN code"
                rows="3"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.address ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-green-100'
                }`}
              ></textarea>
              {errors.address && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle size={14} className="inline mr-1" />
                  {errors.address}
                </p>
              )}
            </div>
          
            <div className="mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Submit Registration'
                )}
              </button>
            </div>
            
            <p className="text-gray-500 text-xs text-center mt-4">
              By submitting this form, you agree to the terms and conditions of the PM-KISAN Yojana scheme.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
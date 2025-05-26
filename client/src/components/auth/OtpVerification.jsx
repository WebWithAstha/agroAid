import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtpAndAuthenticate } from "../../store/Actions/authAction";
import { Loader2 } from "lucide-react";


const OtpVerification = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const { phone } = useLocation().state;
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector(store => store.authReducer);


  const correctOtp = "123456";

  const handleChange = (value, index) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "") {
        if (index > 0) {
          inputsRef.current[index - 1]?.focus();
        }
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    dispatch(verifyOtpAndAuthenticate(phone, enteredOtp,navigate))
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-emerald-100 to-white px-2 sm:px-4 py-8">
      <div className="w-full max-w-xs sm:max-w-md bg-white rounded-2xl p-4 sm:p-8 relative">
        <button
          type="button"
          className="absolute left-3 top-3 text-emerald-700 hover:text-emerald-900 transition p-1 rounded-full"
          onClick={() => navigate(-1)}
          aria-label="Back"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-xl sm:text-2xl font-semibold text-center text-emerald-800 mb-4">
          OTP Verification
        </h2>
        <p className="text-center text-xs sm:text-sm text-gray-600 mb-6">
          Please enter the 6-digit code sent to your number
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-between space-x-1 sm:space-x-2 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputsRef.current[index] = el)}
                className="w-8 h-10 sm:w-12 sm:h-12 text-center border border-gray-300 rounded-lg text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full disabled:bg-gray-200 disabled:text-gray-400 bg-emerald-600 hover:bg-emerald-700 transition text-white py-2 rounded-lg sm:py-2.5 text-sm font-semibold shadow-md flex items-center justify-center"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Verify"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;

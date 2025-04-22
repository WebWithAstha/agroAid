import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { signinAndSignup } from "../../store/Actions/authAction";
import logo from '../../assets/logo.png'

const Register = () => {
  const navigate = useNavigate();
  const [phone, setphone] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signinAndSignup(phone))
    navigate('/otp', { state: { phone } })
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-emerald-100 to-white px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-emerald-800 tracking-wide">
            AgroAid
          </h1>
          <img
            className="h-20 w-20 mx-auto my-0 object-contain"
            src={logo}
            alt="AgroAid logo"
          />
          <p className="text-gray-600 text-sm italic">The farmer's voice</p>
        </div>

        {/* Welcome */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Welcome to AgroAid
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Register below to get started
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Phone Field */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone No.
            </label>
            <PhoneInput
              value={phone}
              onChange={(value) => setphone(value)} // <- set your phone state here
              inputStyle={{
                width: "91%",
                padding: "20px",
                marginLeft: "35px",
                flex: "grow",
                borderRadius: "0.5rem",
                border: "1px solid #d1d5db",
              }}
              country={"in"}
              enableSearch
            />

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 transition-all duration-200 text-white py-2.5 rounded-lg text-sm font-semibold shadow-md"
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

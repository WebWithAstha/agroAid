import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from '../components/auth/Register';
import LanguageSelect from '../components/partials/LanguageSelect';
import OtpVerification from '../components/auth/OtpVerification';
import Dashboard from '../components/dashboard/Dashboard';
import CropPrices from '../components/pages/CropPrices';
import Weather from '../components/pages/Weather.jsx';
import Market from '../components/pages/market/farmer/Market.jsx';
import GovernmentSchemes from '../components/pages/GovernmentSchems.jsx';
import DirectMarket from '../components/pages/market/customer/DirectMarket.jsx';
import Diagnosis from '../components/pages/Diagnosis.jsx';
import RegistrationForm from '../components/auth/RegistrationForm.jsx';
import Assistant from '../components/pages/Assistant.jsx';
import IvrSystem from '../components/pages/IvrSystem.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import NotFound from '../components/pages/NotFound.jsx';

const AppRoutes = () => {


  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/lang" element={<LanguageSelect />} />
      <Route path="/otp" element={<OtpVerification />} />

      {/* Protected Routes */}
      <Route path="/register" element={<ProtectedRoute><RegistrationForm /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/price" element={<ProtectedRoute><CropPrices /></ProtectedRoute>} />
      <Route path="/weather" element={<ProtectedRoute><Weather /></ProtectedRoute>} />
      <Route path="/diagnosis" element={<ProtectedRoute><Diagnosis /></ProtectedRoute>} />
      <Route path="/schemes" element={<ProtectedRoute><GovernmentSchemes /></ProtectedRoute>} />
      <Route path="/market" element={<ProtectedRoute><Market /></ProtectedRoute>} />
      <Route path="/directmarket" element={<ProtectedRoute><DirectMarket /></ProtectedRoute>} />
      <Route path="/assistant" element={<ProtectedRoute><Assistant /></ProtectedRoute>} />
      <Route path="/ivr" element={<ProtectedRoute><IvrSystem /></ProtectedRoute>} />

      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;

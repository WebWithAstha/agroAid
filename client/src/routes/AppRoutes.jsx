import React from 'react'
import {Routes,Route} from 'react-router-dom';
import Register from '../components/auth/Register';
import LanguageSelect from '../components/partials/LanguageSelect';
import OtpVerification from '../components/auth/OtpVerification';
import Dashboard from '../components/dashboard/Dashboard';
import CropPrices from '../components/pages/CropPrices';

const AppRoutes = () => {
  return (
    <Routes>
        <Route element={<Register/>} path='/register' />
        <Route element={<LanguageSelect/>} path='/' />
        <Route element={<OtpVerification/>} path='/otp' />
        <Route element={<Dashboard/>} path='/dashboard' />
        <Route element={<CropPrices/>} path='/price'/>
    </Routes>
  )
}

export default AppRoutes
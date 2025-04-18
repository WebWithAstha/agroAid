import React from 'react'
import {Routes,Route} from 'react-router-dom';
import Register from '../components/auth/Register';
import LanguageSelect from '../components/partials/LanguageSelect';
import OtpVerification from '../components/auth/OtpVerification';
import Dashboard from '../components/dashboard/Dashboard';
import CropPrices from '../components/pages/CropPrices';
import Weather from '../components/pages/Weather.jsx';
import Market from '../components/pages/market/farmer/Market.jsx';
// import Diagnosis from '../components/pages/diagnosis/Diagnosis.jsx';
import GovernmentSchemes from '../components/pages/GovernmentSchems.jsx';
import DirectMarket from '../components/pages/market/customer/DirectMarket.jsx';
import Diagnosis from '../components/pages/Diagnosis.jsx';
import Assistant from '../components/pages/Assistant.jsx';

const AppRoutes = () => {
  return (
    <Routes>
        <Route element={<Register/>} path='/register' />
        <Route element={<LanguageSelect/>} path='/' />
        <Route element={<OtpVerification/>} path='/otp' />
        <Route element={<Dashboard/>} path='/dashboard' />
        <Route element={<CropPrices/>} path='/price'/>
        <Route element={<Weather/>} path='/weather'/>
        <Route element={<Diagnosis/>} path='/diagnosis'/>
        <Route element={<GovernmentSchemes/>} path='/schemes'/>
        <Route element={<Market/>} path='/market'/>
        <Route element={<DirectMarket/>} path='/directmarket'/>
        <Route element={<Assistant/>} path='/assistant'/>

    </Routes>
  )
}

export default AppRoutes
import React from 'react'
import {Routes,Route} from 'react-router-dom';
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
import DashboardLoading from '../components/loading/DashboardLoading.jsx';

const AppRoutes = () => {
  return (
    <Routes>
        <Route element={<Register/>} path='/' />
        <Route element={<RegistrationForm/>} path='/register' />
        <Route element={<LanguageSelect/>} path='/lang' />
        <Route element={<OtpVerification/>} path='/otp' />
        <Route element={<DashboardLoading/>} path='/dload' />
        <Route element={<Dashboard/>} path='/dashboard' />
        <Route element={<CropPrices/>} path='/price'/>
        <Route element={<Weather/>} path='/weather'/>
        <Route element={<Diagnosis/>} path='/diagnosis'/>
        <Route element={<GovernmentSchemes/>} path='/schemes'/>
        <Route element={<Market/>} path='/market'/>
        <Route element={<DirectMarket/>} path='/directmarket'/>
        <Route element={<Assistant/>} path='/assistant'/>
        <Route element={<IvrSystem/>} path='/ivr'/>

    </Routes>
  )
}

export default AppRoutes
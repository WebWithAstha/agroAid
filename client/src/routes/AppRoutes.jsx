import React from 'react'
import {Routes,Route} from 'react-router-dom';
import Register from '../components/auth/Register';

const AppRoutes = () => {
  return (
    <Routes>
        <Route element={<Register/>} path='/' />
    </Routes>
  )
}

export default AppRoutes
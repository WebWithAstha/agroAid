import React from 'react'
import { NavLink } from 'react-router-dom'

const Logo = () => {
  return (
    <NavLink to={'/dashboard'}>
               <div className="flex items-center rounded-br-xl">
                 <div className="mr-2 bg-emerald-500 text-white rounded-lg">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M12 6.5C13.5 8 15.5 8 17 7.5C17 11.5 16 14 12 16C8 14 7 11.5 7 7.5C8.5 8 10.5 8 12 6.5Z" fill="white"/>
                     <path d="M12 16C8 14 7 11.5 7 7.5C8.5 8 10.5 8 12 6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                     <path d="M12 16V21" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                     <path d="M12 6.5C10.5 8 8.5 8 7 7.5C7 5.2 8.8 3 12 3C15.2 3 17 5.2 17 7.5C15.5 8 13.5 8 12 6.5Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                   </svg>
                 </div>
                 <h1 className="text-xl font-bold text-emerald-800">AgroAid</h1>
               </div>
               </NavLink>
  )
}

export default Logo
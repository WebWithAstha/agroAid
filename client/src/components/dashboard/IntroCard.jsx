import React from 'react'
import video from "../../assets/hero.mp4"
import { Link } from 'react-router-dom'
import { Mic } from 'lucide-react'
import Btn from '../partials/Btn'


const IntroCard = () => {
  return (
    <div className="mb-4 md:mt-0 relative min-h-[40vh] h-[60vh] md:min-h-[60vh] z-[0] flex flex-col justify-end rounded-2xl overflow-hidden bg-white border border-gray-100 px-2 sm:px-4 md:px-6 py-3 md:py-5">
      <div className="p-2 sm:p-4 border md:pt-4 pt-10 border-white/[.1] backdrop-blur-xl bg-white/[.2] relative w-full md:w-max text-white rounded-2xl mt-4 md:mt-6">
        <div className="w-max md:absolute top-0 right-1/2 translate-x-1/2  md:-translate-x-4 md:right-0 md:top-1/2 md:-translate-y-1/2">
        <Link to={'/assistant'} title='Assistant' >

          <button
            className={`flex items-center   justify-center w-14 h-14 md:w-20 md:h-20 bg-gradient-to-br from-yellow-300 to-rose-500 backdrop-blur-2xl cursor-pointer rounded-full transition-all duration-1000`}
            >
<div className="bg-gradient-to-br from-rose-600 to-lime-600 z-[-1] rounded-full w-full h-full  animate-pulse absolute">
              </div>
            <img className="text-white md:p-6 p-3 invert" src="https://cdn-icons-png.flaticon.com/128/16311/16311095.png" />
          </button>
            </Link>
        </div>
        <div className="w-full md:w-[70%] mb-4 mt-4 md:mt-0">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold flex items-center gap-2">
            Ask Any Farming Query
          </h2>
          <p className="mt-2 text-xs sm:text-sm">
            Voice-powered assistant for instant answers
          </p>
        </div>
        <Link to='/ivr' className='w-full'>
        <Btn title={"IVR Demo"}/>
        </Link>
      </div>
      <BG url={video}/>
    </div>
  )
}

export default IntroCard


const BG = ({url})=>(
    <div className="absolute z-[-2] bg-zinc-200 right-0  h-full bottom-0 w-full">
      <video className="w-full h-full object-cover object-center" autoPlay muted loop src={url}></video>
    </div>
)

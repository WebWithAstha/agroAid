import React from 'react'
import video from "../../assets/hero.mp4"
import { Link } from 'react-router-dom'
import { Mic } from 'lucide-react'
import Btn from '../partials/Btn'


const IntroCard = () => {
  return (
    <div className="mb-4 md:mt-0 relative min-h-[60vh] z-[0] flex flex-col justify-end  rounded-2xl overflow-hidden bg-white border border-gray-100 px-6 py-5">
      <div className="p-4 border md:pt-4 pt-10 border-white/[.1] backdrop-blur-xl bg-white/[.2] relative w-max text-white rounded-2xl mt-6">
        <div className="w-max absolute md:top-1/2 top-0 md:-translate-y-1/2 -translate-y-1/2  md:translate-x-1/2  md:right-0">
        <Link to={'/assistant'} >
          <button
            className={`flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-300 to-rose-500 backdrop-blur-2xl cursor-pointer rounded-full  transition-all duration-1000`}
            >
            <Mic size={24} className="text-white" />
          </button>
            </Link>
        </div>
        <div className="md:w-[70%]  mb-4">
          <h2 className="text-2xl md:text-3xl font-semibold flex items-center gap-2">
            Ask Any Farming Query
          </h2>
          <p className=" mt-2 text-sm">
            Voice-powered assistant for instant answers
          </p>
        </div>
        <Link to='/ivr' className=' w-full'>
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

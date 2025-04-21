import React from 'react'
import HeaderLoading from './HeaderLoading'

const WeatherLoading = () => {
  return (
    <div>
        <HeaderLoading/>
        <div className="md:px-24 px-10 py-6 animate-pulse">

        <div className="md:grid-cols-3 border-b border-zinc-300 pb-8  sm:grid-cols-2 grid-cols-1 grid gap-4">
            <div className="w-full h-68 rounded-xl bg-zinc-300"></div>
            <div className="w-full h-68 rounded-xl bg-zinc-300"></div>
            <div className="w-full h-68 rounded-xl bg-zinc-300"></div>
        </div>
            <div className="w-60 h-4 rounded-xl my-4 bg-zinc-300"></div>
        <div className="md:grid-cols-5 border-zinc-300  sm:grid-cols-2 grid-cols-1 grid gap-4">
            <div className="w-full h-32 rounded-xl bg-zinc-300"></div>
            <div className="w-full h-32 rounded-xl bg-zinc-300"></div>
            <div className="w-full h-32 rounded-xl bg-zinc-300"></div>
            <div className="w-full h-32 rounded-xl bg-zinc-300"></div>
            <div className="w-full h-32 rounded-xl bg-zinc-300"></div>
        </div>

        </div>
    </div>
  )
}

export default WeatherLoading
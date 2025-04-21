import React from 'react'
import HeaderLoading from './HeaderLoading.jsx'

const CropPrices = () => {
  return (
    <div className='h-screen overflow-hidden'>
        <HeaderLoading/>
        <div className="md:px-20 animate-pulse flex gap-4 w-full px-10 py-4">
          <div className="max-w-md w-full  flex flex-col gap-4">
            {[1,2,3,4,5,6].map(e=>(
              <div className="w-full h-14 bg-zinc-300"></div>
            ))}
          </div>
          <div className="flex-1 flex flex-col gap-4 h-full">
            <div className="h-96 w-full bg-zinc-300"></div>
            <div className="h-40 w-full bg-zinc-300"></div>
          </div>
        </div>
    </div>
  )
}

export default CropPrices
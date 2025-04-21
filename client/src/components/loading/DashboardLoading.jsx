import React from 'react'

const DashboardLoading = () => {
  return (
    <div className=" px-3 pb-20 md:px-20 flex overflow-hidden animate-pulse flex-col gap-4 pt-16 mx-auto w-full h-screen">
        <div className="w-full shrink-0 h-[27rem] bg-zinc-300 rounded-xl"></div>
        <div className="w-full shrink-0 h-[13vh] bg-zinc-300 rounded-xl"></div>
        <div className="w-full shrink-0 flex justify-between">
            <div className="w-28 h-5 bg-zinc-300 rounded-xl"></div>
            <div className="w-28 h-5 bg-zinc-300 rounded-xl"></div>
        </div>
        <div className="w-full shrink-0 grid gap-4 grid-cols-4 flex-1 h-32 min-h-20 justify-between">
            <div className="h-full w-full bg-zinc-300 rounded-xl"></div>
            <div className="h-full w-full bg-zinc-300 rounded-xl"></div>
            <div className="h-full w-full bg-zinc-300 rounded-xl"></div>
            <div className="h-full w-full bg-zinc-300 rounded-xl"></div>
        </div>
    </div>
  )
}

export default DashboardLoading
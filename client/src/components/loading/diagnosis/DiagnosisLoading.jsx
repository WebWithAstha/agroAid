import React from "react";

const DiagnosisLoading = () => {
  return (
    <div className="w-full flex-1 animate-pulse">
      <div className="flex border-b items-center w-full justify-between gap-4 border-zinc-300 p-6">
        <div className="">
          <div className="w-60 h-6 mb-2 rounded-xl bg-zinc-300"></div>
          <div className="w-40 h-4 rounded-xl bg-zinc-300"></div>
        </div>
        <div className="flex flex-col justify-end items-end">
          <div className="w-32 h-7 mb-2 bg-zinc-300 rounded-xl"></div>
          <div className="w-20 h-3 mb-2 bg-zinc-300 rounded-xl"></div>
        </div>
      </div>
      <div className="flex border-b gap-2 border-zinc-300">
          <div className="w-20 border-b-3 h-3 p-2 pt-4 border-zinc-300 pb-6">
            <div className="w-16 h-2 bg-zinc-300"></div>
          </div>
          {[1,2,3].map(e=>(
          <div key={e} className="w-20 h-3 p-2 pt-4 pb-6">
            <div className="w-16 h-2 bg-zinc-300"></div>
          </div>

          ))}

      </div>
      <div className="grid md:grid-cols-2 p-6 gap-4">
        <div className="h-60 bg-zinc-300">
        </div>

        <div className="h-60">
        <div className="h-4 w-60 mb-2 bg-zinc-300">
        </div>
        <div className="h-4 bg-zinc-300">
            

        </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisLoading;

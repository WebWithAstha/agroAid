import React from "react";
import HeaderLoading from "../HeaderLoading";
import DiagnosisLoading from "./DiagnosisLoading";

const ListLoading = () => {
  return (
    <>
      <HeaderLoading />
      <div className="flex">
        <div className="max-w-[23rem] flex-1 h-full border-zinc-300 animate-pulse py-4 border-r">
          <div className="px-4 mb-6">
            <div className="w-48 h-4 bg-zinc-300 rounded-xl"></div>
          </div>
          {[1, 2, 3, 4].map((e) => (
            <div
              key={e}
              className="flex items-center gap-4 border-l-4 border-zinc-300 p-4"
            >
              <div className="w-18 h-18 rounded-xl bg-zinc-300"></div>
              <div className="">
                <div className="w-32 h-4 mb-2 bg-zinc-300 rounded-xl"></div>
                <div className="w-20 h-3 mb-2 bg-zinc-300 rounded-xl"></div>
                <div className="w-16 h-4 mb-2 bg-zinc-300 rounded-xl"></div>
              </div>
            </div>
          ))}
        </div>
        <DiagnosisLoading/>
      </div>
    </>
  );
};

export default ListLoading;

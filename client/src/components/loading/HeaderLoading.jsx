import React from "react";

const HeaderLoading = () => {
  return (
    <div className="px-8 py-6 items-center animate-pulse flex gap-6 border-b border-black/[.1]">
      <div className="w-10 h-10 rounded-full bg-zinc-300"></div>
      <div className="">
        <div className="md:w-48 w-20 h-5 mb-2 bg-zinc-300 rounded-xl"></div>
        <div className="md:w-96 w-48 h-5 bg-zinc-300 rounded-xl"></div>
      </div>
    </div>
  );
};

export default HeaderLoading;

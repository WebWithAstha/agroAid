import React from 'react'

const Btn = ({title}) => {
  return (
    <button className="mt-3 md:w-max w-full sm:mt-0 bg-gradient-to-br from-lime-600 bg-emerald-800 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg transition whitespace-nowrap">
    {title}
  </button>
  )
}

export default Btn
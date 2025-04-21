import { Link } from 'react-router-dom'
import React from 'react'
import { Store } from 'lucide-react'
import Btn from '../partials/Btn'

const OpenMarket = () => {
  return (
    <div className="bg-gradient-to-br from-zinc-200  to-gray-100 mb-4 border-0 border-emerald-600 rounded-xl p-5 flex flex-col sm:flex-row items-center gap-4">
    <div className="bg-white rounded-lg p-3 w-16 h-16 flex items-center justify-center">
      <Store size={32} className="text-emerald-600" />
    </div>
    <div className="flex-1 text-center sm:text-left">
      <h3 className="font-medium text-gray-800 text-lg">
        Direct Market Connect
      </h3>
      <p className="text-sm text-gray-600 mt-1">
        Sell your crops directly to buyers without middlemen
      </p>
    </div>
    <Link to={"/market"}>
    <Btn title={"Get Started"}/>
    </Link>
  </div>
  )
}

export default OpenMarket
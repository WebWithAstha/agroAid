import React from 'react'

const Loading = () => {
  return (
    <div className='w-full h-screen flex flex-col gap-2 items-center justify-center'>
        <img className='invert h-20' src="https://i.gifer.com/1fpC.gif" alt="" />
        <h4 className='-mr-2'>Loading...</h4>
    </div>
  )
}

export default Loading
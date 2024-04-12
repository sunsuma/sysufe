import React from 'react'

export default function Navbar() {
  return (
    <div className='w-full mt-14 ml-0 border-t-2 border-b-2 border-[#3C3C3C] justify-center items-center flex'>
      <div className='flex flex-col justify-center items-center border-l-2 border-r-2 border-black p-3'>
        {/* <h1 className='story-header'>SYSU</h1> */}
        <h1 className='font-semibold text-2xl sm:text-3xl'>SYSU</h1>
        <h4>Journal in Public</h4>
      </div>
    </div>
  )
}

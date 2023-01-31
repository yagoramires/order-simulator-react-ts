import React from 'react'

const Header = () => {
  return (
    <header className='flex justify-between items-center p-4 bg-gradient-to-r from-white to-gray-200 shadow-lg'>
      <h1 className='font-bold text-4xl leading-[1.5rem] md:text-2xl md:leading-[1.25rem]'>
        D<span className='text-blue-600'>2</span>B
      </h1>

      <nav>
        <ul className='flex justify-between items-center gap-2'>
          <li>ILUMI</li>
          <li>ITEC</li>
          <li>AVANT</li>
          <li>ADERE</li>
          <div className='w-[42px] h-[42px] bg-black rounded-full ml-4'></div>
        </ul>
      </nav>
    </header>
  )
}

export default Header

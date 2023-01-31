import React from 'react'
import { Link } from 'react-router-dom'

interface selectIndustry {
  industry: string
  setIndustry: React.Dispatch<React.SetStateAction<string>>
  industries: Array<{
    id: number
    name: string
    cnpj?: string
    products?: Array<{
      id: number
      name: string
      code: string
      value: number
    }>
  }>
}

const Header = ({ industries, industry, setIndustry }: selectIndustry) => {
  return (
    <header className='flex items-center justify-between p-4 shadow-lg bg-gradient-to-r from-white to-gray-200'>
      <h1 className='font-bold text-4xl leading-[1.5rem] md:text-2xl md:leading-[1.25rem]'>
        D<span className='text-blue-600'>2</span>B
      </h1>

      <nav>
        <ul className='flex items-center justify-between gap-2 font-bold text-blue-600 '>
          {industries?.map((item) => (
            <li
              onClick={() => setIndustry(item.name)}
              className={`${
                industry === item.name ? 'border-b-4 border-blue-600' : 'border-b-4'
              } cursor-pointer`}
              key={item.id}
            >
              {item.name}
            </li>
          ))}

          <Link to='/dashboard' className='w-[42px] h-[42px] bg-black rounded-full ml-4'></Link>
        </ul>
      </nav>
    </header>
  )
}

export default Header

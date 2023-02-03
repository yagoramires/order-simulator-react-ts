// React
import React, { useContext, useEffect, useState } from 'react'

// Routes
import { Link } from 'react-router-dom'

// Context
import { AuthContext } from '../../context/AuthContext'
import { useFetchCollection } from '../../hooks/useFetchCollection'

interface HeaderProps {
  industry: string
  setIndustry: React.Dispatch<React.SetStateAction<string>>
}
interface IndustryProps {
  id?: number
  socialName?: string
  fantasyName?: string
  cnpj?: string
  products?: Array<{
    id: number
    code: string
    name: string
    industry: string
    price: number
  }>
}

const Header = ({ industry, setIndustry }: HeaderProps) => {
  const { userData } = useContext(AuthContext)
  const { documents } = useFetchCollection('industries')

  const [industries, setIndustries] = useState()

  // useEffect(() => {
  //   if (documents) {
  //     setIndustries(documents)
  //   }
  // }, [documents])

  console.log(documents)

  return (
    <header className='flex items-center justify-between p-4 shadow-lg bg-gradient-to-r from-white to-gray-200'>
      <h1 className='font-bold text-4xl leading-[1.5rem] md:text-2xl md:leading-[1.25rem]'>
        D<span className='text-blue-600'>2</span>B
      </h1>

      <nav>
        <ul className='flex items-center justify-between gap-2 text-xl font-bold text-blue-600 md:text-base'>
          {documents?.map((item) => (
            <li
              // onClick={() => setIndustry(item.fantasyName)}
              className={`${
                industry === item.name ? 'border-b-4 border-blue-600' : 'border-b-4'
              } cursor-pointer hover:border-blue-600`}
              key={item.id}
            >
              {/* {item.name} */}
            </li>
          ))}

          <Link to='/orders'>
            {userData?.photoURL ? (
              <img
                src={userData.photoURL}
                alt=''
                className='w-16 h-16 ml-4 bg-black border-2 border-blue-600 rounded-full md:w-12 md:h-12'
              />
            ) : (
              <div className='w-16 h-16 ml-4 bg-black rounded-full md:w-12 md:h-12'></div>
            )}
          </Link>
        </ul>
      </nav>
    </header>
  )
}

export default Header

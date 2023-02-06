import React, { useContext, useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import { AuthContext } from '../../context/AuthContext'
import { useFetchCollection } from '../../hooks/fetchData/useFetchCollection'

import { IIndustries } from '../../interfaces'

interface HeaderProps {
  industry: string
  setIndustry: React.Dispatch<React.SetStateAction<string>>
}

const Header = ({ industry, setIndustry }: HeaderProps) => {
  const { userData } = useContext(AuthContext)
  const { industries: documents } = useFetchCollection('industries')

  const [industries, setIndustries] = useState<IIndustries[]>()

  useEffect(() => {
    if (documents) {
      setIndustries(documents)
    }
  }, [documents])

  return (
    <header className='flex items-center justify-center p-4 shadow-lg bg-gradient-to-r from-white to-gray-200'>
      <div className='max-w-[1200px] w-[90%] flex items-center justify-between'>
        <h1 className='font-bold text-5xl leading-[1.5rem] md:text-3xl md:leading-[1.25rem] md:hidden'>
          D<span className='text-blue-600'>2</span>B
        </h1>

        <nav className='md:w-full'>
          <ul className='flex items-center justify-between gap-2 text-xl font-medium text-blue-600 md:text-sm'>
            {industries?.map((item) => (
              <li
                onClick={() => setIndustry(item.id || '')}
                className={`${
                  industry === item.id ? 'border-b-4 border-blue-600 font-bold' : 'border-b-4'
                } cursor-pointer hover:border-blue-600 hover:font-bold`}
                key={item.id}
              >
                {item.fantasyName}
              </li>
            ))}

            <Link to='/orders'>
              {userData?.photoURL ? (
                <img
                  src={userData.photoURL}
                  alt=''
                  className='w-16 h-16 ml-4 bg-black border-2 border-blue-600 rounded-full md:w-10 md:h-10'
                />
              ) : (
                <div className='w-16 h-16 ml-4 bg-black rounded-full md:w-10 md:h-10'></div>
              )}
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header

import { useContext } from 'react'

import { Link } from 'react-router-dom'

import { AuthContext } from '../../context/AuthContext'

const Header = () => {
  const { userData } = useContext(AuthContext)

  return (
    <header>
      <div className='max-w-[1200px] flex items-center justify-between p-2 bg-white lg:px-8'>
        <h1 className='w-full text-2xl font-bold lg:text-4xl'>
          D<span className='text-blue-600'>2</span>B
        </h1>

        <nav>
          <Link to='/orders'>
            {userData?.photoURL ? (
              <img
                src={userData.photoURL}
                alt={userData.displayName}
                className='w-10 h-10 bg-black rounded-full lg:w-14 lg:h-14'
              />
            ) : (
              <div className='w-10 h-10 bg-black rounded-full lg:w-14 lg:h-14'></div>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header

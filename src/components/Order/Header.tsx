import { useContext } from 'react'

import { Link } from 'react-router-dom'

import { AuthContext } from '../../context/AuthContext'

const Header = () => {
  const { userData } = useContext(AuthContext)

  return (
    <header className='flex items-center justify-center w-full bg-dark-100 text-gray-50'>
      <div className='max-w-[1400px] w-full flex justify-between items-center p-2 md:p-4'>
        <h1 className='text-xl font-bold'>
          D<span className='text-blue-600'>2</span>B
        </h1>

        <nav>
          <Link to='/orders'>
            {userData?.photoURL ? (
              <img
                src={userData.photoURL}
                alt={userData.displayName}
                className='object-cover w-10 h-10 rounded-full'
              />
            ) : (
              <div className='object-cover w-10 h-10 rounded-full'>
                <p>avatar</p>
              </div>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header

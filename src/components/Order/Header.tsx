import { useContext } from 'react'

import { Link } from 'react-router-dom'

import { AuthContext } from '../../context/AuthContext'

import './Header.css'

const Header = () => {
  const { userData } = useContext(AuthContext)

  return (
    <header>
      <div className='headerContainer'>
        <h1 className='headerContainer__logo'>
          D<span>2</span>B
        </h1>

        <nav>
          <Link to='/orders'>
            {userData?.photoURL ? (
              <img
                src={userData.photoURL}
                alt={userData.displayName}
                className='headerContainer__avatar'
              />
            ) : (
              <div className='headerContainer__avatar'></div>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header

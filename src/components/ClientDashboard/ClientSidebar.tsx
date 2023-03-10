import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useAuth } from '../../hooks/auth/useAuth'

import { Link } from 'react-router-dom'

import { MdLogout } from 'react-icons/md'
import { RxAvatar } from 'react-icons/rx'
import { FaEdit } from 'react-icons/fa'
import NewOrder from './NewOrder'

const ClientSidebar = () => {
  const { userData } = useContext(AuthContext)
  const { signOutUser } = useAuth()

  const options = [
    {
      icon: <FaEdit size={22} />,
      text: 'Editar Perfil',
      path: 'profile',
    },
  ]

  const liMap = () => {
    return options.map((option) => (
      <li className='w-full text-gray-50' key={option.path}>
        <Link
          to={`/${option.path}`}
          className='flex items-center justify-center w-full p-2 transition-all rounded-lg lg:px-4 lg:py-3 lg:shadow-sm lg:gap-2 lg:bg-gray-800 lg:justify-start lg:hover:bg-gray-700'
        >
          {option.icon}
          <span className='hidden lg:block'>{option.text}</span>
        </Link>
      </li>
    ))
  }

  return (
    <aside className='fixed bottom-0 left-0 z-10 w-full py-2 bg-dark-100 lg:bg-gray-900 lg:static lg:w-[400px] lg:p-4 lg:min-h-[100vh] shadow-sm'>
      <div className='flex-col items-center justify-center hidden gap-4 my-4 lg:flex'>
        {userData?.photoURL ? (
          <img src={userData.photoURL} alt={userData.displayName} className='w-40 rounded-full' />
        ) : (
          <div className='profileContainer__noImg'>
            <RxAvatar size={80} className='text-gray-50' />
          </div>
        )}
        <h1 className='text-2xl font-bold text-gray-50'>{userData.displayName}</h1>
      </div>

      <nav className=''>
        <ul className='flex items-center justify-center w-full lg:flex-col lg:gap-2'>
          <li className='w-full text-gray-50'>
            <NewOrder />
          </li>

          {liMap()}

          <li className='w-full text-gray-50 '>
            <button
              onClick={signOutUser}
              className='flex items-center justify-center w-full p-2 transition-all rounded-lg lg:px-4 lg:py-3 lg:shadow-sm lg:gap-2 lg:bg-gray-800 lg:justify-start lg:hover:bg-gray-700'
            >
              <MdLogout size={22} />
              <span className='hidden lg:block'>Sair</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default ClientSidebar

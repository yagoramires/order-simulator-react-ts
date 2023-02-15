import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useAuth } from '../../hooks/auth/useAuth'

import { Link } from 'react-router-dom'

import { BsCartCheckFill } from 'react-icons/bs'
import { MdLogout } from 'react-icons/md'
import { FaPlus, FaIndustry, FaUserAlt, FaRegCalendarAlt, FaEdit } from 'react-icons/fa'

const Sidebar = () => {
  const { userData } = useContext(AuthContext)
  const { signOutUser } = useAuth()

  const options = [
    {
      icon: <FaPlus size={22} />,
      text: 'Novo Pedido',
      path: 'order',
    },
    {
      icon: <BsCartCheckFill size={22} />,
      text: 'Pedidos',
      path: 'orders',
    },
    {
      icon: <FaIndustry size={22} />,
      text: 'Indústrias',
      path: 'industries',
    },
    {
      icon: <FaUserAlt size={22} />,
      text: 'Clientes',
      path: 'clients',
    },
    {
      icon: <FaRegCalendarAlt size={22} />,
      text: 'Prazos de Pagamento',
      path: 'deadlines',
    },
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
          className='flex items-center justify-center w-full p-4 transition-all rounded-lg shadow-sm lg:gap-2 lg:bg-gray-800 lg:justify-start hover:bg-gray-700'
        >
          {option.icon}
          <span className='hidden lg:block'>{option.text}</span>
        </Link>
      </li>
    ))
  }

  return (
    <aside className='fixed bottom-0 left-0 z-10 w-full p-2 bg-dark-100 lg:bg-gray-900 lg:static lg:w-[350px] lg:p-4 lg:min-h-[100vh]'>
      <div className='flex-col items-center justify-center hidden gap-4 my-4 lg:flex'>
        {userData?.photoURL ? (
          <img src={userData.photoURL} alt={userData.displayName} className='w-40 rounded-full' />
        ) : (
          <div className='profileContainer__noImg'>
            <FaUserAlt size={100} className='text-blue-600' />
          </div>
        )}
        <h1 className='text-2xl font-bold text-gray-50'>{userData.displayName}</h1>
      </div>

      <nav className=''>
        <ul className='flex items-center justify-center w-full lg:flex-col lg:gap-2'>
          {liMap()}

          <li className='w-full text-gray-50 '>
            <button
              onClick={signOutUser}
              className='flex items-center justify-center w-full p-4 transition-all rounded-lg shadow-sm lg:gap-2 lg:bg-gray-800 lg:justify-start hover:bg-gray-700'
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

export default Sidebar

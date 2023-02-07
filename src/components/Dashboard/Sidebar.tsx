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
      icon: <FaPlus />,
      text: 'Novo Pedido',
      path: 'order',
    },
    {
      icon: <BsCartCheckFill />,
      text: 'Pedidos',
      path: 'orders',
    },
    {
      icon: <FaIndustry />,
      text: 'Indústrias',
      path: 'industries',
    },
    {
      icon: <FaUserAlt />,
      text: 'Clientes',
      path: 'clients',
    },
    {
      icon: <FaRegCalendarAlt />,
      text: 'Prazos de Pagamento',
      path: 'deadlines',
    },
    {
      icon: <FaEdit />,
      text: 'Editar Perfil',
      path: 'profile',
    },
  ]

  const liMap = () => {
    return options.map((option) => (
      <li className='md:w-[14.28%]' key={option.path}>
        <Link
          to={`/${option.path}`}
          className='flex items-center gap-4 border-[1px] border-blue-500 p-3 md:p-6 text-base text-white transition-all duration-200 bg-blue-600 rounded-md shadow-md cursor-pointer md:bg-white md:text-blue-600 hover:bg-blue-500 md:hover:bg-white md:shadow-none md:rounded-none md:border-r-zinc-100 md:border-y-0 md:border-r-[1px] md:border-l-0 md:justify-center w-full'
        >
          <div className='text-xl'>{option.icon}</div>
          <span className='font-medium md:hidden'>{option.text}</span>
        </Link>
      </li>
    ))
  }

  return (
    <aside className='flex flex-col gap-16 items-center justify-between p-4 md:p-0 bg-white md:fixed md:left-0 md:right-0 md:bottom-0 md:z-[999] md:w-full md:flex-row w-[450px] shadow-lg'>
      <div className='flex flex-col items-center justify-center gap-4 md:hidden'>
        {userData?.photoURL ? (
          <img
            src={userData.photoURL}
            alt=''
            className='w-48 h-48 border-4 border-blue-600 rounded-full '
          />
        ) : (
          <div className='flex items-center justify-center w-48 h-48 overflow-hidden border-4 border-blue-600 rounded-full'>
            <FaUserAlt size={100} className='text-blue-600' />
          </div>
        )}
        <h1 className='text-2xl font-bold text-blue-600 cursor-pointer'>{userData.displayName}</h1>
      </div>

      <div className='w-full h-full'>
        <nav>
          <ul className='flex flex-col gap-4 md:flex-row md:justify-center md:gap-0'>
            {liMap()}

            <li className='md:w-[14.28%]'>
              <button
                onClick={signOutUser}
                className='flex items-center gap-4 border-[1px] border-blue-500 p-3 md:p-6 text-base text-white transition-all duration-200 bg-blue-600 rounded-md shadow-sm cursor-pointer md:bg-white md:text-blue-600 hover:bg-blue-500 md:hover:bg-white md:shadow-none md:rounded-none md:border-r-zinc-300 md:border-y-0 md:border-r-[1px] md:border-l-0 md:justify-center w-full'
              >
                <div className='text-xl'>
                  <MdLogout />
                </div>
                <span className='font-medium md:hidden'>Sair</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar

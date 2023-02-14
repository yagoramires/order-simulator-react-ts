import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useAuth } from '../../hooks/auth/useAuth'

import { Link } from 'react-router-dom'

import { BsCartCheckFill } from 'react-icons/bs'
import { MdLogout } from 'react-icons/md'
import { FaPlus, FaIndustry, FaUserAlt, FaRegCalendarAlt, FaEdit } from 'react-icons/fa'

import './Sidebar.css'

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
      <li className='navContainer__listItem' key={option.path}>
        <Link to={`/${option.path}`} className='navContainer__btn'>
          {option.icon}
          <span className='navContainer__label'>{option.text}</span>
        </Link>
      </li>
    ))
  }

  return (
    <aside className='sidebar'>
      <div className='profileContainer'>
        {userData?.photoURL ? (
          <img
            src={userData.photoURL}
            alt={userData.displayName}
            className='profileContainer__img'
          />
        ) : (
          <div className='profileContainer__noImg'>
            <FaUserAlt size={100} className='text-blue-600' />
          </div>
        )}
        <h1 className='profileContainer__userName'>{userData.displayName}</h1>
      </div>

      <nav className='navContainer'>
        <ul className='navContainer__list'>
          {liMap()}

          <li className='navContainer__listItem'>
            <button onClick={signOutUser} className='navContainer__btn'>
              <MdLogout size={22} />
              <span className='navContainer__label'>Sair</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar

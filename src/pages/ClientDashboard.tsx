// Components
import { MdLogout } from 'react-icons/md'
import ClientOrders from '../components/Dashboard/ClientOrders'
import { useAuth } from '../hooks/auth/useAuth'

const ClientDashboard = () => {
  const { signOutUser } = useAuth()

  return (
    <div className='bg-dark-100 lg:flex'>
      <div className='lg:flex lg:items-center lg:justify-center lg:w-full'>
        <ClientOrders />
        <li className='w-full text-gray-50 '>
          <button
            onClick={signOutUser}
            className='flex items-center justify-center w-full p-2 transition-all rounded-lg lg:px-4 lg:py-3 lg:shadow-sm lg:gap-2 lg:bg-gray-800 lg:justify-start lg:hover:bg-gray-700'
          >
            <MdLogout size={22} />
            <span className='hidden lg:block'>Sair</span>
          </button>
        </li>
      </div>
    </div>
  )
}

export default ClientDashboard

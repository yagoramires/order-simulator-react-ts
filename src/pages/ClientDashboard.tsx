// Components
import { MdLogout } from 'react-icons/md'
import ClientOrders from '../components/ClientDashboard/ClientOrders'
import ClientSidebar from '../components/ClientDashboard/ClientSidebar'
import { useAuth } from '../hooks/auth/useAuth'

const ClientDashboard = () => {
  const { signOutUser } = useAuth()

  return (
    <div className='bg-dark-100 lg:flex'>
      <ClientSidebar />
      <div className='lg:flex lg:items-center lg:justify-center lg:w-full'>
        <ClientOrders />
      </div>
    </div>
  )
}

export default ClientDashboard

// Components
import ClientOrders from '../components/ClientDashboard/ClientOrders'
import ClientSidebar from '../components/ClientDashboard/ClientSidebar'

const ClientDashboard = () => {
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

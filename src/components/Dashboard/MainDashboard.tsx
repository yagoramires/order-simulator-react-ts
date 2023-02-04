// Router
import { Link } from 'react-router-dom'

// Icons
import { IoMdAdd } from 'react-icons/io'

// Components
import CardDashboard from './CardDashboard'
import IndustryForm from './Forms/IndustryForm'
import ClientForm from './Forms/ClientForm'
import DeadlineForm from './Forms/DeadlineForm'

const MainDashboard = () => {
  const nameUrl = window.location.href

  return (
    <main className='bg-gradient-to-r from-blue-800 to-blue-600 h-[100vh] w-full text-white p-8'>
      <div className='flex items-center justify-between w-full'>
        {nameUrl.includes('orders') && <h1 className='text-2xl font-medium'>Pedidos</h1>}
        {nameUrl.includes('industries') && <h1 className='text-2xl font-medium'>Indústrias</h1>}
        {nameUrl.includes('clients') && <h1 className='text-2xl font-medium'>Clientes</h1>}
        {nameUrl.includes('deadlines') && (
          <h1 className='text-2xl font-medium'>Prazos de Pagamento</h1>
        )}
        {nameUrl.includes('orders') && (
          <Link
            to='/order'
            className='flex items-center self-end justify-between gap-4 p-4 text-xl font-bold text-blue-600 bg-white rounded-md shadow-md'
          >
            <IoMdAdd /> Novo
          </Link>
        )}
        {nameUrl.includes('industries') && <IndustryForm />}
        {nameUrl.includes('clients') && <ClientForm />}
        {nameUrl.includes('deadlines') && <DeadlineForm />}
      </div>
      <div className=' bg-white shadow-md max-h-[75vh] rounded-md overflow-hidden my-10'>
        <div className='flex flex-col gap-4  p-8  overflow-y-scroll rounded-md max-h-[75vh]'>
          {nameUrl.includes('orders') && <CardDashboard type={'orders'} />}
          {nameUrl.includes('industries') && <CardDashboard type={'industries'} />}
          {nameUrl.includes('clients') && <CardDashboard type={'clients'} />}
          {nameUrl.includes('deadlines') && <CardDashboard type={'deadlines'} />}
        </div>
      </div>
    </main>
  )
}

export default MainDashboard

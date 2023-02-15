import { useNavigate, useParams } from 'react-router-dom'

import { IClients } from '../../../../interfaces'

import { MdKeyboardArrowLeft } from 'react-icons/md'
import Alert from '../../Alert'
import EditClient from './EditClient'

interface DataProps {
  client: IClients
}

const Sidebar = ({ client }: DataProps) => {
  const navigate = useNavigate()

  const { clientId } = useParams()

  return (
    <aside className='fixed bottom-0 left-0 z-10 w-full p-2 bg-dark-100 lg:bg-gray-900 lg:static lg:w-[350px] lg:p-4 lg:min-h-[100vh] shadow-sm text-gray-50 flex justify-center lg:flex-col lg:justify-start'>
      <div
        onClick={() => navigate(-1)}
        className='flex items-center justify-center px-8 py-2 font-medium text-white cursor-pointer lg:justify-end lg:w-full'
      >
        <MdKeyboardArrowLeft size={30} />
        <span className='hidden lg:text-xl lg:block'>Voltar</span>
      </div>

      <div className='lg:mt-8'>
        <div className='flex-col hidden gap-4 lg:flex'>
          <div className='flex flex-col'>
            <span className='text-xs text-gray-600'>Razão Social</span>
            <span className='text-sm font-medium'>{client.socialName}</span>
          </div>
          <div className='flex flex-col md:hidden'>
            <span className='text-xs text-gray-600'>Nome Fantasia</span>
            <span className='text-sm font-medium'>{client.fantasyName}</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-xs text-gray-600'>CNPJ</span>
            <span className='text-sm font-medium'>{client.cnpj}</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-xs text-gray-600'>Rede</span>
            <span className='text-sm font-medium'>{client.network || 'SEM REDE'}</span>
          </div>
        </div>
        <div className='flex items-center justify-center gap-2 lg:mt-8'>
          <EditClient clientId={clientId || ''} clientData={client} />
          <Alert data={{ type: 'client', id: clientId || '' }} />
        </div>
      </div>
    </aside>
  )
}

export default Sidebar

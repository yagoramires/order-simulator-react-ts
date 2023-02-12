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
    <aside className='flex flex-col gap-8 lg:gap-4 items-center justify-start p-4 md:p-2 bg-white w-[450px] lg:w-full shadow-lg'>
      <div
        onClick={() => navigate(-1)}
        className='flex items-center justify-end w-full text-blue-600 cursor-pointer'
      >
        <MdKeyboardArrowLeft size={20} />
        <span>Voltar</span>
      </div>

      <div className='flex flex-col w-full gap-4'>
        <div className='flex flex-col w-full gap-4 lg:flex-row lg:justify-between'>
          <div className='flex flex-col'>
            <span className='text-xs text-zinc-400'>Razão Social</span>
            <span className='text-sm font-medium'>{client.socialName}</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-xs text-zinc-400'>Nome Fantasia</span>
            <span className='text-sm font-medium'>{client.fantasyName}</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-xs text-zinc-400'>CNPJ</span>
            <span className='text-sm font-medium'>{client.cnpj}</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-xs text-zinc-400'>Rede</span>
            <span className='text-sm font-medium'>{client.network || 'SEM REDE'}</span>
          </div>
        </div>
        <div className='flex flex-col justify-start gap-4 lg:flex-row sm:justify-center'>
          <EditClient clientId={clientId || ''} clientData={client} />
          <Alert data={{ type: 'client', id: clientId || '' }} />
        </div>
      </div>
    </aside>
  )
}

export default Sidebar

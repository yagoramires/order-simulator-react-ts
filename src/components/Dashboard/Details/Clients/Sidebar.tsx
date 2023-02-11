import { useNavigate, useParams } from 'react-router-dom'

import { IClients } from '../../../../interfaces'

import { MdKeyboardArrowLeft } from 'react-icons/md'
import Alert from '../../Alert'

interface DataProps {
  client: IClients
}

const Sidebar = ({ client }: DataProps) => {
  const navigate = useNavigate()

  const { clientId } = useParams()

  return (
    <aside className='flex flex-col gap-16 items-center justify-between p-4  bg-white w-[450px] shadow-lg md:hidden'>
      <div className='flex items-center justify-between w-full gap-2 text-xl font-bold text-center text-blue-600 cursor-pointer lg:text-sm md:p-4'>
        <span
          onClick={() => navigate(-1)}
          className='flex items-center justify-between w-full text-xl font-bold text-blue-600 cursor-pointer md:text-sm md:p-4'
        >
          <MdKeyboardArrowLeft size={30} />
          <h1>{client.fantasyName}</h1>
        </span>
      </div>

      <div className='flex flex-col w-full h-full gap-4 md:hidden'>
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
        <div className='flex flex-col gap-4'>
          <button className='flex items-center justify-center px-4 py-2 font-medium text-white transition-all duration-200 rounded shadow-md cursor-pointer focus: hover:bg-blue-500 h-9 bg-gradient-to-r from-blue-800 to-blue-600'>
            Editar
          </button>
          <Alert data={{ type: 'client', id: clientId || '' }} />
        </div>
      </div>
    </aside>
  )
}

export default Sidebar

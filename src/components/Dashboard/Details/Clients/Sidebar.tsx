import { useNavigate } from 'react-router-dom'

import { IClients } from '../../../../interfaces'

import { MdKeyboardArrowLeft } from 'react-icons/md'

interface DataProps {
  client: IClients
}

const Sidebar = ({ client }: DataProps) => {
  const navigate = useNavigate()

  return (
    <aside className='flex flex-col gap-16 items-center justify-between md:justify-center p-4 md:p-0 bg-white md:fixed md:left-0 md:right-0 md:bottom-0 md:z-[999] md:w-full md:flex-row w-[450px] shadow-lg'>
      <div className='flex flex-col items-center justify-center gap-4 '>
        <div className='flex items-center justify-between w-full gap-2 text-xl font-bold text-center text-blue-600 lg:text-sm md:p-4'>
          <span onClick={() => navigate(-1)}>
            <MdKeyboardArrowLeft />
          </span>
          <h1 className='md:hidden'>{client.fantasyName}</h1>
          <span className='hidden md:flex'>Voltar</span>
        </div>
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
        <button className='w-full p-4 font-medium text-white rounded-md bg-gradient-to-r from-blue-800 to-blue-600'>
          Editar
        </button>
      </div>
    </aside>
  )
}

export default Sidebar

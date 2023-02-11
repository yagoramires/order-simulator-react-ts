import { useNavigate } from 'react-router-dom'

import { IIndustries } from '../../../../interfaces'

import { MdKeyboardArrowLeft } from 'react-icons/md'

interface DataProps {
  industry: IIndustries
}

const SidebarDetails = ({ industry }: DataProps) => {
  const navigate = useNavigate()

  return (
    <aside className='flex flex-col gap-16 items-center justify-between p-4 md:p-0 bg-white md:fixed md:left-0 md:right-0 md:bottom-0 md:z-[999] md:w-full md:flex-row w-[450px] lg:w-[350px] shadow-lg'>
      <div className='flex flex-col items-center justify-center gap-4 md:hidden'>
        <span
          onClick={() => navigate(-1)}
          className='flex items-center justify-between w-full text-4xl font-bold text-blue-600 cursor-pointer md:text-2xl md:p-4'
        >
          <MdKeyboardArrowLeft size={30} />
          <h1>{industry.fantasyName}</h1>
        </span>
      </div>

      <div className='flex flex-col w-full h-full gap-4 md:hidden'>
        <div className='flex flex-col'>
          <span className='text-xs text-zinc-400'>Razão Social</span>
          <span className='font-medium'>{industry.socialName}</span>
        </div>
        <div className='flex flex-col'>
          <span className='text-xs text-zinc-400'>Nome Fantasia</span>
          <span className='font-medium'>{industry.fantasyName}</span>
        </div>
        <div className='flex flex-col'>
          <span className='text-xs text-zinc-400'>CNPJ</span>
          <span className='font-medium'>{industry.cnpj}</span>
        </div>
        <button className='w-full p-4 font-medium text-white rounded-md bg-gradient-to-r from-blue-800 to-blue-600'>
          Editar
        </button>
      </div>
    </aside>
  )
}

export default SidebarDetails
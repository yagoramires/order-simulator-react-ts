import { Link } from 'react-router-dom'

import { MdKeyboardArrowLeft } from 'react-icons/md'

interface industryIndustry {
  industry: {
    id: number
    name: string
    socialname: string
    cnpj: string
    products?: Array<{
      id: number
      code: string
      name: string
      industry: string
      price: number
    }>
  }
}

const SidebarDetails = ({ industry }: industryIndustry) => {
  return (
    <aside className='flex flex-col gap-16 items-center justify-between md:justify-center p-4 md:p-0 bg-white md:fixed md:left-0 md:right-0 md:bottom-0 md:z-[999] md:w-full md:flex-row w-[450px] shadow-lg'>
      <div className='flex flex-col items-center justify-center gap-4 '>
        <div className='flex items-center justify-between w-full text-4xl font-bold text-blue-600 md:text-2xl md:p-4'>
          <Link to='/dashboard/industries'>
            <MdKeyboardArrowLeft />
          </Link>
          <h1>{industry.name}</h1>
        </div>
      </div>

      <div className='flex flex-col w-full h-full gap-4 md:hidden'>
        <div className='flex flex-col'>
          <span className='text-xs text-zinc-400'>Razão Social</span>
          <span className='font-medium'>{industry.socialname}</span>
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

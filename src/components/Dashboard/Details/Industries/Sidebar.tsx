import { useNavigate, useParams } from 'react-router-dom'

import { IIndustries } from '../../../../interfaces'

import { MdKeyboardArrowLeft } from 'react-icons/md'
import Alert from '../../Alert'
import EditIndustry from '../../Main/EditForm/EditIndustry'

interface DataProps {
  industry: IIndustries
}

const SidebarDetails = ({ industry }: DataProps) => {
  const navigate = useNavigate()

  const { industryId } = useParams()

  return (
    <aside className='flex flex-col gap-8 items-center justify-between p-4 md:p-0 bg-white md:fixed md:left-0 md:right-0 md:bottom-0 md:z-[999] md:w-full md:flex-row w-[450px] lg:w-[350px] shadow-lg'>
      <span
        onClick={() => navigate(-1)}
        className='flex items-center justify-end w-full text-blue-600 cursor-pointer'
      >
        <MdKeyboardArrowLeft size={20} />
        <span>Voltar</span>
      </span>

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
        <div className='flex flex-col gap-4'>
          <EditIndustry industryId={industryId || ''} industryData={industry} />
          <Alert data={{ type: 'industry', id: industryId || '' }} />
        </div>
      </div>
    </aside>
  )
}

export default SidebarDetails

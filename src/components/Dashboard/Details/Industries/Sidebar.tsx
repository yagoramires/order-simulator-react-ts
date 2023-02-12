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
        </div>
        <div className='flex flex-col justify-start gap-4 lg:flex-row sm:justify-center'>
          <EditIndustry industryId={industryId || ''} industryData={industry} />
          <Alert data={{ type: 'industry', id: industryId || '' }} />
        </div>
      </div>
    </aside>
  )
}

export default SidebarDetails

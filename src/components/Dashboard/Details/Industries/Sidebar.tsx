import { useNavigate, useParams } from 'react-router-dom'

import { IIndustries } from '../../../../interfaces'

import { MdKeyboardArrowLeft } from 'react-icons/md'
import Alert from '../../../GlobalComponents/Alert'
import EditIndustry from './Form/EditIndustry'

interface DataProps {
  industry: IIndustries
}

const Sidebar = ({ industry }: DataProps) => {
  const navigate = useNavigate()

  const { industryId } = useParams()

  return (
    <aside className='fixed bottom-0 left-0 z-10 w-full p-2 bg-dark-100 lg:bg-gray-900 lg:static lg:w-[350px] lg:p-4 lg:min-h-[100vh] shadow-sm text-gray-50 flex items-center justify-center lg:flex-col lg:justify-start'>
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
            <span className='text-sm font-medium'>{industry.socialName}</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-xs text-gray-600'>Nome Fantasia</span>
            <span className='text-sm font-medium'>{industry.fantasyName}</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-xs text-gray-600'>CNPJ</span>
            <span className='text-sm font-medium'>{industry.cnpj}</span>
          </div>
        </div>
        <div className='flex items-center justify-center gap-2 lg:mt-8'>
          <EditIndustry industryId={industryId || ''} industryData={industry} />
          <Alert data={{ type: 'industry', id: industryId || '' }} />
        </div>
      </div>
    </aside>
  )
}

export default Sidebar

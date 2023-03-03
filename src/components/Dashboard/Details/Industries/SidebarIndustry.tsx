import { useParams } from 'react-router-dom'

import Alert from '../../../GlobalComponents/Alert'
import BackButton from '../../../GlobalComponents/BackBtn'
import EditIndustry from './EditIndustry'
import ProductForm from './AddProduct'

import { IIndustries } from '../../../../interfaces'
interface DataProps {
  industry: IIndustries
}

const SidebarIndustry = ({ industry }: DataProps) => {
  const { industryId } = useParams()

  return (
    <aside className='fixed bottom-0 left-0 z-10 w-full p-2 bg-dark-100 lg:bg-gray-900 lg:static lg:w-[350px] lg:p-4 lg:min-h-[100vh] shadow-sm text-gray-50 flex items-center justify-center lg:flex-col lg:justify-start'>
      <BackButton />

      <div className='lg:mt-8'>
        <div className='flex-col hidden gap-4 lg:flex'>
          <div className='flex flex-col'>
            <span className='text-xs text-gray-600'>Razão Social</span>
            <span className='text-sm font-medium'>{industry.socialName?.toUpperCase()}</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-xs text-gray-600'>Nome Fantasia</span>
            <span className='text-sm font-medium'>{industry.fantasyName?.toUpperCase()}</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-xs text-gray-600'>CNPJ</span>
            <span className='text-sm font-medium'>{industry.cnpj}</span>
          </div>
        </div>
        <div className='flex items-center justify-center gap-2 lg:mt-8'>
          <ProductForm />
        </div>
        <div className='flex items-center justify-center gap-2 lg:mt-8'>
          <EditIndustry industryId={industryId || ''} industryData={industry} />
          <Alert data={{ type: 'industry', id: industryId || '' }} />
        </div>
      </div>
    </aside>
  )
}

export default SidebarIndustry

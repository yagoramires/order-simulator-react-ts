import { useNavigate, useParams } from 'react-router-dom'

import { INetworks } from '../../../../interfaces'

import { MdKeyboardArrowLeft } from 'react-icons/md'
import Alert from '../../../GlobalComponents/Alert'
import EditNetwork from './Form/EditNetwork'

interface DataProps {
  network: INetworks
}

const Sidebar = ({ network }: DataProps) => {
  const navigate = useNavigate()

  const { networkId } = useParams()

  return (
    <aside className='fixed bottom-0 left-0 z-10 w-full p-2 bg-dark-100 lg:bg-gray-900 lg:static lg:w-[350px] lg:p-4 lg:min-h-[100vh] shadow-sm text-gray-50 flex items-center justify-center lg:flex-col lg:justify-start'>
      <div
        onClick={() => navigate(-1)}
        className='flex items-center justify-center px-8 py-2 font-medium text-white cursor-pointer lg:justify-end lg:w-full'
      >
        <MdKeyboardArrowLeft size={30} />
        <span className='hidden lg:text-xl lg:block'>Voltar</span>
      </div>

      <div className='w-full lg:mt-8'>
        <div className='flex-col hidden w-full gap-4 lg:flex lg:justify-start'>
          <div className='flex flex-col w-full '>
            <span className='text-xs text-gray-600'>Nome</span>
            <span className='text-sm font-medium'>{network.name}</span>
          </div>

          <div className='flex items-center justify-center gap-2 lg:mt-8'>
            <EditNetwork networkId={networkId || ''} networkData={network} />
            <Alert data={{ type: 'network', id: networkId || '' }} />
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar

import { useParams } from 'react-router-dom'

import Alert from '../../../GlobalComponents/Alert'
import BackButton from '../../../GlobalComponents/BackBtn'
import EditClient from './EditClient'

import { IClients } from '../../../../interfaces'

interface DataProps {
  client: IClients
}

const SidebarClients = ({ client }: DataProps) => {
  const { clientId } = useParams()

  return (
    <aside className='fixed bottom-0 left-0 z-10 w-full p-2 bg-dark-100 lg:bg-gray-900 lg:static lg:w-[350px] lg:p-4 lg:min-h-[100vh] shadow-sm text-gray-50 flex justify-center lg:flex-col lg:justify-start'>
      <BackButton />

      <div className='lg:mt-8'>
        <div className='flex-col hidden gap-4 lg:flex'>
          <div className='flex flex-col'>
            <span className='text-xs text-gray-600'>Código</span>
            <span className='text-sm font-medium'>{client.code}</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-xs text-gray-600'>Razão Social</span>
            <span className='text-sm font-medium'>{client.socialName?.toUpperCase()}</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-xs text-gray-600'>CNPJ</span>
            <span className='text-sm font-medium'>{client.cnpj}</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-xs text-gray-600'>Rede</span>
            <span className='text-sm font-medium'>
              {client.network && client.network !== 'undefined'
                ? client.network?.toUpperCase()
                : 'SEM REDE'}
            </span>
          </div>
          <div className='flex flex-col'>
            <span className='text-xs text-gray-600'>Engefer</span>
            <span className='text-sm font-medium'>{client.engefer ? 'Sim' : 'Não'}</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-xs text-gray-600'>Prazo padrão</span>
            <span className='text-sm font-medium'>
              {client.deadline ? client.deadline : 'Sem prazo'}
            </span>
          </div>
          <div className='flex flex-col'>
            <span className='text-xs text-gray-600'>Desconto Ilumi</span>
            <span className='text-sm font-medium'>
              {client.discountA && client.discountA > 0
                ? `${client.discountA.toLocaleString('pt-BR')} %`
                : 'Sem desconto Ilumi'}
            </span>
          </div>
          <div className='flex flex-col'>
            <span className='text-xs text-gray-600'>Desconto adicional</span>
            <span className='text-sm font-medium'>
              {client.discountB && client.discountB > 0
                ? `${client.discountB.toLocaleString('pt-BR')} %`
                : 'Sem desconto adicional'}
            </span>
          </div>
          <div className='flex flex-col'>
            <span className='text-xs text-gray-600'>Desconto à vista</span>
            <span className='text-sm font-medium'>
              {client.discountC && client.discountC > 0
                ? `${client.discountC.toLocaleString('pt-BR')} %`
                : 'Sem desconto à vista'}
            </span>
          </div>
        </div>
        <div className='flex items-center justify-center gap-2 lg:mt-8'>
          <EditClient clientId={clientId || ''} clientData={client} />
          <Alert data={{ type: 'client', id: clientId || '' }} />
        </div>
      </div>
    </aside>
  )
}

export default SidebarClients

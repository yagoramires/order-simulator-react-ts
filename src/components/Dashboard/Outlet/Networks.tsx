import { useState } from 'react'
import { useFetchCollection } from '../../../hooks/fetchData/useFetchCollection'

import LabelComponent from '../../GlobalComponents/LabelComponent'
import LinkComponent from '../../GlobalComponents/LinkComponent'
import MessageComponent from '../../GlobalComponents/MessageComponent'
import Search from '../../GlobalComponents/Search'
import NetworkForm from './Forms/AddNetwork'
import LoadMoreBtn from '../../GlobalComponents/LoadMoreBtn'

import { INetworks } from '../../../interfaces'

const Networks = () => {
  const { networksFetch, fetchMore } = useFetchCollection('networks')
  const [result, setResult] = useState([])

  const linkComponent = (network: INetworks) => {
    return (
      <LinkComponent id={network.id || ''} key={network.id}>
        <span className='w-full'>{network.name?.toLocaleUpperCase()}</span>
      </LinkComponent>
    )
  }

  const labelComponent = () => {
    return (
      <LabelComponent>
        <span className='w-full'>Nome</span>
      </LabelComponent>
    )
  }

  return (
    <div className='max-w-[1400px] w-full'>
      <div className='flex items-center justify-between w-full gap-2 p-2 bg-dark-100'>
        <Search collection='networks' setResult={setResult} />

        <NetworkForm />
      </div>

      {result.length === 0 && networksFetch.length === 0 && (
        <MessageComponent text='Nenhuma rede cadastrada.' />
      )}

      <div className='h-[calc(100vh-130px)] flex flex-col items-start w-full gap-2 p-2 overflow-auto'>
        {networksFetch.length > 0 && result.length === 0 && labelComponent()}
        {result.length > 0 && labelComponent()}

        {networksFetch.length > 0 &&
          result.length === 0 &&
          networksFetch?.map((network) => linkComponent(network))}

        {result.length > 0 && result.map((network) => linkComponent(network))}
      </div>

      {result.length === 0 && networksFetch.length > 0 && <LoadMoreBtn fetchMore={fetchMore} />}
    </div>
  )
}

export default Networks

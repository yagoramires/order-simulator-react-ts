import { useState } from 'react'
import { useFetchCollection } from '../../../hooks/fetchData/useFetchCollection'

import LabelComponent from '../../GlobalComponents/LabelComponent'
import LinkComponent from '../../GlobalComponents/LinkComponent'
import MessageComponent from '../../GlobalComponents/MessageComponent'
import Search from '../../GlobalComponents/Search'
import NetworkForm from './Forms/AddNetwork'

import { INetworks } from '../../../interfaces'

const Networks = () => {
  const [search, setSearch] = useState('')
  const { networks } = useFetchCollection('networks')

  const nameFilter =
    search.length > 0
      ? networks.filter((network) => network.name?.toLowerCase().includes(search.toLowerCase()))
      : []

  const linkComponent = (network: INetworks) => {
    return (
      <LinkComponent id={network.id || ''}>
        <span className='w-full'>{network.name}</span>
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
        <Search search={search} setSearch={setSearch} />

        <NetworkForm />
      </div>

      {!search && networks.length === 0 && <MessageComponent text='Nenhuma rede cadastrada.' />}

      {search && nameFilter.length === 0 && <MessageComponent text='Nenhuma rede encontrada.' />}

      <div className='h-[calc(100vh-130px)] flex flex-col items-start w-full gap-2 p-2 overflow-auto'>
        {networks.length > 0 && !search && labelComponent()}
        {search && nameFilter.length > 0 && labelComponent()}

        {!search && networks?.map((network) => linkComponent(network))}

        {search && nameFilter.length > 0 && nameFilter.map((network) => linkComponent(network))}
      </div>
    </div>
  )
}

export default Networks

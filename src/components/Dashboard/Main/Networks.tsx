import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useFetchCollection } from '../../../hooks/fetchData/useFetchCollection'
import { INetworks } from '../../../interfaces'
import NetworkForm from './AddForm/AddNetwork'

const Networks = () => {
  const { networks } = useFetchCollection('networks')

  const [search, setSearch] = useState('')

  const nameFilter =
    search.length > 0
      ? networks.filter((network) => network.name?.toLowerCase().includes(search.toLowerCase()))
      : []

  const linkComponent = (network: INetworks) => {
    return (
      <Link
        to={`${network.id}`}
        className='flex items-center w-full gap-2 p-2 break-words bg-gray-900 rounded-lg lg:p-4 text-gray-50'
        key={network.id}
      >
        <span className='w-full'>{network.name}</span>
      </Link>
    )
  }

  const labelComponent = () => {
    return (
      <div className='flex items-center w-full gap-2 p-2 text-left break-words lg:p-4 text-gray-50'>
        <span className='text-xs text-zinc-400w-full'>Nome</span>
      </div>
    )
  }

  return (
    <div className='max-w-[1400px] w-full'>
      <div className='flex items-center justify-between w-full gap-2 p-2 bg-dark-100'>
        <input
          type='text'
          className='p-2 bg-gray-900 rounded-lg placeholder:text-center text-gray-50 max-w-[300px] w-full'
          placeholder='Pesquisar'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <NetworkForm />
      </div>

      <div className='h-[calc(100vh-130px)] flex flex-col items-start w-full gap-2 p-2 overflow-auto'>
        {networks.length > 0 && !search && labelComponent()}
        {search && nameFilter.length > 0 && labelComponent()}

        {!search && networks.length === 0 && (
          <p className='w-full mt-5 text-center text-gray-50'>Nenhuma rede cadastrada.</p>
        )}

        {search && nameFilter.length > 0 && nameFilter.map((network) => linkComponent(network))}

        {search && nameFilter.length === 0 && (
          <p className='w-full mt-5 text-center text-gray-50'>Nenhuma rede encontrada.</p>
        )}

        {!search && networks?.map((network) => linkComponent(network))}
      </div>
    </div>
  )
}

export default Networks

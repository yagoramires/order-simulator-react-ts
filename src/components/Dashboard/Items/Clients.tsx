import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useFetchCollection } from '../../../hooks/fetchData/useFetchCollection'
import { IClients } from '../../../interfaces'

const Clients = () => {
  const { clients } = useFetchCollection('clients')

  const [search, setSearch] = useState('')

  const filteredClients =
    search.length > 0
      ? clients.filter((client) => client.socialName?.toLowerCase().includes(search.toLowerCase()))
      : []

  const linkComponent = (client: IClients) => {
    return (
      <div className='flex items-center justify-between w-full gap-4' key={client.id}>
        <Link
          to={`${client.id}`}
          className='text-black border-b-[1px] border-b-zinc-200 p-2 rounded-md hover:bg-zinc-200 w-full'
        >
          <div className='flex flex-col'>
            <span className='text-xs text-zinc-400'>Cliente</span>
            <span className='font-medium'>{client.socialName}</span>
          </div>
        </Link>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-4'>
      {clients.length === 0 ? (
        <p className='text-black'>Nenhum pedido cadastrado.</p>
      ) : (
        <input
          type='text'
          className='p-2 rounded-md shadow-sm bg-zinc-300'
          placeholder='Pesquisar'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      )}

      {search
        ? filteredClients.map((client) => linkComponent(client))
        : clients?.map((client) => linkComponent(client))}
    </div>
  )
}

export default Clients

import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useFetchCollection } from '../../../hooks/fetchData/useFetchCollection'
import { IClients } from '../../../interfaces'
import ClientForm from './AddForm/AddClient'

const Clients = () => {
  const { clients } = useFetchCollection('clients')

  const [search, setSearch] = useState('')

  const nameFilter =
    search.length > 0
      ? clients.filter((client) => client.socialName?.toLowerCase().includes(search.toLowerCase()))
      : []

  const cnpjFilter =
    search.length > 0
      ? clients.filter((client) => client.cnpj?.toLowerCase().includes(search.toLowerCase()))
      : []

  const linkComponent = (client: IClients) => {
    return (
      <Link
        to={`${client.id}`}
        className='flex items-center w-full gap-2 p-2 break-words bg-gray-900 rounded-lg lg:p-4 text-gray-50'
        key={client.id}
      >
        <span className='w-[70%] '>{client.socialName}</span>
        <span className='w-[30%] '>{client.cnpj}</span>
      </Link>
    )
  }

  const labelComponent = () => {
    return (
      <div className='flex items-center w-full gap-2 p-2 text-left break-words lg:p-4 text-gray-50'>
        <span className='text-xs text-zinc-400 w-[70%] md:w-full'>Nome</span>
        <span className='text-xs text-zinc-400 w-[30%] md:hidden'>CNPJ</span>
      </div>
    )
  }

  return (
    <div className='max-w-[1400px] w-full'>
      <div className='flex items-center justify-between w-full p-2 bg-dark-100'>
        <input
          type='text'
          className='p-2 bg-gray-900 rounded-lg placeholder:text-center text-gray-50 md:w-[300px]'
          placeholder='Pesquisar'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ClientForm />
      </div>

      <div className='h-[calc(100vh-130px)] flex flex-col items-start w-full gap-2 p-2 overflow-auto'>
        {clients.length > 0 && !search && labelComponent()}
        {search && nameFilter.length > 0 && labelComponent()}
        {search && cnpjFilter.length > 0 && labelComponent()}

        {clients.length === 0 && (
          <p className='w-full mt-5 text-center text-gray-50'>Nenhum cliente cadastrado.</p>
        )}

        {search && nameFilter.length > 0 && nameFilter.map((client) => linkComponent(client))}
        {cnpjFilter && cnpjFilter.length > 0 && cnpjFilter.map((client) => linkComponent(client))}

        {search && nameFilter.length === 0 && cnpjFilter.length === 0 && (
          <p className='w-full mt-5 text-center text-gray-50'>Nenhum cliente encontrado.</p>
        )}
        {!search && clients?.map((client) => linkComponent(client))}
      </div>
    </div>
  )
}

export default Clients

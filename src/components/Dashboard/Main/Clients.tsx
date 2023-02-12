import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useFetchCollection } from '../../../hooks/fetchData/useFetchCollection'
import { IClients } from '../../../interfaces'
import ClientForm from './AddForm/AddClient'

const Clients = () => {
  const { clients } = useFetchCollection('clients')

  const [search, setSearch] = useState('')

  const filteredClientsName =
    search.length > 0
      ? clients.filter((client) => client.socialName?.toLowerCase().includes(search.toLowerCase()))
      : []

  const filteredClientsCnpj =
    search.length > 0
      ? clients.filter((client) => client.cnpj?.toLowerCase().includes(search.toLowerCase()))
      : []

  const linkComponent = (client: IClients) => {
    return (
      <div className='flex items-center justify-between w-full gap-4' key={client.id}>
        <Link
          to={`${client.id}`}
          className='text-black border-b-[1px] border-b-zinc-200 p-2 rounded-md hover:bg-zinc-200 w-full'
        >
          <div className='flex items-center justify-between w-full gap-4'>
            <span className='font-medium w-[70%] md:w-full'>{client.socialName}</span>

            <span className='text-sm font-normal  w-[30%] md:hidden'>{client.cnpj}</span>
          </div>
        </Link>
      </div>
    )
  }

  const labelComponent = () => {
    return (
      <div className='flex items-center justify-start w-full gap-4 pl-4 text-start'>
        <span className='text-xs text-zinc-400 w-[70%] md:w-full'>Nome</span>
        <span className='text-xs text-zinc-400 w-[30%] md:hidden'>CNPJ</span>
      </div>
    )
  }

  return (
    <>
      <div className='flex items-center justify-between w-full'>
        <h1 className='text-2xl font-medium'>Prazos de pagamento</h1>
        <ClientForm />
      </div>
      <div className=' bg-white shadow-md max-h-[75vh] rounded-md overflow-hidden my-10'>
        <div className='flex flex-col gap-4 p-8 overflow-y-scroll rounded-md max-h-[75vh]'>
          <div className='flex flex-col gap-4'>
            {clients.length === 0 ? (
              <p className='w-full text-center text-black my-[5rem]'>Nenhum pedido cadastrado.</p>
            ) : (
              <input
                type='text'
                className='p-2 rounded-md shadow-sm bg-zinc-300'
                placeholder='Pesquisar'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            )}

            {clients.length > 0 && !search && labelComponent()}
            {search && filteredClientsName.length > 0 && labelComponent()}
            {search && filteredClientsCnpj.length > 0 && labelComponent()}

            {search && filteredClientsName.length > 0
              ? filteredClientsName.map((client) => linkComponent(client))
              : filteredClientsCnpj.length > 0
              ? filteredClientsCnpj.map((client) => linkComponent(client))
              : search && (
                  <p className='w-full text-center text-black my-[5rem]'>
                    Nenhum cliente encontrado.
                  </p>
                )}

            {!search && clients?.map((client) => linkComponent(client))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Clients

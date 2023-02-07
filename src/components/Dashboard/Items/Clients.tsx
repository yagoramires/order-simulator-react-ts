import { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { TiDelete } from 'react-icons/ti'
import { Link } from 'react-router-dom'

import { useFetchCollection } from '../../../hooks/fetchData/useFetchCollection'
import { IClients } from '../../../interfaces'
import ClientForm from '../Forms/ClientForm'

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
          <div className='flex items-center justify-between'>
            <div className='flex flex-col'>
              <span className='text-xs text-zinc-400'>Cliente</span>
              <span className='font-medium'>{client.socialName}</span>
            </div>
            <div className='flex gap-2'>
              <FaEdit className='text-green-400' />
              <TiDelete className='text-red-400' />
            </div>
          </div>
        </Link>
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

            {search && filteredClientsName.length > 0
              ? filteredClientsName.map((client) => linkComponent(client))
              : filteredClientsCnpj.length > 0
              ? filteredClientsCnpj.map((client) => linkComponent(client))
              : search && <p className='text-black'>Nenhum cliente encontrado.</p>}

            {!search && clients?.map((client) => linkComponent(client))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Clients

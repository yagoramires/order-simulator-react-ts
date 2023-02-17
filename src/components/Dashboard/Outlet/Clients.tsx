import { useState } from 'react'
import { useFetchCollection } from '../../../hooks/fetchData/useFetchCollection'

import LabelComponent from '../../GlobalComponents/LabelComponent'
import LinkComponent from '../../GlobalComponents/LinkComponent'
import ClientForm from './Forms/AddClient'

import { IClients } from '../../../interfaces'
import MessageComponent from '../../GlobalComponents/MessageComponent'
import Search from '../../GlobalComponents/Search'

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
      <LinkComponent id={client.id || ''}>
        <span className='w-[70%] '>{client.socialName}</span>
        <span className='w-[30%] '>{client.cnpj}</span>
      </LinkComponent>
    )
  }

  const labelComponent = () => {
    return (
      <LabelComponent>
        <span className='w-[70%]'>Nome</span>
        <span className='w-[30%]'>CNPJ</span>
      </LabelComponent>
    )
  }

  return (
    <div className='max-w-[1400px] w-full'>
      <div className='flex items-center justify-between w-full gap-2 p-2 bg-dark-100'>
        <Search search={search} setSearch={setSearch} />

        <ClientForm />
      </div>

      {!search && clients.length === 0 && <MessageComponent text='Nenhum cliente cadastrado.' />}
      {search && nameFilter.length === 0 && cnpjFilter.length === 0 && (
        <MessageComponent text='Nenhum cliente encontrado.' />
      )}

      <div className='h-[calc(100vh-130px)] flex flex-col items-start w-full gap-2 p-2 overflow-auto'>
        {clients.length > 0 && !search && labelComponent()}
        {search && nameFilter.length > 0 && labelComponent()}
        {search && cnpjFilter.length > 0 && labelComponent()}

        {!search && clients?.map((client) => linkComponent(client))}
        {search && nameFilter.length > 0 && nameFilter.map((client) => linkComponent(client))}
        {cnpjFilter && cnpjFilter.length > 0 && cnpjFilter.map((client) => linkComponent(client))}
      </div>
    </div>
  )
}

export default Clients

import { useState } from 'react'
import { useFetchCollection } from '../../../hooks/fetchData/useFetchCollection'

import ClientForm from './Forms/AddClient'
import LabelComponent from '../../GlobalComponents/LabelComponent'
import LinkComponent from '../../GlobalComponents/LinkComponent'
import MessageComponent from '../../GlobalComponents/MessageComponent'
import Search from '../../GlobalComponents/Search'
import LoadMoreBtn from '../../GlobalComponents/LoadMoreBtn'

import { IClients } from '../../../interfaces'

const Clients = () => {
  const { clientsFetch, fetchMore } = useFetchCollection('clients')
  const [result, setResult] = useState([])

  const linkComponent = (client: IClients) => {
    return (
      <LinkComponent id={client.id || ''} key={client.id}>
        <span className='w-[70%] '>{client.socialName?.toUpperCase()}</span>
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
        <Search collection='clients' setResult={setResult} />

        <ClientForm />
      </div>

      {result.length === 0 && clientsFetch.length === 0 && (
        <MessageComponent
          text='Nenhum cliente
         cadastrado.'
        />
      )}

      <div className='h-[calc(100vh-160px)] flex flex-col items-start w-full gap-2 p-2 overflow-auto'>
        {clientsFetch.length > 0 && result.length === 0 && labelComponent()}
        {result.length > 0 && labelComponent()}

        {clientsFetch.length > 0 &&
          result.length === 0 &&
          clientsFetch?.map((client) => linkComponent(client))}

        {result.length > 0 && result.map((client) => linkComponent(client))}
      </div>

      {result.length === 0 && clientsFetch.length > 0 && <LoadMoreBtn fetchMore={fetchMore} />}
    </div>
  )
}

export default Clients

import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { Link, useParams } from 'react-router-dom'
import { useFetchCollection } from '../../../../hooks/fetchData/useFetchCollection'

import Orders from './Items/Orders'

const Main = () => {
  const [search, setSearch] = useState('')

  const { clientId } = useParams()
  const { clientOrders } = useFetchCollection(`clients/${clientId}/orders`)

  const idFilter =
    search.length > 0 ? clientOrders.filter((order) => String(order.orderId).includes(search)) : []

  const nameFilter =
    search.length > 0
      ? clientOrders.filter((order) =>
          order.clientName?.toLowerCase().includes(search.toLowerCase()),
        )
      : []

  const labelComponent = () => {
    return (
      <div className='flex items-center w-full gap-2 p-2 text-left break-words lg:p-4 text-gray-50'>
        <span className='w-[15%]'>Pedido</span>
        <span className='w-[20%]'>Data</span>
        <span className='w-[35%]'>Prazo</span>
        <span className='w-[10%]'>Indústria</span>
        <span className='w-[15%]'>Total</span>
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

        <Link
          to='/order'
          className='relative flex items-center justify-between gap-2 px-4 py-2 font-bold bg-blue-600 rounded-lg text-gray-50'
        >
          <IoMdAdd /> Novo
        </Link>
      </div>

      <div className='h-[calc(100vh-130px)] flex flex-col items-start w-full gap-2 p-2 overflow-auto'>
        {clientOrders.length > 0 && !search && labelComponent()}
        {search && nameFilter.length > 0 && labelComponent()}
        {search && idFilter.length > 0 && labelComponent()}

        {clientOrders.length === 0 && (
          <p className='w-full mt-5 text-center text-gray-50'>Nenhum pedido cadastrado.</p>
        )}

        {search &&
          idFilter.length > 0 &&
          idFilter
            .sort((a, b) => Number(b.orderId) - Number(a.orderId))
            .map((order) => <Orders order={order} key={order.id} />)}

        {search &&
          nameFilter.length > 0 &&
          nameFilter
            .sort((a, b) => Number(b.orderId) - Number(a.orderId))
            .map((order) => <Orders order={order} key={order.id} />)}

        {search && nameFilter.length === 0 && idFilter.length === 0 && (
          <p className='w-full mt-5 text-center text-gray-50'>Nenhum pedido encontrado.</p>
        )}

        {!search &&
          clientOrders
            .sort((a, b) => Number(b.orderId) - Number(a.orderId))
            .map((order) => <Orders order={order} key={order.id} />)}
      </div>
    </div>
  )
}

export default Main

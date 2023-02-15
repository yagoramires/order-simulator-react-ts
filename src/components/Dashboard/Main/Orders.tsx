import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useFetchCollection } from '../../../hooks/fetchData/useFetchCollection'
import { useFormatDate } from '../../../hooks/formatData/useFormatDate'
import { useFormatValue } from '../../../hooks/formatData/useFormatValue'
import { IOrder } from '../../../interfaces'

const Orders = () => {
  const { orders } = useFetchCollection('orders')

  const [search, setSearch] = useState('')

  const nameFilter =
    search.length > 0
      ? orders.filter((order) => order.clientName?.toLowerCase().includes(search.toLowerCase()))
      : []

  const idFilter =
    search.length > 0 ? orders.filter((order) => String(order.orderId).includes(search)) : []

  const { formatDate } = useFormatDate()
  const { formatValue } = useFormatValue()

  const linkComponent = (order: IOrder) => {
    return (
      <Link
        to={`${order.id}`}
        className='flex items-center w-full gap-2 p-2 break-words bg-gray-900 rounded-lg lg:p-4 text-gray-50'
        key={order.id}
      >
        <span className='w-[15%]'>{order.orderId}</span>
        <span className='w-[45%]'>{order.clientName}</span>
        <div className='w-[40%] flex gap-2'>
          <span className='w-[33%]'>{order.createdAt && formatDate(order.createdAt)}</span>
          <span className='w-[33%]'>{order.total && formatValue(+order.total)}</span>
          <span className='w-[33%]'>{order.sellerName}</span>
        </div>
      </Link>
    )
  }

  const labelComponent = () => {
    return (
      <div className='flex items-center w-full gap-2 p-2 text-left break-words lg:p-4 text-gray-50'>
        <span className='w-[15%]'>Pedido</span>
        <span className='w-[45%]'>Cliente</span>
        <div className='w-[40%] flex gap-2'>
          <span className='w-[33%]'>Data</span>
          <span className='w-[33%]'>Total</span>
          <span className='w-[33%]'>Vendedor</span>
        </div>
      </div>
    )
  }

  return (
    <div className='max-w-[1400px] w-full'>
      <div className='flex items-center justify-center w-full p-2 bg-dark-100'>
        <input
          type='text'
          className='p-2 bg-gray-900 rounded-lg placeholder:text-center text-gray-50'
          placeholder='Pesquisar'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className='h-[calc(100vh-130px)] flex flex-col items-start w-full gap-2 p-2 overflow-auto'>
        {orders.length > 0 && !search && labelComponent()}
        {search && nameFilter.length > 0 && labelComponent()}
        {search && idFilter.length > 0 && labelComponent()}

        {orders.length === 0 && (
          <p className='w-full mt-5 text-center text-gray-50'>Nenhum pedido cadastrado.</p>
        )}

        {search &&
          nameFilter.length > 0 &&
          nameFilter
            .sort((a, b) => Number(b.orderId) - Number(a.orderId))
            .map((order) => linkComponent(order))}

        {search &&
          idFilter.length > 0 &&
          idFilter
            .sort((a, b) => Number(b.orderId) - Number(a.orderId))
            .map((order) => linkComponent(order))}

        {search && nameFilter.length === 0 && idFilter.length === 0 && (
          <p className='w-full mt-5 text-center text-gray-50'>Nenhum pedido encontrado.</p>
        )}

        {!search &&
          orders
            ?.sort((a, b) => Number(b.orderId) - Number(a.orderId))
            .map((order) => linkComponent(order))}
      </div>
    </div>
  )
}

export default Orders

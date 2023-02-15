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
        className='flex items-center justify-start w-full gap-2 p-2 bg-gray-900 rounded-lg text-gray-50'
        key={order.id}
      >
        <span className='w-[10%]'>{order.orderId}</span>
        <span className='w-[30%]'>{order.clientName}</span>
        <span className='w-[100px]'>{order.createdAt && formatDate(order.createdAt)}</span>
        <span className='w-[20%]'>{order.total && formatValue(+order.total)}</span>
        <span className='w-[10%]'>{order.sellerName}</span>
      </Link>
    )
  }

  const labelComponent = () => {
    return (
      <div className='flex items-center justify-start w-full gap-2 p-4 text-gray-50'>
        <span className='w-[10%]'>Pedido</span>
        <span className='w-[30%]'>Cliente</span>
        <span className='w-[100px]'>Data</span>
        <span className='w-[20%]'>Total</span>
        <span className='w-[10%]'>Vendedor</span>
      </div>
    )
  }

  return (
    <div className=''>
      <div className='max-w-[1400px] w-full'>
        <div className='flex items-center justify-center w-full bg-dark-100'>
          <input
            type='text'
            className='p-2 bg-gray-900 rounded-lg placeholder:text-center text-gray-50'
            placeholder='Pesquisar'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {orders.length > 0 && !search && labelComponent()}
        {search && nameFilter.length > 0 && labelComponent()}
        {search && idFilter.length > 0 && labelComponent()}

        <div className=' h-[calc(100vh-150px)] flex flex-col items-start min-w-[600px] w-full gap-2 p-2 overflow-auto'>
          {orders.length === 0 && (
            <p className='cardsContainer__noData'>Nenhum pedido cadastrado.</p>
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

          {search && !nameFilter && !idFilter && (
            <p className='cardsContainer__noData'>Nenhum pedido encontrado.</p>
          )}

          {!search &&
            orders
              ?.sort((a, b) => Number(b.orderId) - Number(a.orderId))
              .map((order) => linkComponent(order))}
        </div>
      </div>
    </div>
  )
}

export default Orders

import { useState } from 'react'

import { useFetchCollection } from '../../../hooks/fetchData/useFetchCollection'
import { useFormatDate } from '../../../hooks/formatData/useFormatDate'
import { useFormatValue } from '../../../hooks/formatData/useFormatValue'

import LinkComponent from '../../GlobalComponents/LinkComponent'
import LabelComponent from '../../GlobalComponents/LabelComponent'
import MessageComponent from '../../GlobalComponents/MessageComponent'
import Search from '../../GlobalComponents/Search'

import { IOrder } from '../../../interfaces'

const Orders = () => {
  const [search, setSearch] = useState('')
  const { orders } = useFetchCollection('orders')
  const { formatDate } = useFormatDate()
  const { formatValue } = useFormatValue()

  const nameFilter =
    search.length > 0
      ? orders.filter((order) => order.clientName?.toLowerCase().includes(search.toLowerCase()))
      : []

  const idFilter =
    search.length > 0 ? orders.filter((order) => String(order.orderId).includes(search)) : []

  const linkComponent = (order: IOrder) => {
    return (
      <LinkComponent id={order.id || ''} key={order.id}>
        <span className='w-[15%]'>{order.orderId}</span>
        <span className='w-[45%]'>{order.clientName}</span>
        <div className='w-[40%] flex gap-2'>
          <span className='w-[33%]'>{order.createdAt && formatDate(order.createdAt)}</span>
          <span className='w-[33%]'>{order.total && formatValue(+order.total)}</span>
          <span className='w-[33%]'>{order.sellerName}</span>
        </div>
      </LinkComponent>
    )
  }

  const labelComponent = () => {
    return (
      <LabelComponent>
        <span className='w-[15%]'>Pedido</span>
        <span className='w-[45%]'>Cliente</span>
        <div className='w-[40%] flex gap-2'>
          <span className='w-[33%]'>Data</span>
          <span className='w-[33%]'>Total</span>
          <span className='w-[33%]'>Vendedor</span>
        </div>
      </LabelComponent>
    )
  }

  return (
    <div className='max-w-[1400px] w-full'>
      <div className='flex items-center justify-center w-full p-2 bg-dark-100'>
        <Search search={search} setSearch={setSearch} />
      </div>

      {!search && orders.length === 0 && (
        <MessageComponent
          text='Nenhum pedido
         cadastrado.'
        />
      )}

      {search && nameFilter.length === 0 && idFilter.length === 0 && (
        <MessageComponent text='Nenhum pedido encontrado.' />
      )}

      <div className='h-[calc(100vh-130px)] flex flex-col items-start w-full gap-2 p-2 overflow-auto'>
        {orders.length > 0 && !search && labelComponent()}
        {search && nameFilter.length > 0 && labelComponent()}
        {search && idFilter.length > 0 && labelComponent()}

        {!search &&
          orders
            ?.sort((a, b) => Number(b.orderId) - Number(a.orderId))
            .map((order) => linkComponent(order))}

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
      </div>
    </div>
  )
}

export default Orders

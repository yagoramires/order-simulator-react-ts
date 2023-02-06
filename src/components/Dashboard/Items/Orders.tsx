import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useFetchCollection } from '../../../hooks/fetchData/useFetchCollection'
import { IOrder } from '../../../interfaces'

const Orders = () => {
  const { orders } = useFetchCollection('orders')

  const [search, setSearch] = useState('')

  const filteredOrders =
    search.length > 0
      ? orders.filter((order) => order.clientName?.toLowerCase().includes(search.toLowerCase()))
      : []

  const transform = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  const linkComponent = (order: IOrder) => {
    return (
      <div className='flex items-center justify-between w-full gap-4' key={order.id}>
        <Link
          to={`${order.id}`}
          className='text-black border-b-[1px] border-b-zinc-200 p-2 rounded-md hover:bg-zinc-200 w-full'
        >
          <div className='flex items-center justify-between w-full gap-4' key={order.id}>
            <div className='flex flex-col w-[60%] md:w-[100%]'>
              <span className='text-xs text-zinc-400'>Cliente</span>
              <span className='font-medium'>{order.clientName}</span>
            </div>

            <div className='flex gap-2 w-[40%] md:w-[100%]'>
              <div className='flex flex-col md:w-[33.33%] '>
                <span className='text-xs text-zinc-400'>Pedido</span>
                <span className='font-medium'>{order.id}</span>
              </div>
              <div className='flex flex-col md:w-[33.33%] '>
                <span className='text-xs text-zinc-400'>Data</span>
                <span className='font-medium'>{order.createdAt?.seconds}</span>
              </div>
              <div className='flex flex-col md:w-[33.33%] '>
                <span className='text-xs text-zinc-400'>Total</span>
                <span className='font-medium'>{order.total && transform(+order.total)}</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-4'>
      <input
        type='text'
        className='p-2 rounded-md shadow-sm bg-zinc-300'
        placeholder='Pesquisar'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {search
        ? filteredOrders.map((order) => linkComponent(order))
        : orders?.map((order) => linkComponent(order))}
    </div>
  )
}

export default Orders

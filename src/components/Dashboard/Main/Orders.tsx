import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { Link } from 'react-router-dom'

import { useFetchCollection } from '../../../hooks/fetchData/useFetchCollection'
import { useFormatDate } from '../../../hooks/formatData/useFormatDate'
import { useFormatValue } from '../../../hooks/formatData/useFormatValue'
import { IOrder } from '../../../interfaces'

const Orders = () => {
  const { orders } = useFetchCollection('orders')

  const [search, setSearch] = useState('')

  const filteredOrdersName =
    search.length > 0
      ? orders.filter((order) => order.clientName?.toLowerCase().includes(search.toLowerCase()))
      : []

  const filteredOrdersOrderId =
    search.length > 0 ? orders.filter((order) => String(order.orderId).includes(search)) : []

  const { formatDate } = useFormatDate()
  const { formatValue } = useFormatValue()

  const linkComponent = (order: IOrder) => {
    return (
      <div className='flex items-center justify-between w-full gap-4' key={order.id}>
        <Link
          to={`${order.id}`}
          className='text-black border-b-[1px] border-b-zinc-200 p-2 rounded-md hover:bg-zinc-200 w-full'
        >
          <div className='flex items-start justify-start w-full gap-4 text-start' key={order.id}>
            <div className='flex flex-col items-center w-[10%] lg:hidden'>
              <span className='font-medium'>{order.orderId}</span>
            </div>

            <div className='flex flex-col items-start w-[35%] lg:w-[60%]'>
              <span className='font-medium'>{order.clientName}</span>
            </div>
            <div className='flex w-[55%] lg:flex-col lg:w-[40%] gap-4'>
              <div className='flex flex-col items-start w-[30%] lg:w-full'>
                <span className='font-medium'>
                  {order.createdAt && formatDate(order.createdAt)}
                </span>
              </div>
              <div className='flex flex-col items-start w-[40%] lg:w-full'>
                <span className='hidden text-xs text-zinc-400 lg:inline'>Total</span>
                <span className='font-medium'>{order.total && formatValue(+order.total)}</span>
              </div>
              <div className='flex flex-col items-start w-[30%] lg:w-full'>
                <span className='hidden text-xs text-zinc-400 lg:inline'>Vendedor</span>

                <span className='font-medium'>{order.sellerName}</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    )
  }

  const labelComponent = () => {
    return (
      <div className='flex justify-start w-full gap-2 lg:text-start'>
        <span className='text-xs text-zinc-400 w-[10%] lg:hidden'>Pedido</span>
        <span className='text-xs text-zinc-400 w-[30%] lg:w-[60%]'>Cliente</span>
        <div className='flex w-[60%] lg:flex-col lg:w-[40%] gap-4'>
          <span className='text-xs text-zinc-400 w-[30%] lg:w-full '>Data</span>
          <span className='text-xs text-zinc-400 w-[40%] lg:hidden'>Total</span>
          <span className='text-xs text-zinc-400 w-[30%] lg:hidden'>Vendedor</span>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className='flex items-center justify-between w-full'>
        <h1 className='text-2xl font-medium'>Pedidos</h1>
        <Link
          to='/order'
          className='flex items-center self-end justify-between gap-4 p-4 text-xl font-bold text-blue-600 bg-white rounded-md shadow-md'
        >
          <IoMdAdd /> Novo
        </Link>
      </div>
      <div className=' bg-white shadow-md max-h-[75vh] rounded-md overflow-hidden my-10'>
        <div className='flex flex-col gap-4 p-8 overflow-y-scroll rounded-md max-h-[75vh]'>
          <div className='flex flex-col gap-4'>
            {orders.length === 0 ? (
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

            {orders.length > 0 && !search && labelComponent()}
            {search && filteredOrdersName.length > 0 && labelComponent()}
            {search && filteredOrdersOrderId.length > 0 && labelComponent()}

            {search &&
              filteredOrdersName.length > 0 &&
              filteredOrdersName
                .sort((a, b) => Number(b.orderId) - Number(a.orderId))
                .map((order) => linkComponent(order))}

            {search &&
              filteredOrdersOrderId.length > 0 &&
              filteredOrdersOrderId
                .sort((a, b) => Number(b.orderId) - Number(a.orderId))
                .map((order) => linkComponent(order))}

            {search && !filteredOrdersName && !filteredOrdersOrderId && (
              <p className='w-full text-center text-black my-[5rem]'>Nenhum pedido encontrado.</p>
            )}

            {!search &&
              orders
                ?.sort((a, b) => Number(b.orderId) - Number(a.orderId))
                .map((order) => linkComponent(order))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Orders

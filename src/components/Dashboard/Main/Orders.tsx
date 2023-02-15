import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { Link } from 'react-router-dom'

import { useFetchCollection } from '../../../hooks/fetchData/useFetchCollection'
import { useFormatDate } from '../../../hooks/formatData/useFormatDate'
import { useFormatValue } from '../../../hooks/formatData/useFormatValue'
import { IOrder } from '../../../interfaces'

// import './Main.css'

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
      <Link to={`${order.id}`} className='cardsContainer__card' key={order.id}>
        <span className='cardsContainer__text w-[10%]'>{order.orderId}</span>
        <span className='cardsContainer__text w-[50%]'>{order.clientName}</span>
        <span className='cardsContainer__text w-[30%]'>
          {order.createdAt && formatDate(order.createdAt)}
        </span>
        <span className='cardsContainer__text w-[30%]'>
          {order.total && formatValue(+order.total)}
        </span>
        <span className='cardsContainer__text w-[20%]'>{order.sellerName}</span>
      </Link>
    )
  }

  const labelComponent = () => {
    return (
      <div className='labelContainer'>
        <span className='labelContainer__label w-[10%]'>Pedido</span>
        <span className='labelContainer__label w-[50%]'>Cliente</span>
        <span className='labelContainer__label w-[30%]'>Data</span>
        <span className='labelContainer__label w-[30%]'>Total</span>
        <span className='labelContainer__label w-[20%]'>Vendedor</span>
      </div>
    )
  }

  return (
    <>
      {/* <div className='flex items-center justify-between w-full'>
        <h1 className='text-2xl font-medium'>Pedidos</h1>
        <Link
          to='/order'
          className='flex items-center self-end justify-between gap-4 p-4 text-xl font-bold text-blue-600 bg-white rounded-md shadow-md'
        >
          <IoMdAdd /> Novo
        </Link>
      </div> */}
      <div className='mainContainer'>
        <div className='searchContainer'>
          <input
            type='text'
            className='searchContainer__input'
            placeholder='Pesquisar'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className='cardsContainer'>
          {orders.length === 0 && (
            <p className='cardsContainer__noData'>Nenhum pedido cadastrado.</p>
          )}

          {orders.length > 0 && !search && labelComponent()}
          {search && nameFilter.length > 0 && labelComponent()}
          {search && idFilter.length > 0 && labelComponent()}

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
    </>
  )
}

export default Orders

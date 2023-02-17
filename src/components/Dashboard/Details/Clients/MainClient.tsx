import { useState } from 'react'
import { useFetchCollection } from '../../../../hooks/fetchData/useFetchCollection'
import { useFormatDate } from '../../../../hooks/formatData/useFormatDate'
import { useFormatValue } from '../../../../hooks/formatData/useFormatValue'

import { Link, useParams } from 'react-router-dom'

import LabelComponent from '../../../GlobalComponents/LabelComponent'
import LinkComponent from '../../../GlobalComponents/LinkComponent'
import MessageComponent from '../../../GlobalComponents/MessageComponent'
import Search from '../../../GlobalComponents/Search'

import { IoMdAdd } from 'react-icons/io'

import { IOrder } from '../../../../interfaces'

const MainClient = () => {
  const [search, setSearch] = useState('')

  const { clientId } = useParams()
  const { formatDate } = useFormatDate()
  const { formatValue } = useFormatValue()
  const { clientOrders } = useFetchCollection(`clients/${clientId}/orders`)

  const idFilter =
    search.length > 0 ? clientOrders.filter((order) => String(order.orderId).includes(search)) : []

  const nameFilter =
    search.length > 0
      ? clientOrders.filter((order) =>
          order.clientName?.toLowerCase().includes(search.toLowerCase()),
        )
      : []

  const linkComponent = (order: IOrder) => {
    return (
      <LinkComponent id={order.id || ''} key={order.id}>
        <span className='w-[15%]'>{order.orderId}</span>
        <span className='w-[20%]'>{order.createdAt?.seconds && formatDate(order.createdAt)}</span>
        <span className='w-[35%]'>{order.deadline}</span>
        <span className='w-[10%]'>{order.industryName}</span>
        <span className='w-[15%]'>{order.total && formatValue(+order.total)}</span>
      </LinkComponent>
    )
  }

  const labelComponent = () => {
    return (
      <LabelComponent>
        <span className='w-[15%]'>Pedido</span>
        <span className='w-[20%]'>Data</span>
        <span className='w-[35%]'>Prazo</span>
        <span className='w-[10%]'>Indústria</span>
        <span className='w-[15%]'>Total</span>
      </LabelComponent>
    )
  }

  return (
    <div className='max-w-[1400px] w-full'>
      <div className='flex items-center justify-between w-full gap-2 p-2 bg-dark-100'>
        <Search search={search} setSearch={setSearch} />

        <Link
          to='/order'
          className='relative flex items-center justify-between gap-2 px-4 py-2 font-bold bg-blue-600 rounded-lg text-gray-50'
        >
          <IoMdAdd /> Novo
        </Link>
      </div>

      {!search && clientOrders.length === 0 && (
        <MessageComponent text='Nenhum pedido cadastrado.' />
      )}

      {search && nameFilter.length === 0 && idFilter.length === 0 && (
        <MessageComponent text='Nenhum pedido encontrado.' />
      )}

      <div className='h-[calc(100vh-130px)] flex flex-col items-start w-full gap-2 p-2 overflow-auto'>
        {clientOrders.length > 0 && !search && labelComponent()}
        {search && nameFilter.length > 0 && labelComponent()}
        {search && idFilter.length > 0 && labelComponent()}

        {!search &&
          clientOrders
            .sort((a, b) => Number(b.orderId) - Number(a.orderId))
            .map((order) => linkComponent(order))}
        {search &&
          idFilter.length > 0 &&
          idFilter
            .sort((a, b) => Number(b.orderId) - Number(a.orderId))
            .map((order) => linkComponent(order))}

        {search &&
          nameFilter.length > 0 &&
          nameFilter
            .sort((a, b) => Number(b.orderId) - Number(a.orderId))
            .map((order) => linkComponent(order))}
      </div>
    </div>
  )
}

export default MainClient
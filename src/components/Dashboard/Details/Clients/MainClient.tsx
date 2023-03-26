import { useState } from 'react'
import { useFormatDate } from '../../../../hooks/formatData/useFormatDate'
import { useFormatValue } from '../../../../hooks/formatData/useFormatValue'
import { useFetchDocument } from '../../../../hooks/fetchData/useFetchDocument'

import { Link, useParams } from 'react-router-dom'

import LabelComponent from '../../../GlobalComponents/LabelComponent'
import LinkComponent from '../../../GlobalComponents/LinkComponent'
import MessageComponent from '../../../GlobalComponents/MessageComponent'

import { IoMdAdd } from 'react-icons/io'

import { IOrder } from '../../../../interfaces'
import AddDiscount from './AddDiscount'

const MainClient = () => {
  const { clientId } = useParams()
  const { formatDate } = useFormatDate()
  const { formatValue } = useFormatValue()

  const { document: client } = useFetchDocument('clients', clientId)

  const linkComponent = (order: IOrder, index: number) => {
    return (
      <LinkComponent id={`/orders/${order.id || ''}`} key={index}>
        <span className='w-[15%]'>{order.orderId?.toUpperCase()}</span>
        <span className='w-[20%]'>{order.createdAt?.seconds && formatDate(order.createdAt)}</span>
        <span className='w-[35%]'>{order.deadline}</span>
        <span className='w-[10%]'>{order.industryName?.toUpperCase()}</span>
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
      <div className='flex items-center justify-end w-full gap-2 p-2 bg-dark-100'>
        {/* <Link
          to='/order'
          className='relative flex items-center justify-between gap-2 px-4 py-2 font-bold bg-blue-600 rounded-lg text-gray-50'
        >
          <IoMdAdd /> Novo
        </Link> */}
        <AddDiscount />
      </div>

      {client?.orders?.length === 0 && <MessageComponent text='Nenhum pedido cadastrado.' />}

      <div className='h-[calc(100vh-130px)] flex flex-col items-start w-full gap-2 p-2 overflow-auto'>
        {client?.orders?.length > 0 && labelComponent()}

        {client?.orders &&
          client?.orders
            .sort((a: any, b: any) => Number(b.orderId) - Number(a.orderId))
            .map((order: IOrder, index: number) => linkComponent(order, index))}
      </div>
    </div>
  )
}

export default MainClient

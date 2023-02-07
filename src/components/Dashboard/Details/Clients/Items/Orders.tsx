import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useFetchCollection } from '../../../../../hooks/fetchData/useFetchCollection'
import { useFormatDate } from '../../../../../hooks/handleData/useFormatDate'
import { useFormatValue } from '../../../../../hooks/handleData/useFormatValue'

import { IOrder } from '../../../../../interfaces'

interface DataProps {
  order: IOrder
}

const Orders = ({ order }: DataProps) => {
  const { orders } = useFetchCollection('orders')
  const { formatDate } = useFormatDate()
  const { formatValue } = useFormatValue()

  const [orderTrueId, setOrderTrueId] = useState<IOrder[]>([])

  useEffect(() => {
    if (orders) {
      setOrderTrueId(orders.filter((orderFilter) => orderFilter.orderId === order.orderId))
    }
  }, [orders])

  const linkComponent = (order: IOrder) => {
    return (
      <div className='flex items-center justify-between w-full gap-4' key={order.id}>
        <Link
          to={`/orders/${orderTrueId.length > 0 && orderTrueId[0].id}`}
          key={order.id}
          className='flex w-full gap-2 p-4 text-black transition-all duration-200 rounded-md cursor-pointer  hover:bg-zinc-200 border-b-[1px] border-b-zinc-200'
        >
          <div className='flex flex-col'>
            <span className='text-xs text-zinc-400'>Pedido</span>
            <span className='font-medium'>{order.orderId}</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-xs text-zinc-400'>Data</span>
            <span className='font-medium'>
              {order.createdAt?.seconds && formatDate(order.createdAt)}
            </span>
          </div>
          <div className='flex flex-col'>
            <span className='text-xs text-zinc-400'>Indústria</span>
            <span className='font-medium'>{order.industryName}</span>
          </div>
          <div className='flex gap-2'>
            <span className='text-xs text-zinc-400'>Valor Uni.</span>
            <span className='font-medium'>{order.total && formatValue(+order.total)}</span>
          </div>
          <div className='flex gap-2'>
            <span className='text-xs text-zinc-400'>Total</span>
            <span className='font-medium'>{order.total && formatValue(+order.total)}</span>
          </div>
        </Link>
      </div>
    )
  }

  return <div className='flex flex-col gap-4'>{linkComponent(order)}</div>
}

export default Orders

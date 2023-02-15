import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useFetchCollection } from '../../../../../hooks/fetchData/useFetchCollection'
import { useFormatDate } from '../../../../../hooks/formatData/useFormatDate'
import { useFormatValue } from '../../../../../hooks/formatData/useFormatValue'

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
      <Link
        to={`/orders/${orderTrueId.length > 0 && orderTrueId[0].id}`}
        key={order.id}
        className='flex items-center w-full gap-2 p-2 break-words bg-gray-900 rounded-lg lg:p-4 text-gray-50'
      >
        <span className='w-[15%]'>{order.orderId}</span>
        <span className='w-[20%]'>{order.createdAt?.seconds && formatDate(order.createdAt)}</span>
        <span className='w-[35%]'>{order.deadline}</span>
        <span className='w-[10%]'>{order.industryName}</span>
        <span className='w-[15%]'>{order.total && formatValue(+order.total)}</span>
      </Link>
    )
  }

  return linkComponent(order)
}

export default Orders

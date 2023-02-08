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

  console.log(order)

  const linkComponent = (order: IOrder) => {
    return (
      <div
        className='flex items-center justify-between w-full gap-4 lg:max-w-[450px]'
        key={order.id}
      >
        <Link
          to={`/orders/${orderTrueId.length > 0 && orderTrueId[0].id}`}
          key={order.id}
          className='flex w-full gap-4 p-4 text-black transition-all duration-200 rounded-md cursor-pointer hover:bg-zinc-200 border-b-[1px] border-b-zinc-200'
        >
          <span className='font-medium  w-[15%] lg:w-[25%] md:hidden'>{order.orderId}</span>
          <span className='font-medium w-[20%] lg:w-[25%] md:w-[50%]'>
            {order.createdAt?.seconds && formatDate(order.createdAt)}
          </span>
          <span className='font-medium w-[35%] break-words overflow-hidden lg:hidden'>
            {order.deadline}
          </span>
          <span className='font-medium w-[10%] lg:w-[25%] md:hidden'>{order.industryName}</span>
          <span className='font-medium w-[15%] lg:w-[25%] md:w-[50%]'>
            {order.total && formatValue(+order.total)}
          </span>
        </Link>
      </div>
    )
  }

  return <div className='flex flex-col gap-4'>{linkComponent(order)}</div>
}

export default Orders

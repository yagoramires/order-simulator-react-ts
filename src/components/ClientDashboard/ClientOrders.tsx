import { useContext, useState } from 'react'

import { useFetchCollection } from '../../hooks/fetchData/useFetchCollection'
import { useFormatDate } from '../../hooks/formatData/useFormatDate'
import { useFormatValue } from '../../hooks/formatData/useFormatValue'

import LinkComponent from '../GlobalComponents/LinkComponent'
import LabelComponent from '../GlobalComponents/LabelComponent'
import MessageComponent from '../GlobalComponents/MessageComponent'
import Search from '../GlobalComponents/SearchComponent'

import { IOrder } from '../../interfaces'
import LoadMoreBtn from '../GlobalComponents/LoadMoreBtn'
import { AuthContext } from '../../context/AuthContext'

const Orders = () => {
  const { ordersFetch, fetchMore } = useFetchCollection('orders')
  const [result, setResult] = useState([])

  const { userData } = useContext(AuthContext)

  const { formatDate } = useFormatDate()
  const { formatValue } = useFormatValue()

  const linkComponent = (order: IOrder) => {
    return (
      <LinkComponent id={`orders/${order.id}` || ''} key={order.id}>
        <span className='w-[15%]'>{order.orderId}</span>
        <span className='w-[45%]'>{order.clientName?.toUpperCase()}</span>
        <div className='w-[40%] flex gap-2'>
          <span className='w-[50%]'>{order.createdAt && formatDate(order.createdAt)}</span>
          <span className='w-[50%]'>{order.total && formatValue(+order.total)}</span>
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
          <span className='w-[50%]'>Data</span>
          <span className='w-[50%]'>Total</span>
        </div>
      </LabelComponent>
    )
  }

  return (
    <div className='max-w-[1400px] w-full'>
      <div className='flex items-start justify-center w-full p-2 bg-dark-100'>
        <Search type='orders' collection='orders' setResult={setResult} />
      </div>

      {userData && userData.uid && (
        <div className='h-[calc(100vh-110px)] flex flex-col items-start w-full gap-2 p-2 overflow-auto'>
          {result.length === 0 && ordersFetch.length === 0 && (
            <MessageComponent
              text='Nenhum pedido
          cadastrado.'
            />
          )}
          {ordersFetch.length > 0 && result.length === 0 && labelComponent()}
          {result.length > 0 && labelComponent()}

          {ordersFetch.length > 0 &&
            result.length === 0 &&
            ordersFetch?.map((order: IOrder) =>
              order.clientId === userData.uid ? linkComponent(order) : '',
            )}

          {result.length > 0 &&
            result.map((order: IOrder) =>
              order.clientId === userData.uid ? linkComponent(order) : '',
            )}
        </div>
      )}

      {result.length === 0 && ordersFetch.length % 25 === 0 && (
        <LoadMoreBtn fetchMore={fetchMore} />
      )}
    </div>
  )
}

export default Orders

import { useState, useEffect } from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import { getOrders } from '../services/api'

interface OrderDetailsProps {
  id: number
  industry: string
  client: string
  total: number
  products: Array<{
    id: number
    name: string
    code: string
    price: number
    quantity: number
  }>
}

const OrderDetails = () => {
  const [orders, setOrders] = useState<OrderDetailsProps[]>([])
  const [order, setOrder] = useState<OrderDetailsProps>()

  const { orderId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      const ordersRequest = await getOrders()
      setOrders(ordersRequest.data)
    })()
  }, [])

  useEffect(() => {
    const filterOrder = orders.filter((order) => `${order.id}` === orderId)
    const order = filterOrder[0]
    setOrder(order)
  }, [orders, orderId])

  if (!order) return <p>loading</p>

  return (
    <main className='bg-gradient-to-r from-blue-800 to-blue-600 h-[100vh] flex justify-center items-center'>
      <div className='h-[80vh] w-[90%] bg-white p-8 flex flex-col gap-4 rounded-md shadow-md'>
        <button
          onClick={() => navigate(-1)}
          className='flex items-center justify-end w-full font-medium text-blue-600'
        >
          <MdKeyboardArrowLeft size={20} />
          Voltar
        </button>
        <div className='flex flex-col '>
          <span className='text-xs text-zinc-400'>Cliente</span>
          <span className='font-bold'>{order.client}</span>
        </div>
        <div className='flex flex-col gap-1'>
          <span className='text-xs text-zinc-400'>Fábrica</span>
          <span className='font-bold'>{order.industry}</span>
        </div>
        <div className='flex flex-col gap-1'>
          <span className='text-xs text-zinc-400'>Data</span>
          <span className='font-bold'>{order.client}</span>
        </div>
        <div className='flex flex-col gap-1'>
          <span className='text-xs text-zinc-400'>Total do Pedido</span>
          <span className='font-bold'>
            {order.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
        </div>
        <span className='text-xs text-zinc-400'>Produtos</span>
        <div className='flex flex-col gap-4 p-4 overflow-y-scroll rounded-md shadow-md bg-gradient-to-r from-blue-800 to-blue-600'>
          {order.products.map((product) => (
            <div key={product.id} className='flex p-4 bg-white rounded-md shadow-md md:flex-col'>
              <div className='flex gap-2 w-[60%] md:w-full'>
                <div className='flex flex-col gap-1 w-[30%]'>
                  <span className='text-xs text-zinc-400'>Código</span>
                  <span className='text-xs font-medium text-zinc-800'>{product.code}</span>
                </div>
                <div className='flex flex-col gap-1 w-[70%]'>
                  <span className='text-xs text-zinc-400'>Produto</span>
                  <span className='text-sm font-medium md:text-xs text-zinc-800'>
                    {product.name}
                  </span>
                </div>
              </div>
              <div className='flex w-[40%] md:w-full gap-4'>
                <div className='flex flex-col gap-1 w-[33.33%]'>
                  <span className='text-xs text-zinc-400'>Qnt.</span>
                  <span className='text-sm font-medium md:text-xs text-zinc-800'>
                    {product.quantity}
                  </span>
                </div>
                <div className='flex flex-col gap-1 w-[33.33%]'>
                  <span className='text-xs text-zinc-400'>Vlr. Un.</span>
                  <span className='text-sm font-medium md:text-xs text-zinc-800'>
                    {product.price.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </span>
                </div>
                <div className='flex flex-col gap-1 w-[33.33%]'>
                  <span className='text-xs text-zinc-400'>Vlr. Total</span>
                  <span className='text-sm font-medium md:text-xs text-zinc-800'>
                    {(product.quantity * product.price).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default OrderDetails

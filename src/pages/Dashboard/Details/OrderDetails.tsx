import { useEffect, useState } from 'react'
import { useFetchDocument } from '../../../hooks/fetchData/useFetchDocument'
import { useFetchCollection } from '../../../hooks/fetchData/useFetchCollection'
import { useFormatDate } from '../../../hooks/handleData/useFormatDate'

import { Link, useNavigate, useParams } from 'react-router-dom'

import Loading from '../../../components/Loading'

import { MdKeyboardArrowLeft } from 'react-icons/md'
import { useFormatValue } from '../../../hooks/handleData/useFormatValue'

const OrderDetails = () => {
  const navigate = useNavigate()

  const { orderId } = useParams()

  const { document: order, loading } = useFetchDocument('orders', orderId)

  console.log(order)

  const { formatValue } = useFormatValue()
  const { formatDate } = useFormatDate()

  if (loading || !order)
    return (
      <div className='min-h-[100vh] bg-gradient-to-r from-blue-800 to-blue-600 justify-center items-center flex'>
        <Loading size={'60px'} />
      </div>
    )

  return (
    <main className='bg-gradient-to-r from-blue-800 to-blue-600 h-[100vh] flex justify-center items-center'>
      <div className='w-[90%] max-w-[1200px] bg-white flex  rounded-md shadow-md max-h-[90vh] items-center overflow-hidden'>
        <div className='w-full bg-white p-8 flex flex-col gap-4 max-h-[90vh] items-center overflow-y-scroll'>
          <button
            onClick={() => navigate(-1)}
            className='flex items-center justify-end w-full font-medium text-blue-600'
          >
            <MdKeyboardArrowLeft size={30} />
            Voltar
          </button>

          <div className='flex flex-col gap-4 w-full max-w-[800px]'>
            <label className='flex flex-col gap-1'>
              <span className='md:md:text-xs text-zinc-400'>Número do pedido</span>
              <span className='text-sm text-black'>{order.orderId}</span>
            </label>
            <label className='flex flex-col gap-1'>
              <span className='md:md:text-xs text-zinc-400'>Razão Social</span>
              <span className='text-sm text-black'>{order.clientName}</span>
            </label>
            <label className='flex flex-col gap-1'>
              <span className='md:text-xs text-zinc-400'>CNPJ</span>
              <span className='text-sm text-black'>{order.clientCnpj}</span>
            </label>
            <label className='flex flex-col gap-1'>
              <span className='md:text-xs text-zinc-400'>Prazo de pagamento</span>
              <span className='text-sm text-black'>{order.deadline}</span>
            </label>
            <label className='flex flex-col gap-1'>
              <span className='md:text-xs text-zinc-400'>Indústria</span>
              <span className='text-sm text-black'>{order.industryName}</span>
            </label>
            <label className='flex flex-col gap-1'>
              <span className='md:text-xs text-zinc-400'>Vendedor</span>
              <span className='text-sm text-black'>{order.sellerId}</span>
            </label>
            <label className='flex flex-col gap-1'>
              <span className='md:text-xs text-zinc-400'>Total do pedido</span>
              <span className='text-sm text-black'>
                {order.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </label>
          </div>

          {order.length > 0 && (
            <div className='flex flex-col gap-4 overflow-y-scroll rounded-md max-h-[600px] w-full'>
              {order?.products?.map((product: any) => (
                <Link
                  to={`/industries/${order.industryId}/${product.id}`}
                  className='flex justify-between w-full gap-4 p-2 rounded-md bg-zinc-200'
                  key={product.id}
                >
                  <div className='flex flex-col items-start justify-center w-[70%]  md:w-full'>
                    <span className='text-xs text-zinc-400'>Produto</span>
                    <span className='text-sm'>{product.name}</span>
                  </div>
                  <div className='flex md:hidden w-[30%] gap-4'>
                    <div className='flex flex-col items-start justify-center'>
                      <span className='text-xs text-zinc-400'>Vlr. un.</span>
                      <span className='text-sm'>{formatValue(product.price)}</span>
                    </div>
                    <div className='flex flex-col items-start justify-center'>
                      <span className='text-xs text-zinc-400'>Quantidade</span>
                      <span className='text-sm'>{product.qnt}</span>
                    </div>
                    <div className='flex flex-col items-start justify-center'>
                      <span className='text-xs text-zinc-400'>Total</span>
                      <span className='text-sm'>{formatValue(product.total)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default OrderDetails

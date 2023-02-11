import { useFetchDocument } from '../../../hooks/fetchData/useFetchDocument'
import { useFormatDate } from '../../../hooks/formatData/useFormatDate'

import { Link, useNavigate, useParams } from 'react-router-dom'

import Loading from '../../../components/Loading'
import Alert from '../../../components/Dashboard/Alert'

import { MdKeyboardArrowLeft } from 'react-icons/md'
import { useFormatValue } from '../../../hooks/formatData/useFormatValue'
import { IProduct } from '../../../interfaces'
import { useDeleteDoc } from '../../../hooks/handleData/useDeleteDoc'

const OrderDetails = () => {
  const navigate = useNavigate()

  const { orderId } = useParams()

  const { document: order, loading } = useFetchDocument('orders', orderId)

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
            <MdKeyboardArrowLeft size={20} />
            Voltar
          </button>
          <div className='flex flex-col gap-2 w-full max-w-[800px]'>
            <div className='flex flex-col gap-1'>
              <span className='md:md:text-xs text-zinc-400'>Número do pedido</span>
              <span className='text-sm text-black'>{order.orderId}</span>
            </div>
            <div className='flex flex-col gap-1'>
              <span className='md:md:text-xs text-zinc-400'>Data</span>
              <span className='text-sm text-black'>{formatDate(order.createdAt)}</span>
            </div>
            <div className='flex flex-col gap-1'>
              <span className='md:md:text-xs text-zinc-400'>Razão Social</span>
              <span className='text-sm text-black'>{order.clientName}</span>
            </div>
            <div className='flex flex-col gap-1'>
              <span className='md:md:text-xs text-zinc-400'>Razão Social</span>
              <span className='text-sm text-black'>{order.clientName}</span>
            </div>
            <div className='flex flex-col gap-1'>
              <span className='md:text-xs text-zinc-400'>CNPJ</span>
              <span className='text-sm text-black'>{order.clientCnpj}</span>
            </div>
            <div className='flex flex-col gap-1'>
              <span className='md:text-xs text-zinc-400'>Prazo de pagamento</span>
              <span className='text-sm text-black'>{order.deadline}</span>
            </div>
            <div className='flex flex-col gap-1'>
              <span className='md:text-xs text-zinc-400'>Indústria</span>
              <span className='text-sm text-black'>{order.industryName}</span>
            </div>
            <div className='flex flex-col gap-1'>
              <span className='md:text-xs text-zinc-400'>Vendedor</span>
              <span className='text-sm text-black'>{order.sellerId}</span>
            </div>
            <div className='flex flex-col gap-1'>
              <span className='md:text-xs text-zinc-400'>Total do pedido</span>
              <span className='text-sm text-black'>{formatValue(order.total)}</span>
            </div>
          </div>
          <div className='w-full max-w-[800px] overflow-hidden rounded-md'>
            {order && (
              <div className='w-full overflow-y-scroll max-h-[200px] max-w-[800px] bg-zinc-200 rounded-md flex flex-col gap-2 p-2'>
                {order?.products?.map((product: IProduct) => (
                  <Link
                    to={`/industries/${order.industryId}/${product.id}`}
                    className='w-full p-2 bg-white rounded-md'
                    key={product.id}
                  >
                    <div className='flex flex-col items-start justify-center w-[70%]  md:w-full'>
                      <span className='text-xs text-zinc-400'>Produto</span>
                      <span className='text-sm'>{product.name}</span>
                    </div>
                    <div className='flex md:hidden w-[30%] gap-4'>
                      <div className='flex flex-col items-start justify-center'>
                        <span className='text-xs text-zinc-400'>Vlr. un.</span>
                        <span className='text-sm'>
                          {product.price && formatValue(product.price)}
                        </span>
                      </div>
                      <div className='flex flex-col items-start justify-center'>
                        <span className='text-xs text-zinc-400'>Quantidade</span>
                        <span className='text-sm'>{product.quantity}</span>
                      </div>
                      <div className='flex flex-col items-start justify-center'>
                        <span className='text-xs text-zinc-400'>Total</span>
                        <span className='text-sm'>
                          {product.total && formatValue(product.total)}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Alert data={{ type: 'order', id: orderId || '', collectionId: order.clientId }} />
        </div>
      </div>
    </main>
  )
}

export default OrderDetails

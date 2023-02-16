import { useFetchDocument } from '../../../hooks/fetchData/useFetchDocument'
import { useFormatDate } from '../../../hooks/formatData/useFormatDate'

import { Link, useNavigate, useParams } from 'react-router-dom'

import Loading from '../../../components/Loading'
import Alert from '../../../components/Dashboard/Alert'

import { MdKeyboardArrowLeft } from 'react-icons/md'
import { useFormatValue } from '../../../hooks/formatData/useFormatValue'
import { IProduct } from '../../../interfaces'

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
    <div className='h-[100vh] flex flex-col justify-start items-center p-2 w-full overflow-auto'>
      <div className='max-w-[800px] w-full lg:p-8'>
        <button
          onClick={() => navigate(-1)}
          className='flex items-center justify-end w-full mb-8 font-medium text-gray-50'
        >
          <MdKeyboardArrowLeft size={20} />
          Voltar
        </button>

        <div className='flex flex-col gap-2 w-full max-w-[800px]'>
          <div className='flex flex-col gap-1'>
            <span className='text-sm text-gray-700'>Número do pedido</span>
            <span className='text-gray-50'>{order.orderId}</span>
          </div>
          <div className='flex flex-col gap-1'>
            <span className='text-sm text-gray-700'>Data</span>
            <span className='text-gray-50'>{formatDate(order.createdAt)}</span>
          </div>
          <div className='flex flex-col gap-1'>
            <span className='text-sm text-gray-700'>Razão Social</span>
            <span className='text-gray-50'>{order.clientName}</span>
          </div>
          <div className='flex flex-col gap-1'>
            <span className='text-sm text-gray-700'>Razão Social</span>
            <span className='text-gray-50'>{order.clientName}</span>
          </div>
          <div className='flex flex-col gap-1'>
            <span className='text-sm text-gray-700'>CNPJ</span>
            <span className='text-gray-50'>{order.clientCnpj}</span>
          </div>
          <div className='flex flex-col gap-1'>
            <span className='text-sm text-gray-700'>Prazo de pagamento</span>
            <span className='text-gray-50'>{order.deadline}</span>
          </div>
          <div className='flex flex-col gap-1'>
            <span className='text-sm text-gray-700'>Indústria</span>
            <span className='text-gray-50'>{order.industryName}</span>
          </div>
          <div className='flex flex-col gap-1'>
            <span className='text-sm text-gray-700'>Vendedor</span>
            <span className='text-gray-50'>{order.sellerId}</span>
          </div>
          <div className='flex flex-col gap-1'>
            <span className='text-sm text-gray-700'>Total do pedido</span>
            <span className='text-gray-50'>{formatValue(order.total)}</span>
          </div>
        </div>

        <div className='w-full mt-4 overflow-hidden break-words bg-gray-900 rounded-md text-gray-50'>
          {order && (
            <div className='w-full overflow-y-scroll max-h-[600px] rounded-lg flex flex-col gap-2 p-2 productsScroll'>
              <div className='flex items-start justify-center gap-2 px-2 text-gray-700'>
                <span className='text-xs w-[50%]'>Produto</span>
                <span className='text-xs w-[15%]'>Vlr. un.</span>
                <span className='text-xs w-[15%]'>Quantidade</span>
                <span className='text-xs w-[20%]'>Total</span>
              </div>

              {order?.products?.map((product: IProduct) => (
                <Link
                  to={`/industries/${order.industryId}/${product.id}`}
                  className='flex items-start justify-center w-full gap-2 p-2 px-2 bg-white rounded-md'
                  key={product.id}
                >
                  <span className='text-sm w-[50%]'>{product.name}</span>
                  <span className='text-sm w-[15%]'>
                    {product.price && formatValue(product.price)}
                  </span>
                  <span className='text-sm w-[15%]'>{product.quantity}</span>
                  <span className='text-sm w-[20%]'>
                    {product.total && formatValue(product.total)}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className='flex justify-center w-full my-4'>
          <Alert data={{ type: 'order', id: orderId || '', collectionId: order.clientId }} />
        </div>
      </div>
    </div>
  )
}

export default OrderDetails

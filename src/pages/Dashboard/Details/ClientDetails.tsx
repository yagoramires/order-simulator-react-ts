import { useEffect, useState } from 'react'
import { useFetchDocument } from '../../../hooks/fetchData/useFetchDocument'
import { useFetchCollection } from '../../../hooks/fetchData/useFetchCollection'
import { useFormatDate } from '../../../hooks/handleData/useFormatDate'

import { Link, useNavigate, useParams } from 'react-router-dom'

import Loading from '../../../components/Loading'

import { MdKeyboardArrowLeft } from 'react-icons/md'

const ClientDetails = () => {
  const navigate = useNavigate()

  const { clientId } = useParams()

  const { document: client, loading } = useFetchDocument('clients', clientId)
  const { clientOrders } = useFetchCollection(`clients/${clientId}/orders`)

  const [socialName, setSocialName] = useState('')
  const [fantasyName, setFantasyName] = useState('')
  const [network, setNetwork] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [discount, setDiscount] = useState(0)

  useEffect(() => {
    if (client) {
      setSocialName(client?.socialName)
      setFantasyName(client?.fantasyName)
      setNetwork(client?.network)
      setCnpj(client?.cnpj)
      setDiscount(client?.discount)
    }
  }, [client])

  const { formatDate } = useFormatDate()

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log('teste')
  }

  if (loading || !client)
    return (
      <div className='min-h-[100vh] bg-gradient-to-r from-blue-800 to-blue-600 justify-center items-center flex'>
        <Loading size={'60px'} />
      </div>
    )

  return (
    <main className='bg-gradient-to-r from-blue-800 to-blue-600 h-[100vh] flex justify-center items-center'>
      <div className='w-[90%] max-w-[1200px] bg-white p-8 flex flex-col gap-4 rounded-md shadow-md h-[90vh] items-center '>
        <button
          onClick={() => navigate(-1)}
          className='flex items-center justify-end w-full font-medium text-blue-600'
        >
          <MdKeyboardArrowLeft size={40} />
          Voltar
        </button>

        <form className='flex flex-col gap-4 w-full max-w-[800px]' onSubmit={handleUpdate}>
          <label className='flex flex-col gap-1'>
            <span className='md:md:text-xs text-zinc-400'>Razão Social</span>
            <input
              type='text'
              value={socialName}
              onChange={(e) => setSocialName(e.target.value)}
              className='p-2 rounded-md shadow-sm bg-zinc-200'
            />
          </label>
          <label className='flex flex-col gap-1'>
            <span className='md:text-xs text-zinc-400'>Nome Fantasia</span>
            <input
              type='text'
              value={fantasyName}
              onChange={(e) => setFantasyName(e.target.value)}
              className='p-2 rounded-md shadow-sm bg-zinc-200'
            />
          </label>
          <label className='flex flex-col gap-1'>
            <span className='md:text-xs text-zinc-400'>CNPJ</span>
            <input
              type='text'
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              className='p-2 rounded-md shadow-sm bg-zinc-200'
            />
          </label>
          <label className='flex flex-col gap-1'>
            <span className='md:text-xs text-zinc-400'>Rede</span>
            <input
              type='text'
              value={network}
              onChange={(e) => setNetwork(e.target.value)}
              className='p-2 rounded-md shadow-sm bg-zinc-200'
            />
          </label>
          <label className='flex flex-col gap-1'>
            <span className='md:text-xs text-zinc-400'>Desconto</span>
            <input
              type='number'
              value={discount}
              onChange={(e) => setDiscount(+e.target.value)}
              className='p-2 rounded-md shadow-sm bg-zinc-200'
            />
          </label>
          <input
            type='submit'
            className='p-2 mt-4 font-medium text-white rounded-md shadow-sm cursor-pointer bg-gradient-to-r from-blue-800 to-blue-600 hover:bg-none hover:bg-blue-500'
            value='Atualizar'
          />
        </form>

        <div className=' w-full max-w-[800px] max-h-[600px] mt-4 bg-zinc-300 rounded-md overflow-hidden'>
          <div className='flex flex-col gap-4 p-4 overflow-y-scroll rounded-md max-h-[600px]'>
            {clientOrders?.map((order) => (
              <Link
                to={`/orders/${order.id}`}
                className='flex justify-between w-full p-2 bg-white rounded-md'
                key={order.id}
              >
                <div className='flex flex-col items-center justify-center w-[15%]'>
                  <span className='text-xs text-zinc-400'>Pedido</span>
                  <span className='text-sm'>{order.orderId}</span>
                </div>
                <div className='flex flex-col items-center justify-center w-[15%]'>
                  <span className='text-xs text-zinc-400'>Data de emissão</span>
                  <span className='text-sm'>{formatDate(order.createdAt?.seconds || 0)}</span>
                </div>
                <div className='flex flex-col items-center justify-center w-[10%]'>
                  <span className='text-xs text-zinc-400'>Indústria</span>
                  <span className='text-sm'>{order.industryName}</span>
                </div>
                <div className='flex flex-col items-center justify-center w-[10%]'>
                  <span className='text-xs text-zinc-400'>Total</span>
                  <span className='text-sm'>{order.total}</span>
                </div>
                <div className='flex flex-col items-center justify-center w-[15%]'>
                  <span className='text-xs text-zinc-400'>Vendedor</span>
                  <span className='text-sm'>{order.sellerName}</span>
                </div>
                <div className='flex flex-col items-start justify-center w-[35%]'>
                  <span className='text-xs text-zinc-400'>Prazo de pagamento</span>
                  <span className='text-sm'>{order.deadline}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default ClientDetails

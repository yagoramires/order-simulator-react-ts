import { useEffect, useState } from 'react'
import { useFetchDocument } from '../../../hooks/fetchData/useFetchDocument'
import { useFetchCollection } from '../../../hooks/fetchData/useFetchCollection'

import { useNavigate, useParams } from 'react-router-dom'

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

  console.log(clientOrders)

  return (
    <main className='bg-gradient-to-r from-blue-800 to-blue-600 h-[100vh] flex justify-center items-center'>
      <div className=' w-[90%] max-w-[1200px] bg-white p-8 flex flex-col gap-4 rounded-md shadow-md h-[90vh] max-h-[600px] items-center '>
        <button
          onClick={() => navigate(-1)}
          className='flex items-center justify-end w-full font-medium text-blue-600'
        >
          <MdKeyboardArrowLeft size={40} />
          Voltar
        </button>

        <form className='flex flex-col gap-4 w-[90%] max-w-[800px]' onSubmit={handleUpdate}>
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

        <div>
          {clientOrders?.map((order) => (
            <div key={order.id}>
              <p>{order.clientName}</p>
              <p>{order.industryName}</p>

              <p>{order.sellerName}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default ClientDetails

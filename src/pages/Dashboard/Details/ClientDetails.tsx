// Router
import { useEffect, useState } from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import { getClients } from '../../../services/api'

interface ClientDetailsProps {
  id: number
  name: string
  cnpj: string
  discount: number
}

const ClientDetails = () => {
  const [clients, setClients] = useState<ClientDetailsProps[]>([])
  const [client, setClient] = useState<ClientDetailsProps>()

  const { clientId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      const clientsRequest = await getClients()
      setClients(clientsRequest.data)
    })()
  }, [])

  useEffect(() => {
    const filterClient = clients.filter((order) => `${order.id}` === clientId)
    const client = filterClient[0]
    setClient(client)
  }, [clients, clientId])

  if (!client) return <p>loading</p>

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
          <span className='font-bold'>{client.name}</span>
        </div>
        <div className='flex flex-col gap-1'>
          <span className='text-xs text-zinc-400'>CNPJ</span>
          <span className='font-bold'>{client.cnpj}</span>
        </div>
        <div className='flex flex-col gap-1'>
          <span className='text-xs text-zinc-400'>Rede</span>
          <span className='font-bold'>{client.name}</span>
        </div>
        <div className='flex flex-col gap-1'>
          <span className='text-xs text-zinc-400'>Desconto</span>
          <span className='font-bold'>{client.discount} %</span>
        </div>
        <span className='text-xs text-zinc-400'>Produtos</span>
        <div>pedidos</div>
      </div>
    </main>
  )
}

export default ClientDetails

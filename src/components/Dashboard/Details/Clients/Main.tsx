import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useFetchCollection } from '../../../../hooks/fetchData/useFetchCollection'

import Orders from './Items/Orders'

const Main = () => {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const { clientId } = useParams()
  const { clientOrders } = useFetchCollection(`clients/${clientId}/orders`)

  const filteredOrderId =
    search.length > 0 ? clientOrders.filter((order) => String(order.orderId).includes(search)) : []

  const filteredOrderName =
    search.length > 0
      ? clientOrders.filter((order) =>
          order.clientName?.toLowerCase().includes(search.toLowerCase()),
        )
      : []

  return (
    <main className='bg-gradient-to-r from-blue-800 to-blue-600 h-[100vh] w-full text-white p-8'>
      <div className='flex items-center justify-between w-full'>
        <h1 className='text-2xl font-medium'>Pedidos</h1>
        <Link
          to='/order'
          className='flex items-center self-end justify-between gap-4 p-4 text-xl font-bold text-blue-600 bg-white rounded-md shadow-md '
        >
          <IoMdAdd /> Novo
        </Link>
      </div>
      <div className=' bg-white shadow-md max-h-[75vh] rounded-md overflow-hidden my-10'>
        <div className='flex flex-col gap-4  p-8  overflow-y-scroll rounded-md max-h-[75vh]'>
          <span
            onClick={() => navigate(-1)}
            className='items-center justify-end hidden w-full text-sm font-bold text-blue-600 cursor-pointer md:flex'
          >
            <MdKeyboardArrowLeft size={20} />
            Voltar
          </span>
          {clientOrders.length === 0 ? (
            <p className='text-black'>Nenhum pedido cadastrado.</p>
          ) : (
            <input
              type='text'
              className='p-2 rounded-md shadow-sm bg-zinc-300'
              placeholder='Pesquisar'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          )}

          {search ||
            (clientOrders.length > 0 && (
              <div className='flex items-center justify-start w-full gap-4 p-4 text-start'>
                <span className='text-xs text-zinc-400 w-[15%] lg:w-[25%] md:hidden'>Pedido</span>
                <span className='text-xs text-zinc-400 w-[20%] lg:w-[25%] md:w-[50%]'>Data</span>
                <span className='text-xs text-zinc-400 w-[35%] lg:hidden'>Prazo</span>
                <span className='text-xs text-zinc-400 w-[10%] lg:w-[25%] md:hidden'>
                  Indústria
                </span>
                <span className='text-xs text-zinc-400 w-[15%] lg:w-[25%] md:w-[50%]'>Total</span>
              </div>
            ))}

          {search && filteredOrderId.length > 0
            ? filteredOrderId
                .sort((a, b) => Number(b.id) - Number(a.id))
                .map((order) => <Orders order={order} key={order.id} />)
            : filteredOrderName.length > 0
            ? filteredOrderName
                .sort((a, b) => Number(b.id) - Number(a.id))
                .map((order) => <Orders order={order} key={order.id} />)
            : search && <p className='text-black'>Nenhum produto encontrado.</p>}

          {!search &&
            clientOrders
              .sort((a, b) => Number(b.id) - Number(a.id))
              .map((order) => <Orders order={order} key={order.id} />)}
        </div>
      </div>
    </main>
  )
}

export default Main

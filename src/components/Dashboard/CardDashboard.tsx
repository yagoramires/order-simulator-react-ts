// Router
import { Link } from 'react-router-dom'

// Hooks
import { useFetchCollection } from '../../hooks/fetchData/useFetchCollection'

interface CardProps {
  type: string
}

const CardDashboard = ({ type }: CardProps) => {
  const { industries, clients, deadlines, orders } = useFetchCollection(type)

  const transform = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  const linkComponent = (path: string, children: React.ReactNode) => {
    return (
      <Link
        to={path}
        className='text-black border-b-[1px] border-b-zinc-200 p-2 rounded-md hover:bg-zinc-200 w-full'
      >
        {children}
      </Link>
    )
  }

  return (
    <div className='flex flex-col gap-4'>
      {type === 'orders' &&
        orders?.map((order) => (
          <div key={order.id}>
            {/* {linkComponent(
              order.id,
              <div className='flex items-center justify-between w-full gap-4' key={order.id}>
                <div className='flex flex-col w-[60%] md:w-[100%]'>
                  <span className='text-xs text-zinc-400'>Cliente</span>
                  <span className='font-medium'>{order.clientName}</span>
                </div>

                <div className='flex gap-2 w-[40%] md:w-[100%]'>
                  <div className='flex flex-col md:w-[33.33%] '>
                    <span className='text-xs text-zinc-400'>Pedido</span>
                    <span className='font-medium'>{order.id}</span>
                  </div>
                  <div className='flex flex-col md:w-[33.33%] '>
                    <span className='text-xs text-zinc-400'>Data</span>
                    <span className='font-medium'>{order.createdAt}</span>
                  </div>
                  <div className='flex flex-col md:w-[33.33%] '>
                    <span className='text-xs text-zinc-400'>Total</span>
                    <span className='font-medium'>{order.total && transform(+order.total)}</span>
                  </div>
                </div>
              </div>,
            )} */}
          </div>
        ))}
      {type === 'industries' &&
        industries?.map((industry) => (
          <div className='flex items-center justify-between w-full gap-4' key={industry.id}>
            {linkComponent(
              industry.id,
              <div className='flex items-center justify-between w-full gap-4'>
                <div className='flex flex-col w-full'>
                  <span className='text-xs text-zinc-400'>Indústria</span>
                  <span className='font-medium'>{industry.socialName}</span>
                </div>
                <div className='flex flex-col w-full lg:hidden'>
                  <span className='text-xs text-zinc-400'>CNPJ</span>
                  <span className='text-sm font-normal '>{industry.cnpj}</span>
                </div>
              </div>,
            )}
          </div>
        ))}
      {type === 'clients' &&
        clients?.map((client) => (
          <div className='flex items-center justify-between w-full gap-4' key={client.id}>
            {linkComponent(
              client.id,
              <div className='flex flex-col'>
                <span className='text-xs text-zinc-400'>Cliente</span>
                <span className='font-medium'>{client.socialName}</span>
              </div>,
            )}
          </div>
        ))}
      {type === 'deadlines' &&
        deadlines?.map((deadline) => (
          <div className='flex items-center justify-between w-full gap-4' key={deadline.id}>
            {linkComponent(
              deadline.id,
              <div className='flex flex-col'>
                <span className='text-xs text-zinc-400'>Prazo</span>
                <span className='font-medium'>{deadline.value}</span>
              </div>,
            )}
          </div>
        ))}
    </div>
  )
}

export default CardDashboard

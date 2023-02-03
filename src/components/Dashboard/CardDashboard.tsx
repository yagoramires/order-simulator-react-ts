// Hooks
import { useEffect, useState } from 'react'

// Router
import { Link } from 'react-router-dom'
import { useFetchCollection } from '../../hooks/useFetchCollection'

interface CardProps {
  type: string
}

const CardDashboard = ({ type }: CardProps) => {
  const { industries, clients, deadlines, orders } = useFetchCollection(type)

  const transform = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  return (
    <div className='flex flex-col gap-4'>
      {type === 'orders' &&
        orders?.map((order) => (
          <Link
            to={`${order.id}`}
            key={order.id}
            className='flex w-full gap-2 p-4 text-white transition-all duration-200 bg-blue-700 rounded-md shadow-md cursor-pointer lg:flex-col hover:bg-blue-600'
          >
            <div className='flex flex-col w-[60%] md:w-[100%]'>
              <span className='text-xs text-zinc-300'>Cliente</span>
              <span className='font-medium'>{order.clientName}</span>
            </div>

            <div className='flex gap-2 w-[40%] md:w-[100%]'>
              <div className='flex flex-col md:w-[33.33%] '>
                <span className='text-xs text-zinc-300'>Pedido</span>
                <span className='font-medium'>{order.id}</span>
              </div>
              <div className='flex flex-col md:w-[33.33%] '>
                <span className='text-xs text-zinc-300'>Data</span>
                <span className='font-medium'>{order.createdAt}</span>
              </div>
              <div className='flex flex-col md:w-[33.33%] '>
                <span className='text-xs text-zinc-300'>Total</span>
                <span className='font-medium'>{order.total && transform(+order.total)}</span>
              </div>
            </div>
          </Link>
        ))}
      {type === 'industries' &&
        industries?.map((industry) => (
          <Link
            to={`${industry.id}`}
            className='flex w-full gap-2 p-4 text-white transition-all duration-200 bg-blue-700 rounded-md cursor-pointer md:flex-col hover:bg-blue-600'
            key={industry.id}
          >
            <div className='flex items-center justify-between w-full gap-4'>
              <div className='flex flex-col w-full'>
                <span className='text-xs text-zinc-300'>Indústria</span>
                <span className='font-medium'>{industry.socialName}</span>
              </div>
              <div className='flex flex-col w-full lg:hidden'>
                <span className='text-xs text-zinc-300'>CNPJ</span>
                <span className='text-sm font-normal '>{industry.cnpj}</span>
              </div>
            </div>
          </Link>
        ))}
      {type === 'clients' &&
        clients?.map((client) => (
          <Link
            to={`${client.id}`}
            className='flex w-full gap-2 p-4 text-white transition-all duration-200 bg-blue-700 rounded-md cursor-pointer md:flex-col hover:bg-blue-600'
            key={client.id}
          >
            <div className='flex flex-col'>
              <span className='text-xs text-zinc-300'>Cliente</span>
              <span className='font-medium'>{client.socialName}</span>
            </div>
          </Link>
        ))}
      {type === 'deadlines' &&
        deadlines?.map((deadline) => (
          <Link
            to={`${deadline.id}`}
            key={deadline.id}
            className='flex w-full gap-2 p-4 text-white transition-all duration-200 bg-blue-700 rounded-md cursor-pointer md:flex-col hover:bg-blue-600'
          >
            <div className='flex flex-col'>
              <span className='text-xs text-zinc-300'>Prazo</span>
              <span className='font-medium'>{deadline.value}</span>
            </div>
          </Link>
        ))}
    </div>
  )
}

export default CardDashboard

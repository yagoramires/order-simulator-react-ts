// Hooks
import { useEffect, useState } from 'react'

// Router
import { Link } from 'react-router-dom'

interface ProductProps {
  product: {
    id: string
    code: string
    name: string
    industry: string
    price: number
  }
}

const CardDetails = ({ product }: ProductProps) => {
  const transform = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  return (
    <div className='flex flex-col gap-4'>
      <Link
        to={`${product.id}`}
        key={product.id}
        className='flex w-full gap-2 p-4 text-white transition-all duration-200 bg-blue-700 rounded-md cursor-pointer lg:flex-col hover:bg-blue-600'
      >
        <div className='flex flex-col w-[60%] md:w-[100%]'>
          <span className='text-xs text-zinc-300'>Nome</span>
          <span className='font-medium'>{product.name}</span>
        </div>

        <div className='flex gap-2 w-[40%] md:w-[100%]'>
          <div className='flex flex-col md:w-[33.33%] '>
            <span className='text-xs text-zinc-300'>Código</span>
            <span className='font-medium'>{product.code}</span>
          </div>
          <div className='flex flex-col md:w-[33.33%] '>
            <span className='text-xs text-zinc-300'>Indústria</span>
            <span className='font-medium'>{product.industry}</span>
          </div>
          <div className='flex flex-col md:w-[33.33%] '>
            <span className='text-xs text-zinc-300'>Valor Uni.</span>
            <span className='font-medium'>{product.price && transform(+product.price)}</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default CardDetails

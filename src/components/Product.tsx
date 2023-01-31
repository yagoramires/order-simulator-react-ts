import { useState, useEffect } from 'react'
import noImg from '../assets/no-image.jpg'

interface ProductProps {
  imagePath?: string
  name: string
  code: string
  value: number
}

const Product = (props: ProductProps) => {
  const [quantity, setQuantity] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setTotal(quantity * props.value)
  }, [quantity])

  return (
    <div className='flex max-h-40 items-center justify-between overflow-hidden bg-zinc-300 rounded-lg gap-2 border-[1px] border-zinc-400'>
      {props.imagePath ? (
        <img src={props.imagePath} alt={props.name} className='w-[100px]' />
      ) : (
        <img src={noImg} alt={props.name} className='lg:hidden w-[100px]' />
      )}
      <div className='flex lg:flex-col w-full justify-between p-4'>
        <div className='flex gap-2 w-full'>
          <div className='flex flex-col  text-start gap-1 w-[25%]'>
            <span className='text-xs text-zinc-500'>Código</span>
            <p className='font-medium mb-2'>{props.code}</p>
          </div>
          <div className='flex flex-col  text-start gap-1 w-[75%]'>
            <span className='text-xs text-zinc-500'>Nome</span>
            <p className='font-medium mb-2'>{props.name}</p>
          </div>
        </div>
        <div className='flex gap-4 lg:w-full w-[40%] justify-between items-center'>
          <div className='flex flex-col gap-1'>
            <span className='text-xs text-zinc-500'>Valor Unitário</span>
            <span className='min-w-[33.33%] p-2'>
              {props.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </div>
          <div className='flex flex-col w-[33.33%] max-w-[80px] text-center gap-1'>
            <span className='text-xs text-zinc-500'>Qnt.</span>
            <input
              type='number'
              value={quantity}
              onChange={(e) => setQuantity(+e.target.value)}
              className=' text-center p-2 rounded-md'
            />
          </div>
          <div className='flex flex-col gap-1 text-center'>
            <span className='text-xs text-zinc-500'>Valor Total</span>

            <span className='min-w-[33.33%]  p-2'>
              {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product

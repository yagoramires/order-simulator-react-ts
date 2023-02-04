// Hooks
import { useState, useEffect } from 'react'
import { MdNoPhotography } from 'react-icons/md'

interface ProductProps {
  product: {
    id?: string
    imagePath?: string
    code: string
    name: string
    industry?: string
    price: number
    family?: string
    createdAt?: Date
  }
}

const Product = ({ product }: ProductProps) => {
  const [quantity, setQuantity] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setTotal(quantity * product.price)
  }, [quantity])

  return (
    <div className='p-2 rounded-md border-b-[1px] border-b-zinc-300 flex justify-start gap-4 items-center'>
      <div className='w-[100px] lg:hidden text-blue-600 flex justify-center items-center'>
        {product.imagePath ? (
          <img src={product.imagePath} alt={product.name} />
        ) : (
          <MdNoPhotography size={30} />
        )}
      </div>
      <div className='text-xs font-bold text-zinc-700 w-[10%] md:w-[30%]'>{product.code}</div>
      <div className='text-xs text-zinc-700 w-[60%] md:w-[40%]'>{product.name}</div>
      <div className='flex w-[30%] items-center gap-4 md:flex-col'>
        <div className='text-xs  text-zinc-700 w-[50px]'>
          {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </div>
        <input
          type='number'
          value={quantity}
          onChange={(e) => setQuantity(+e.target.value)}
          className='p-2 text-xs text-center rounded-md bg-zinc-200  w-[80px]'
        />
        <div className='text-xs  text-zinc-700 w-[50px]'>
          {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </div>
      </div>
    </div>
  )
}

export default Product

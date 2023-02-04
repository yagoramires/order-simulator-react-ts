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
    // <div className='flex max-h-40 items-center justify-between overflow-hidden bg-zinc-300 rounded-lg gap-2 border-[1px] border-zinc-400'>
    //   {product.imagePath ? (
    //     <img src={product.imagePath} alt={product.name} className='w-[100px] lg:hidden' />
    //   ) : (
    //     <MdNoPhotography size={30} className='w-[100px] lg:hidden  text-blue-600' />
    //   )}
    //   <div className='flex justify-between w-full p-4 lg:flex-col'>
    //     <div className='flex w-full gap-2'>
    //       <div className='flex flex-col  text-start gap-1 w-[25%]'>
    //         <span className='text-xs text-zinc-500'>Código</span>
    //         <p className='mb-2 font-medium'>{product.code}</p>
    //       </div>
    //       <div className='flex flex-col  text-start gap-1 w-[75%]'>
    //         <span className='text-xs text-zinc-500'>Nome</span>
    //         <p className='mb-2 font-medium'>{product.name}</p>
    //       </div>
    //     </div>
    //     <div className='flex gap-4 lg:w-full w-[40%] justify-between items-center'>
    //       <div className='flex flex-col gap-1'>
    //         <span className='text-xs text-zinc-500'>Valor Unitário</span>
    //         <span className='min-w-[33.33%] p-2'>
    //           {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
    //         </span>
    //       </div>
    //       <div className='flex flex-col w-[33.33%] max-w-[80px] text-center gap-1'>
    //         <span className='text-xs text-zinc-500'>Qnt.</span>
    //         <input
    //           type='number'
    //           value={quantity}
    //           onChange={(e) => setQuantity(+e.target.value)}
    //           className='p-2 text-center rounded-md '
    //         />
    //       </div>
    //       <div className='flex flex-col gap-1 text-center'>
    //         <span className='text-xs text-zinc-500'>Valor Total</span>

    //         <span className='min-w-[33.33%]  p-2'>
    //           {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
    //         </span>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className='p-2 rounded-md border-b-[1px] border-b-zinc-300 flex justify-start gap-4 items-center'>
      <div className='w-[100px] lg:hidden text-blue-600 flex justify-center items-center'>
        {product.imagePath ? (
          <img src={product.imagePath} alt={product.name} />
        ) : (
          <MdNoPhotography size={30} />
        )}
      </div>
      <div className='text-xs font-bold text-zinc-700 w-[10%]'>{product.code}</div>
      <div className='text-xs text-zinc-700 w-[60%]'>{product.name}</div>
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

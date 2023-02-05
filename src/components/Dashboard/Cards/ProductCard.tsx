// Router
import { Link } from 'react-router-dom'

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

const ProductCard = ({ product }: ProductProps) => {
  const transform = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  return (
    <div className='flex flex-col gap-4'>
      <Link
        to={`${product.id}`}
        key={product.id}
        className='flex w-full gap-2 p-4 text-black transition-all duration-200 rounded-md cursor-pointer  hover:bg-zinc-200 border-b-[1px] border-b-zinc-200'
      >
        <div className='flex flex-col w-[10%] md:w-[20%] '>
          <span className='text-xs text-zinc-400'>Código</span>
          <span className='font-medium'>{product.code}</span>
        </div>
        <div className='flex flex-col w-[60%] md:w-[70%]'>
          <span className='text-xs text-zinc-400'>Nome</span>
          <span className='font-medium'>{product.name}</span>
        </div>

        <div className='flex gap-2 w-[30%] md:w-[10%] flex-col'>
          <span className='text-xs text-zinc-400'>Valor Uni.</span>
          <span className='font-medium'>{product.price && transform(+product.price)}</span>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
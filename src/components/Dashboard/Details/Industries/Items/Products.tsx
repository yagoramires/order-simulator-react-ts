import { Link } from 'react-router-dom'

import { IProduct } from '../../../../../interfaces'

interface DataProps {
  product: IProduct
}

const Products = ({ product }: DataProps) => {
  const transform = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  const linkComponent = (product: IProduct) => {
    return (
      <div className='flex items-center justify-between w-full gap-4' key={product.id}>
        <Link
          to={`product/${product.id}`}
          key={product.id}
          className='flex w-full gap-2 p-4 text-black transition-all duration-200 rounded-md cursor-pointer  hover:bg-zinc-200 border-b-[1px] border-b-zinc-200'
        >
          <span className='font-medium w-[20%] md:w-[40%]'>{product.code}</span>
          <span className='font-medium w-[60%] md:w-[60%]'>{product.name}</span>
          <span className='font-medium w-[20%] md:hidden'>
            {product.price && transform(+product.price)}
          </span>
        </Link>
      </div>
    )
  }

  return <div className='flex flex-col gap-4'>{linkComponent(product)}</div>
}

export default Products

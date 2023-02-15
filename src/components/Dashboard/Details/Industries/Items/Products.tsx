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
      <Link
        to={`product/${product.id}`}
        key={product.id}
        className='flex items-center w-full gap-2 p-2 break-words bg-gray-900 rounded-lg lg:p-4 text-gray-50'
      >
        <span className='w-[20%]'>{product.code}</span>
        <span className='w-[60%]'>{product.name}</span>
        <span className='w-[20%]'>{product.price && transform(+product.price)}</span>
      </Link>
    )
  }

  return linkComponent(product)
}

export default Products

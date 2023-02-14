// Hooks
import { useState, useEffect, useContext } from 'react'

// Icons
import { MdNoPhotography } from 'react-icons/md'
import { NewOrderContext } from '../../context/NewOrderContext'

import { IProduct } from '../../interfaces'
interface ProductProps {
  product: IProduct
  productsArray: Array<IProduct>
  setProductsArray: React.Dispatch<React.SetStateAction<IProduct[]>>
}

const Product = ({ product }: ProductProps) => {
  const [quantity, setQuantity] = useState(0)
  const [total, setTotal] = useState(0)

  const { productsArray, setProductsArray } = useContext(NewOrderContext)

  useEffect(() => {
    setTotal(quantity * (product.price || 0))
  }, [quantity])

  const handleSelectProductQuantity = (qnt: number) => {
    setQuantity(qnt)
    const checkIfProductIsInArray = productsArray.filter((prod) => prod.id === product.id)

    if (qnt === 0) {
      const removeProduct = productsArray.filter((prod) => prod.id !== product.id)
      return setProductsArray(removeProduct)
    }

    if (checkIfProductIsInArray.length === 0) {
      const totalPrice = qnt * (product.price || 0)
      const addProduct = { ...product, quantity: qnt, total: totalPrice }
      return setProductsArray([...productsArray, addProduct])
    }

    if (checkIfProductIsInArray.length === 1) {
      const removeProduct = productsArray.filter((prod) => prod.id !== product.id)

      const totalPrice = qnt * (product.price || 0)
      const addProduct = { ...product, quantity: qnt, total: totalPrice }
      return setProductsArray([...removeProduct, addProduct])
    }
  }

  return (
    // <div className='w-full lg:rounded-md border-b-[1px] border-b-zinc-300 flex justify-start gap-4 items-center'>
    <div className='flex items-center justify-start gap-2 lg:gap-4 md:p-2 lg:border-b-[1px] border-b-zinc-300'>
      <div className='min-w-[80px] w-[80px] text-blue-600 flex items-center justify-center'>
        {product.imagePath ? (
          <img src={product.imagePath} alt={product.name} className='w-[50px] lg:w-[80px]' />
        ) : (
          <MdNoPhotography className='text-[50px]' />
        )}
      </div>
      <span className='text-xs font-bold text-zinc-700 w-[15%]'>{product.code}</span>
      <span className='text-xs text-zinc-700 w-[50%]'>{product.name}</span>
      <span className='text-xs  text-zinc-700 w-[10%]'>
        {(product.price || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </span>
      <input
        type='number'
        value={quantity}
        onChange={(e) => handleSelectProductQuantity(+e.target.value)}
        className='p-2 text-xs text-center rounded-md bg-zinc-200  w-[10%]'
      />
      <span className='text-xs  text-zinc-700 w-[15%]'>
        {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </span>
    </div>
  )
}

export default Product

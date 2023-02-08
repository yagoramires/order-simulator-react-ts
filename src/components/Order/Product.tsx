// Hooks
import { useState, useEffect } from 'react'

// Icons
import { MdNoPhotography } from 'react-icons/md'

import { IProduct } from '../../interfaces'
interface ProductProps {
  product: IProduct
  productsArray: Array<IProduct>
  setProductsArray: React.Dispatch<React.SetStateAction<IProduct[]>>
}

const Product = ({ product, productsArray, setProductsArray }: ProductProps) => {
  const [quantity, setQuantity] = useState(0)
  const [total, setTotal] = useState(0)

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
          {(product.price || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </div>
        <input
          type='number'
          value={quantity}
          onChange={(e) => handleSelectProductQuantity(+e.target.value)}
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

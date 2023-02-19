// Hooks
import { useState, useEffect, useContext } from 'react'

// Icons
import { MdNoPhotography } from 'react-icons/md'
import { NewOrderContext } from '../../context/NewOrderContext'
import { useFetchCollection } from '../../hooks/fetchData/useFetchCollection'
import { useCalculateDiscount } from '../../hooks/formatData/useCalculateDiscount'

import { IProduct } from '../../interfaces'
interface ProductProps {
  product: IProduct
}

const Product = ({ product }: ProductProps) => {
  const [quantity, setQuantity] = useState(0)
  const [total, setTotal] = useState(0)

  const { productsArray, setProductsArray, selectedClient } = useContext(NewOrderContext)
  const { networksFetch } = useFetchCollection('networks')
  const { calculatePriceWithDiscount } = useCalculateDiscount()

  const price = calculatePriceWithDiscount(product.price || 0, product.code || '', selectedClient)

  useEffect(() => {
    console.log(productsArray)
    console.log(quantity)
    console.log(total)
  }, [total])

  useEffect(() => {
    setTotal(0)
    setQuantity(0)
  }, [selectedClient])

  useEffect(() => {
    setTotal(quantity * price)
  }, [quantity])

  const handleSelectProductQuantity = (qnt: number) => {
    setQuantity(qnt)
    const checkIfProductIsInArray = productsArray.filter((prod) => prod.id === product.id)
    console.log(checkIfProductIsInArray)

    if (qnt === 0) {
      const removeProduct = productsArray.filter((prod) => prod.id !== product.id)
      return setProductsArray(removeProduct)
    }

    if (checkIfProductIsInArray.length === 0) {
      const totalPrice = qnt * price
      const addProduct = { ...product, quantity: qnt, total: totalPrice }
      return setProductsArray([...productsArray, addProduct])
    }
    console.log(checkIfProductIsInArray)

    if (checkIfProductIsInArray.length === 1) {
      const removeProduct = productsArray.filter((prod) => prod.id !== product.id)

      const totalPrice = qnt * price
      const addProduct = { ...product, quantity: qnt, total: totalPrice }
      return setProductsArray([...removeProduct, addProduct])
    }
    console.log(checkIfProductIsInArray)
  }

  return (
    <div className='flex items-center justify-start min-w-[600px] w-full gap-2 p-2 bg-gray-900 text-gray-50 rounded-lg'>
      {product.imagePath ? (
        <img src={product.imagePath} alt={product.name} className='w-10 lg:w-20' />
      ) : (
        <span className='flex justify-center w-10 lg:w-20'>
          <MdNoPhotography className='text-[20px] lg:text-[40px]' />
        </span>
      )}

      <span className='w-32 lg:w-52'>{product.code}</span>
      <span className='w-52 lg:w-full'>{product.name}</span>
      <span className='w-24 '>
        {price.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </span>
      <span>
        <input
          type='number'
          value={quantity}
          onChange={(e) => handleSelectProductQuantity(+e.target.value)}
          className='w-16 p-2 text-center bg-gray-800 rounded-lg'
        />
      </span>
      <span className='w-24 lg:28'>
        {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </span>
    </div>
  )
}

export default Product

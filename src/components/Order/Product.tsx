// Hooks
import { useState, useEffect, useContext } from 'react'
import { FaCartArrowDown, FaCartPlus } from 'react-icons/fa'

// Icons
import { MdNoPhotography } from 'react-icons/md'
import { NewOrderContext } from '../../context/NewOrderContext'
import { useFetchCollection } from '../../hooks/fetchData/useFetchCollection'
import { useCalculateDiscount } from '../../hooks/formatData/useCalculateDiscount'

import { IClients, IProduct } from '../../interfaces'
interface ProductProps {
  product: IProduct
  type: string
  client: IClients
}

const Product = ({ product, client, type }: ProductProps) => {
  const [quantity, setQuantity] = useState(product.quantity ? product.quantity : 0)
  const [total, setTotal] = useState(0)

  // console.log(product)

  const { productsArray, setProductsArray, createNewOrder } = useContext(NewOrderContext)
  // const { networksFetch } = useFetchCollection('networks')

  const { calculatePriceWithDiscount } = useCalculateDiscount()

  const price = calculatePriceWithDiscount(product.price || 0, product.code || '', client)

  useEffect(() => {
    setTotal(0)
    setQuantity(0)
  }, [client])

  useEffect(() => {
    if (product.quantity) {
      setQuantity(product.quantity)
    }
  }, [product])

  useEffect(() => {
    if (product.quantity) {
      setTotal(quantity * price)
    }
  }, [quantity])

  useEffect(() => {
    if (type !== 'cart') return
    const checkIfProductIsInArray = productsArray.filter((prod) => prod.code === product.code)

    if (quantity === 0) {
      const removeProduct = productsArray.filter((prod) => prod.code !== product.code)
      return setProductsArray(removeProduct)
    }

    if (checkIfProductIsInArray.length === 0) {
      const totalPrice = quantity * price
      const addProduct = { ...product, price, quantity, total: totalPrice }
      return setProductsArray([...productsArray, addProduct])
    }

    if (checkIfProductIsInArray.length === 1) {
      const removeProduct = productsArray.filter((prod) => prod.code !== product.code)

      const totalPrice = quantity * price
      const addProduct = { ...product, price, quantity, total: totalPrice }
      return setProductsArray([...removeProduct, addProduct])
    }
  }, [quantity])

  const addItem = () => {
    if (quantity === 0) return
    const checkIfProductIsInArray = productsArray.filter((prod) => prod.code === product.code)
    if (checkIfProductIsInArray.length === 0) {
      const totalPrice = quantity * price
      const addProduct = { ...product, price, quantity, total: totalPrice }
      return setProductsArray([...productsArray, addProduct])
    }
    if (checkIfProductIsInArray.length === 1) {
      const removeProduct = productsArray.filter((prod) => prod.code !== product.code)

      const totalPrice = quantity * price
      const addProduct = { ...product, price, quantity, total: totalPrice }
      return setProductsArray([...removeProduct, addProduct])
    }
  }

  const removeItem = () => {
    const removeProduct = productsArray.filter((prod) => prod.code !== product.code)
    return setProductsArray(removeProduct)
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
      <span className='w-52 lg:w-[400px]'>{product.name}</span>
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
          onChange={(e) => setQuantity(+e.target.value)}
          className='w-16 p-2 text-center bg-gray-800 rounded-lg'
          min={0}
          step={product.minValue}
        />
      </span>
      <span className='w-32 lg:36'>
        {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </span>
      <button>
        {type === 'cart' ? (
          <FaCartArrowDown size={25} className='text-red-500' onClick={removeItem} />
        ) : (
          <FaCartPlus size={20} className='text-blue-600' onClick={addItem} />
        )}
      </button>
    </div>
  )
}

export default Product

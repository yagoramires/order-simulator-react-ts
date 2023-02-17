// Hooks
import { useState, useEffect, useContext } from 'react'

// Icons
import { MdNoPhotography } from 'react-icons/md'
import { NewOrderContext } from '../../context/NewOrderContext'
import { useFetchCollection } from '../../hooks/fetchData/useFetchCollection'

import { IProduct } from '../../interfaces'
interface ProductProps {
  product: IProduct
}

const Product = ({ product }: ProductProps) => {
  const [quantity, setQuantity] = useState(0)
  const [total, setTotal] = useState(0)

  const { productsArray, setProductsArray, selectedClient } = useContext(NewOrderContext)
  const { networks } = useFetchCollection('networks')

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

  const calculatePriceWithDiscount = (price: number, code: string) => {
    if (!selectedClient) return price

    let discount = price
    if (selectedClient.discountA) {
      discount =
        selectedClient.discountA > 0
          ? discount - discount * (selectedClient.discountA / 100)
          : discount
    }

    if (selectedClient.discountB) {
      discount =
        selectedClient.discountB > 0
          ? discount - discount * (selectedClient.discountB / 100)
          : discount
    }
    if (selectedClient.discountC) {
      discount =
        selectedClient.discountC > 0
          ? discount - discount * (selectedClient.discountC / 100)
          : discount
    }
    if (selectedClient.engefer) {
      discount = discount * 1.12
    }

    if (selectedClient.network) {
      const getClientNetwork = networks.filter(
        (network) => network.name?.toLowerCase() === selectedClient.network?.toLowerCase(),
      )

      // console.log(getClientNetwork[0].id)
    }

    return discount
  }

  return (
    <tr className='flex items-center justify-start min-w-[600px] w-full gap-2 p-2 bg-gray-900 text-gray-50 rounded-lg'>
      {product.imagePath ? (
        <td>
          <img src={product.imagePath} alt={product.name} className='w-10 lg:w-20' />
        </td>
      ) : (
        <td className='flex justify-center w-10 lg:w-20'>
          <MdNoPhotography className='text-[20px] lg:text-[40px]' />
        </td>
      )}

      <td className='w-32 lg:w-52'>{product.code}</td>
      <td className='w-52 lg:w-full'>{product.name}</td>
      <td className='w-24 '>
        {calculatePriceWithDiscount(product.price || 0, product.code || '').toLocaleString(
          'pt-BR',
          {
            style: 'currency',
            currency: 'BRL',
          },
        )}
      </td>
      <td>
        <input
          type='number'
          value={quantity}
          onChange={(e) => handleSelectProductQuantity(+e.target.value)}
          className='w-16 p-2 text-center bg-gray-800 rounded-lg'
        />
      </td>
      <td className='w-24 lg:28'>
        {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </td>
    </tr>
  )
}

export default Product

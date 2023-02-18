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
    setTotal(0)
    setQuantity(0)
  }, [selectedClient])

  useEffect(() => {
    setTotal(quantity * calculatePriceWithDiscount(product.price || 0, product.code || ''))
  }, [quantity])

  const handleSelectProductQuantity = (qnt: number) => {
    setQuantity(qnt)
    const checkIfProductIsInArray = productsArray.filter((prod) => prod.id === product.id)

    if (qnt === 0) {
      const removeProduct = productsArray.filter((prod) => prod.id !== product.id)
      return setProductsArray(removeProduct)
    }

    if (checkIfProductIsInArray.length === 0) {
      const totalPrice = qnt * calculatePriceWithDiscount(product.price || 0, product.code || '')
      const addProduct = { ...product, quantity: qnt, total: totalPrice }
      return setProductsArray([...productsArray, addProduct])
    }

    if (checkIfProductIsInArray.length === 1) {
      const removeProduct = productsArray.filter((prod) => prod.id !== product.id)

      const totalPrice = qnt * calculatePriceWithDiscount(product.price || 0, product.code || '')
      const addProduct = { ...product, quantity: qnt, total: totalPrice }
      return setProductsArray([...removeProduct, addProduct])
    }
  }

  const calculatePriceWithDiscount = (price: number, code: string) => {
    if (!selectedClient) return price

    let discount = price
    // console.log('VALOR CHEIO: ' + discount)

    if (selectedClient.discountA) {
      discount =
        selectedClient.discountA > 0
          ? discount - discount * (selectedClient.discountA / 100)
          : discount
    }
    discount = Number(discount.toFixed(8))
    // console.log('VALOR DESCONTO A: ' + discount)

    if (selectedClient.discountB) {
      discount =
        selectedClient.discountB > 0
          ? discount - discount * (selectedClient.discountB / 100)
          : discount
    }

    discount = Number(discount.toFixed(8))
    // console.log('VALOR DESCONTO B: ' + discount)

    if (selectedClient.discountC) {
      discount =
        selectedClient.discountC > 0
          ? discount - discount * (selectedClient.discountC / 100)
          : discount
    }
    discount = Number(discount.toFixed(8))
    // console.log('VALOR DESCONTO C: ' + discount)

    if (selectedClient.network) {
      const getClientNetwork = networks.filter(
        (network) => network.name?.toLowerCase() === selectedClient.network?.toLowerCase(),
      )

      const productsFilter = getClientNetwork[0]?.products?.filter(
        (product) => product.code === String(code),
      )

      if (productsFilter && productsFilter?.length > 0) {
        const value = productsFilter[0].discount
        discount = value && value > 0 ? discount - discount * (value / 100) : discount
      }
    }
    // else if (!selectedClient.network || selectedClient.network === 'undefined') {
    //   const getClientNetwork = networks.filter((network) => network.name === 'DESCONTO MÁXIMO')

    //   const productsFilter = getClientNetwork[0]?.products?.filter(
    //     (product) => product.code === String(code),
    //   )

    //   if (productsFilter && productsFilter?.length > 0) {
    //     const value = productsFilter[0].discount
    //     discount = value && value > 0 ? discount - discount * (value / 100) : discount
    //   }
    // }
    // console.log('VALOR DESCONTO REDE: ' + discount)

    // if (selectedClient.engefer) {
    //   discount = discount * 1.12
    // }
    // discount = Number(discount.toFixed(8))
    // console.log('VALOR ADICIONAL ENGEFER' +discount)

    return discount
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
        {calculatePriceWithDiscount(product.price || 0, product.code || '').toLocaleString(
          'pt-BR',
          {
            style: 'currency',
            currency: 'BRL',
          },
        )}
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

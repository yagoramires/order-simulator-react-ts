// Hooks
import { useState, useEffect, useContext } from 'react'

// Icons
import { MdNoPhotography } from 'react-icons/md'
import { NewOrderContext } from '../../context/NewOrderContext'

import './Product.css'

import { IProduct } from '../../interfaces'
interface ProductProps {
  product: IProduct
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
    <div className='productContainer'>
      {product.imagePath ? (
        <img src={product.imagePath} alt={product.name} className='productContainer__image' />
      ) : (
        <MdNoPhotography className='productContainer__image--noImg' />
      )}

      <span className='productContainer__code'>{product.code}</span>
      <span className='productContainer__name'>{product.name}</span>
      <span className='productContainer__unitPrice'>
        {(product.price || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </span>
      <input
        type='number'
        value={quantity}
        onChange={(e) => handleSelectProductQuantity(+e.target.value)}
        className='productContainer__quantity'
      />
      <span className='productContainer__totalPrice'>
        {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </span>
    </div>
  )
}

export default Product

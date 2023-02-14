import { useContext, useState } from 'react'

import Header from '../../components/Order/Header'
import Product from '../../components/Order/Product'
import SelectData from '../../components/Order/Select'
import Loading from '../../components/Loading'

import { NewOrderContext } from '../../context/NewOrderContext'

import './Order.css'

const Order = () => {
  const { selectedIndustry, products, productsArray, setProductsArray } =
    useContext(NewOrderContext)

  const [search, setSearch] = useState('')

  const filteredProductsCode =
    search.length > 0
      ? products.filter((product) => product.code?.toLowerCase().includes(search.toLowerCase()))
      : []
  const filteredProductsName =
    search.length > 0
      ? products.filter((product) => product.name?.toLowerCase().includes(search.toLowerCase()))
      : []

  if (!products)
    return (
      <div className='min-h-[100vh] bg-gradient-to-r from-blue-800 to-blue-600 justify-center items-center flex'>
        <Loading size={'60px'} />
      </div>
    )

  return (
    <>
      <Header />
      <div className='orderContainer'>
        <SelectData />

        <div className='productsContainer'>
          {selectedIndustry.id ? (
            <>
              <input
                type='text'
                className='searchInput'
                placeholder='Pesquisar por nome ou código'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <div className='labelContainer'>
                <span className='labelContainer__image'></span>
                <span className='labelContainer__code'>Código</span>
                <span className='labelContainer__name'>Nome</span>
                <span className='labelContainer__unitPrice'>Valor Un.</span>
                <span className='labelContainer__quantity'>Qnt.</span>
                <span className='labelContainer__totalPrice'>Total</span>
              </div>

              {search && filteredProductsCode.length > 0
                ? filteredProductsCode?.map((product) => (
                    <Product product={product} key={product.id} />
                  ))
                : search && filteredProductsName.length > 0
                ? filteredProductsName?.map((product) => (
                    <Product product={product} key={product.id} />
                  ))
                : !search &&
                  products?.map((product) => <Product product={product} key={product.id} />)}
              {products?.length === 0 && (
                <span className='productsContainer__warning'>Nenhum produto cadastrado.</span>
              )}
            </>
          ) : (
            <span className='productsContainer__warning'>Selecione uma fábrica.</span>
          )}
        </div>
      </div>
    </>
  )
}

export default Order

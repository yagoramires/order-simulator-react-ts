import { useContext, useState } from 'react'

import Header from '../../components/Order/Header'
import Product from '../../components/Order/Product'
import SelectData from '../../components/Order/Select'
import Loading from '../../components/Loading'

import { NewOrderContext } from '../../context/NewOrderContext'

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
      <div className='flex flex-col lg:gap-8 lg:p-8'>
        <SelectData />
        {selectedIndustry.id && (
          <div className='flex justify-center w-full my-2 lg:m-0'>
            <input
              type='text'
              className='px-2 md:py-2 rounded-md shadow-sm bg-zinc-50 border-[1px] border-zinc-300 w-[300px]'
              placeholder='Pesquisar por nome ou código'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        )}

        <div className='bg-white max-w-[1200px] lg:rounded-md flex flex-col gap-2 overflow-scroll'>
          {selectedIndustry.id ? (
            <>
              <div className='flex items-center w-full gap-2 text-start md:p-2'>
                <span className='text-xs text-zinc-500 min-w-[80px]'></span>
                <span className='text-xs text-zinc-500 w-[15%]'>Código</span>
                <span className='text-xs text-zinc-500 w-[50%]'>Nome</span>
                <span className='text-xs text-zinc-500 w-[10%]'>Valor Un.</span>
                <span className='text-xs text-zinc-500 w-[10%]'>Qnt.</span>
                <span className='text-xs text-zinc-500 w-[15%]'>Total</span>
              </div>

              {search && filteredProductsCode.length > 0
                ? filteredProductsCode?.map((product) => (
                    <Product
                      product={product}
                      key={product.id}
                      productsArray={productsArray}
                      setProductsArray={setProductsArray}
                    />
                  ))
                : search && filteredProductsName.length > 0
                ? filteredProductsName?.map((product) => (
                    <Product
                      product={product}
                      key={product.id}
                      productsArray={productsArray}
                      setProductsArray={setProductsArray}
                    />
                  ))
                : !search &&
                  products?.map((product) => (
                    <Product
                      product={product}
                      key={product.id}
                      productsArray={productsArray}
                      setProductsArray={setProductsArray}
                    />
                  ))}
              {products?.length === 0 && (
                <p className='w-full py-20 text-center '>Nenhum produto cadastrado.</p>
              )}
            </>
          ) : (
            <p className='w-full py-20 text-center '>Selecione uma fábrica.</p>
          )}
        </div>
      </div>
    </>
  )
}

export default Order

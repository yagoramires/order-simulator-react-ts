import { useContext, useState } from 'react'

import Header from '../../components/Order/Header'
import Select from '../../components/Order/Select'
import Loading from '../../components/Loading'
import Label from '../../components/Order/Label'
import Product from '../../components/Order/Product'

import { NewOrderContext } from '../../context/NewOrderContext'

const Order = () => {
  const [search, setSearch] = useState('')

  const { selectedIndustry, products } = useContext(NewOrderContext)

  const codeFilter =
    search.length > 0
      ? products.filter((product) => product.code?.toLowerCase().includes(search.toLowerCase()))
      : []

  const nameFilter =
    search.length > 0
      ? products.filter((product) => product.name?.toLowerCase().includes(search.toLowerCase()))
      : []

  if (!products)
    return (
      <div className='w-full min-h-[100vh] bg-gradient-to-r from-blue-800 to-blue-600 justify-center items-center flex'>
        <Loading size={'60px'} />
      </div>
    )

  return (
    <>
      <Header />
      <div className='overflow-hidden max-h-[100vh] w-full flex flex-col items-center justify-center'>
        <div className='flex flex-col w-[100vw] max-w-[1400px] bg-dark-100 overflow-auto p-1 gap-1 md:p-2 md:gap-2'>
          <Select />
        </div>

        {selectedIndustry.id && (
          <div className='flex items-center justify-center w-full bg-dark-100'>
            <input
              type='text'
              className='w-[300px] p-2 placeholder:text-center  text-gray-50 rounded-lg bg-gray-900'
              placeholder='Pesquisar por nome ou código'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        )}

        {selectedIndustry.id ? (
          <div className='mt-1 md:mt-2 flex flex-col w-[100vw] max-w-[1400px] max-h-[calc(100vh-300px)] md:max-h-[calc(100vh-344px)] bg-dark-100 overflow-auto p-1 gap-1 md:p-2 md:gap-2 '>
            <Label />

            {products?.length === 0 && (
              <span className='w-full mt-20 text-center text-gray-50'>
                Nenhum produto cadastrado.
              </span>
            )}

            {search &&
              codeFilter.length > 0 &&
              codeFilter?.map((product) => <Product product={product} key={product.id} />)}

            {search &&
              nameFilter.length > 0 &&
              nameFilter?.map((product) => <Product product={product} key={product.id} />)}

            {!search && products?.map((product) => <Product product={product} key={product.id} />)}
          </div>
        ) : (
          <span className='w-full mt-20 text-center text-gray-50'>Selecione uma fábrica.</span>
        )}
      </div>
    </>
  )
}

export default Order

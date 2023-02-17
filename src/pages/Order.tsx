import { useContext, useState } from 'react'

import Header from '../components/Order/Header'
import Select from '../components/Order/Select'

import { NewOrderContext } from '../context/NewOrderContext'
import Product from '../components/Order/Product'
import Label from '../components/GlobalComponents/Label'
import Search from '../components/GlobalComponents/Search'
import MessageComponent from '../components/GlobalComponents/MessageComponent'

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

  console.log(selectedIndustry)
  return (
    <>
      <Header />
      <div className='overflow-hidden max-h-[100vh] w-full flex flex-col items-center justify-center'>
        <div className='flex flex-col w-[100vw] max-w-[1400px] bg-dark-100 overflow-auto p-1 gap-1 md:p-2 md:gap-2'>
          <Select />
        </div>

        {!selectedIndustry.id && (
          <MessageComponent text='Selecione uma indústria para carregar os produtos.' />
        )}
        {selectedIndustry.id && products?.length === 0 && (
          <MessageComponent text='Nenhum produto cadastrado.' />
        )}

        {search && nameFilter.length === 0 && codeFilter.length === 0 && (
          <MessageComponent text='Nenhum produto encontrado.' />
        )}
        {selectedIndustry.id && products?.length > 0 && (
          <>
            <div className='flex justify-center w-full p-1 md:p-2'>
              <Search search={search} setSearch={setSearch} />
            </div>
            <div className='mt-1 md:mt-2 flex flex-col w-[100vw] max-w-[1400px] max-h-[calc(100vh-300px)] md:max-h-[calc(100vh-344px)] bg-dark-100 overflow-auto p-1 gap-1 md:p-2 md:gap-2 '>
              <Label />

              {!search &&
                products?.map((product) => <Product product={product} key={product.id} />)}

              {search &&
                codeFilter.length > 0 &&
                codeFilter?.map((product) => <Product product={product} key={product.id} />)}

              {search &&
                nameFilter.length > 0 &&
                nameFilter?.map((product) => <Product product={product} key={product.id} />)}
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Order
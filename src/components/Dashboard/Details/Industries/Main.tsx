import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetchCollection } from '../../../../hooks/fetchData/useFetchCollection'
import mock from './Form/productsMock'

import ProductCard from './Form/Products'
import ProductForm from './Form/AddProduct'

const Main = () => {
  const [search, setSearch] = useState('')

  const { industryId } = useParams()
  const { products } = useFetchCollection(`industries/${industryId}/products`)

  const codeFilter =
    search.length > 0
      ? products.filter((product) => product.code?.toLowerCase().includes(search.toLowerCase()))
      : []

  const nameFilter =
    search.length > 0
      ? products.filter((product) => product.name?.toLowerCase().includes(search.toLowerCase()))
      : []

  const labelComponent = () => {
    return (
      <div className='flex items-center w-full gap-2 p-2 text-left break-words lg:p-4 text-gray-50'>
        <span className='w-[20%]'>Código</span>
        <span className='w-[60%]'>Nome</span>
        <span className='w-[20%]'>Valor Uni.</span>
      </div>
    )
  }
  console.log(mock)

  return (
    <div className='max-w-[1400px] w-full'>
      <div className='flex items-center justify-between w-full gap-2 p-2 bg-dark-100'>
        <input
          type='text'
          className='p-2 bg-gray-900 rounded-lg placeholder:text-center text-gray-50'
          placeholder='Pesquisar'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ProductForm />
      </div>

      <div className='h-[calc(100vh-130px)] flex flex-col items-start w-full gap-2 p-2 overflow-auto'>
        {products.length > 0 && !search && labelComponent()}
        {search && nameFilter.length > 0 && labelComponent()}
        {search && codeFilter.length > 0 && labelComponent()}

        {products.length === 0 && (
          <p className='w-full mt-5 text-center text-gray-50'>Nenhum produto cadastrado.</p>
        )}

        {search &&
          codeFilter.length > 0 &&
          codeFilter.map((product) => <ProductCard product={product} key={product.id} />)}

        {search &&
          nameFilter.length > 0 &&
          nameFilter.map((product) => <ProductCard product={product} key={product.id} />)}

        {search && nameFilter.length === 0 && codeFilter.length === 0 && (
          <p className='w-full mt-5 text-center text-gray-50'>Nenhum produto encontrado.</p>
        )}

        {!search && products.map((product) => <ProductCard product={product} key={product.id} />)}
      </div>
    </div>
  )
}

export default Main

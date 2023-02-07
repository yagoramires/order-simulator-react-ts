import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetchCollection } from '../../../../hooks/fetchData/useFetchCollection'

import ProductCard from './Items/Products'
import ProductForm from './Form/ProductForm'

const Main = () => {
  const [search, setSearch] = useState('')

  const { industryId } = useParams()
  const { products } = useFetchCollection(`industries/${industryId}/products`)

  const filteredProductCode =
    search.length > 0
      ? products.filter((product) => product.code?.toLowerCase().includes(search.toLowerCase()))
      : []

  const filteredProductName =
    search.length > 0
      ? products.filter((product) => product.name?.toLowerCase().includes(search.toLowerCase()))
      : []

  return (
    <main className='bg-gradient-to-r from-blue-800 to-blue-600 h-[100vh] w-full text-white p-8'>
      <div className='flex items-center justify-between w-full'>
        <h1 className='text-2xl font-medium'>Produtos</h1>
        <ProductForm />
      </div>
      <div className=' bg-white shadow-md max-h-[75vh] rounded-md overflow-hidden my-10'>
        <div className='flex flex-col gap-4  p-8  overflow-y-scroll rounded-md max-h-[75vh]'>
          {products.length === 0 ? (
            <p className='text-black'>Nenhum produto cadastrado.</p>
          ) : (
            <input
              type='text'
              className='p-2 rounded-md shadow-sm bg-zinc-300'
              placeholder='Pesquisar'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          )}

          {search && filteredProductCode.length > 0
            ? filteredProductCode.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))
            : filteredProductName.length > 0
            ? filteredProductName.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))
            : search && <p className='text-black'>Nenhum produto encontrado.</p>}

          {!search && products.map((product) => <ProductCard product={product} key={product.id} />)}
        </div>
      </div>
    </main>
  )
}

export default Main

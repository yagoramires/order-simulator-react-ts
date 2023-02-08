import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetchCollection } from '../../../../hooks/fetchData/useFetchCollection'

import ProductCard from './Items/Products'
import ProductForm from './Form/ProductForm'
import { MdKeyboardArrowLeft } from 'react-icons/md'

const Main = () => {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

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
          <span
            onClick={() => navigate(-1)}
            className='items-center justify-end hidden w-full text-sm font-bold text-blue-600 cursor-pointer md:flex'
          >
            <MdKeyboardArrowLeft size={20} />
            Voltar
          </span>
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

          <div className='flex items-center justify-start w-full gap-4 p-4 text-start'>
            <span className='text-xs text-zinc-400 w-[15%] lg:w-[25%] md:hidden'>Pedido</span>
            <span className='text-xs text-zinc-400 w-[20%] lg:w-[25%] md:w-[50%]'>Data</span>
            <span className='text-xs text-zinc-400 w-[35%] lg:hidden'>Prazo</span>
          </div>

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

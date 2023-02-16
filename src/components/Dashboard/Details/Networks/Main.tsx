import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetchCollection } from '../../../../hooks/fetchData/useFetchCollection'
import { IProduct } from '../../../../interfaces'
import ProductForm from './Form/AddProduct'

const Main = () => {
  const [search, setSearch] = useState('')

  const { networkId } = useParams()
  const { products } = useFetchCollection(`networks/${networkId}/products`)

  const codeFilter =
    search.length > 0
      ? products.filter((product) => product.code?.toLowerCase().includes(search.toLowerCase()))
      : []

  const productComponent = (product: IProduct) => {
    return (
      <div
        className='flex items-center w-full gap-2 p-2 break-words bg-gray-900 rounded-lg lg:p-4 text-gray-50'
        key={product.id}
      >
        <span className='w-[80%]'>{product.code}</span>
        <span className='w-[20%]'>{`${product.discount} %`}</span>
      </div>
    )
  }
  const labelComponent = () => {
    return (
      <div className='flex items-center w-full gap-2 p-2 text-left break-words lg:p-4 text-gray-50'>
        <span className='w-[80%]'>Código</span>
        <span className='w-[20%]'>Desconto</span>
      </div>
    )
  }

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
        {search && codeFilter.length > 0 && labelComponent()}

        {products.length === 0 && (
          <p className='w-full mt-5 text-center text-gray-50'>Nenhum produto cadastrado.</p>
        )}

        {search && codeFilter.length > 0 && codeFilter.map((product) => productComponent(product))}

        {search && codeFilter.length === 0 && (
          <p className='w-full mt-5 text-center text-gray-50'>Nenhum produto encontrado.</p>
        )}

        {!search && products.map((product) => productComponent(product))}
      </div>
    </div>
  )
}

export default Main

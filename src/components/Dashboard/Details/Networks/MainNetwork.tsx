import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetchCollection } from '../../../../hooks/fetchData/useFetchCollection'
import { IProduct } from '../../../../interfaces'
import LabelComponent from '../../../GlobalComponents/LabelComponent'
import MessageComponent from '../../../GlobalComponents/MessageComponent'
import Search from '../../../GlobalComponents/Search'
import ProductForm from './AddProduct'

const MainNetwork = () => {
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
      <LabelComponent>
        <span className='w-[80%]'>Código</span>
        <span className='w-[20%]'>Desconto</span>
      </LabelComponent>
    )
  }

  return (
    <div className='max-w-[1400px] w-full'>
      <div className='flex items-center justify-between w-full gap-2 p-2 bg-dark-100'>
        <Search search={search} setSearch={setSearch} />

        <ProductForm />
      </div>

      {!search && products.length === 0 && <MessageComponent text='Nenhum produto cadastrado.' />}
      {search && codeFilter.length === 0 && <MessageComponent text='Nenhum produto encontrado.' />}

      <div className='h-[calc(100vh-130px)] flex flex-col items-start w-full gap-2 p-2 overflow-auto'>
        {products.length > 0 && !search && labelComponent()}
        {search && codeFilter.length > 0 && labelComponent()}

        {!search && products.map((product) => productComponent(product))}

        {search && codeFilter.length > 0 && codeFilter.map((product) => productComponent(product))}
      </div>
    </div>
  )
}

export default MainNetwork

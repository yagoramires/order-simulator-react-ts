import { useState } from 'react'
import { useFormatValue } from '../../../../hooks/formatData/useFormatValue'
import { useFetchCollection } from '../../../../hooks/fetchData/useFetchCollection'
import { useParams } from 'react-router-dom'

import LinkComponent from '../../../GlobalComponents/LinkComponent'
import LabelComponent from '../../../GlobalComponents/LabelComponent'
import ProductForm from './AddProduct'

import { IProduct } from '../../../../interfaces'
import Search from '../../../GlobalComponents/Search'
import MessageComponent from '../../../GlobalComponents/MessageComponent'

const MainIndustry = () => {
  const [search, setSearch] = useState('')

  const { industryId } = useParams()
  const { formatValue } = useFormatValue()
  const { products } = useFetchCollection(`industries/${industryId}/products`)

  const codeFilter =
    search.length > 0
      ? products.filter((product) => product.code?.toLowerCase().includes(search.toLowerCase()))
      : []

  const nameFilter =
    search.length > 0
      ? products.filter((product) => product.name?.toLowerCase().includes(search.toLowerCase()))
      : []

  const linkComponent = (product: IProduct) => {
    return (
      <LinkComponent id={product.id || ''} key={product.id}>
        <span className='w-[20%]'>{product.code}</span>
        <span className='w-[60%]'>{product.name}</span>
        <span className='w-[20%]'>{product.price && formatValue(+product.price)}</span>
      </LinkComponent>
    )
  }

  const labelComponent = () => {
    return (
      <LabelComponent>
        <span className='w-[20%]'>Código</span>
        <span className='w-[60%]'>Nome</span>
        <span className='w-[20%]'>Valor Uni.</span>
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
      {search && nameFilter.length === 0 && codeFilter.length === 0 && (
        <MessageComponent text='Nenhum produto encontrado.' />
      )}

      <div className='h-[calc(100vh-130px)] flex flex-col items-start w-full gap-2 p-2 overflow-auto'>
        {products.length > 0 && !search && labelComponent()}
        {search && nameFilter.length > 0 && labelComponent()}
        {search && codeFilter.length > 0 && labelComponent()}

        {!search && products.map((product) => linkComponent(product))}
        {search && codeFilter.length > 0 && codeFilter.map((product) => linkComponent(product))}

        {search && nameFilter.length > 0 && nameFilter.map((product) => linkComponent(product))}
      </div>
    </div>
  )
}

export default MainIndustry

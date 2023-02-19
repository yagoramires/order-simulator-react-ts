import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFormatValue } from '../../../../hooks/formatData/useFormatValue'

import ProductForm from './AddProduct'
import LinkComponent from '../../../GlobalComponents/LinkComponent'
import LabelComponent from '../../../GlobalComponents/LabelComponent'
import Filter from '../../../GlobalComponents/Filter'
import MessageComponent from '../../../GlobalComponents/MessageComponent'

import { IIndustries, IProduct } from '../../../../interfaces'

interface DataProps {
  industry: IIndustries
}

const MainIndustry = ({ industry }: DataProps) => {
  const [search, setSearch] = useState('')

  const { industryId } = useParams()
  const { formatValue } = useFormatValue()

  const codeFilter =
    search.length > 0
      ? industry?.products?.filter((product: IProduct) =>
          String(product.code).toLowerCase().includes(search.toLowerCase()),
        )
      : []

  const nameFilter =
    search.length > 0
      ? industry?.products?.filter((product: IProduct) =>
          product.name?.toLowerCase().includes(search.toLowerCase()),
        )
      : []

  const linkComponent = (product: IProduct, index: number) => {
    return (
      <LinkComponent id={`/industries/${industryId}/product/${product.id || ''}`} key={index}>
        <span className='w-[20%]'>{String(product.code)}</span>
        <span className='w-[60%]'>{product.name?.toUpperCase()}</span>
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
        <Filter search={search} setSearch={setSearch} />

        <ProductForm />
      </div>
      {!search && !industry?.products && <MessageComponent text='Nenhum produto cadastrado.' />}

      {search && nameFilter?.length === 0 && codeFilter?.length === 0 && (
        <MessageComponent text='Nenhum produto encontrado.' />
      )}

      <div className='h-[calc(100vh-130px)] flex flex-col items-start w-full gap-2 p-2 overflow-auto'>
        {industry.products && industry.products.length > 0 && labelComponent()}

        {!search &&
          industry?.products?.map((product: IProduct, index: number) =>
            linkComponent(product, index),
          )}
        {search &&
          codeFilter &&
          codeFilter.length > 0 &&
          codeFilter.map((product: IProduct, index: number) => linkComponent(product, index))}

        {search &&
          nameFilter &&
          nameFilter.length > 0 &&
          nameFilter.map((product: IProduct, index: number) => linkComponent(product, index))}
      </div>
    </div>
  )
}

export default MainIndustry

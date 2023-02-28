import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFormatValue } from '../../../../hooks/formatData/useFormatValue'

import ProductForm from './AddProduct'
import LinkComponent from '../../../GlobalComponents/LinkComponent'
import LabelComponent from '../../../GlobalComponents/LabelComponent'
import MessageComponent from '../../../GlobalComponents/MessageComponent'

import { IProduct } from '../../../../interfaces'
import { useFetchCollection } from '../../../../hooks/fetchData/useFetchCollection'
import Search from '../../../GlobalComponents/Search'

const MainIndustry = () => {
  const [result, setResult] = useState([])

  const { industryId } = useParams()
  const { formatValue } = useFormatValue()

  const { productsFetch, fetchMore } = useFetchCollection(`industries/${industryId}/products`)

  const linkComponent = (product: IProduct) => {
    return (
      <LinkComponent id={`/industries/${industryId}/product/${product.id}`} key={product.id}>
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
        <Search collection={`/industries/${industryId}/products`} setResult={setResult} />

        <ProductForm />
      </div>
      <div className='h-[calc(100vh-130px)] flex flex-col items-start w-full gap-2 p-2 overflow-auto'>
        {productsFetch.length > 0 && result.length === 0 && labelComponent()}
        {result.length > 0 && labelComponent()}

        {productsFetch.length > 0 &&
          result.length === 0 &&
          productsFetch?.map((product) => linkComponent(product))}

        {result.length > 0 && result.map((product) => linkComponent(product))}
      </div>
    </div>
  )
}

export default MainIndustry

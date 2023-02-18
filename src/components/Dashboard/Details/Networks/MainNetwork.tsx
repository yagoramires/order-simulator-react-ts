import { useState } from 'react'
import { TiDelete } from 'react-icons/ti'
import { useParams } from 'react-router-dom'
import { useFetchDocument } from '../../../../hooks/fetchData/useFetchDocument'
import { useEditDoc } from '../../../../hooks/handleData/useEditDoc'
import { INetworkProduct } from '../../../../interfaces'
import LabelComponent from '../../../GlobalComponents/LabelComponent'
import MessageComponent from '../../../GlobalComponents/MessageComponent'
import PageLoading from '../../../GlobalComponents/PageLoading'
import Search from '../../../GlobalComponents/Search'
import ProductForm from './AddProduct'

const MainNetwork = () => {
  const [search, setSearch] = useState('')

  const { networkId } = useParams()
  const { document: network } = useFetchDocument('networks', networkId)
  const { updateProductNetwork } = useEditDoc()

  const codeFilter =
    search.length > 0
      ? network?.products?.filter((product: INetworkProduct) =>
          product.code?.toLowerCase().includes(search.toLowerCase()),
        )
      : []

  const productComponent = (product: INetworkProduct, index: number) => {
    return (
      <div
        className='flex items-center w-full gap-2 p-2 break-words bg-gray-900 rounded-lg lg:p-4 text-gray-50'
        key={index}
      >
        <span className='w-[70%]'>{product.code}</span>
        <span className='w-[20%]'>{`${product.discount} %`}</span>
        <TiDelete
          className='text-red-500 cursor-pointer w-[10%]'
          size={20}
          onClick={() => handleDelete(index)}
        />
      </div>
    )
  }
  const labelComponent = () => {
    return (
      <LabelComponent>
        <span className='w-[70%]'>Código</span>
        <span className='w-[20%]'>Desconto</span>
        <span className='w-[10%]'></span>
      </LabelComponent>
    )
  }

  const handleDelete = (index: number) => {
    const products = network?.products.filter((product: INetworkProduct, i: number) => i !== index)
    const data = { ...network, products }

    updateProductNetwork(networkId || '', data)
  }

  if (!network) return <PageLoading />

  return (
    <div className='max-w-[1400px] w-full'>
      <div className='flex items-center justify-between w-full gap-2 p-2 bg-dark-100'>
        <Search search={search} setSearch={setSearch} />

        <ProductForm />
      </div>

      {!search && network.products?.length === 0 && (
        <MessageComponent text='Nenhum produto cadastrado.' />
      )}
      {search && codeFilter?.length === 0 && <MessageComponent text='Nenhum produto encontrado.' />}

      <div className='h-[calc(100vh-130px)] flex flex-col items-start w-full gap-2 p-2 overflow-auto'>
        {network.products?.length > 0 && !search && labelComponent()}
        {search && codeFilter?.length > 0 && labelComponent()}

        {!search &&
          network.products?.map((product: INetworkProduct, index: number) =>
            productComponent(product, index),
          )}

        {search &&
          codeFilter.length > 0 &&
          codeFilter.map((product: INetworkProduct, index: number) =>
            productComponent(product, index),
          )}
      </div>
    </div>
  )
}

export default MainNetwork

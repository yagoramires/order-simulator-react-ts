import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { useEditDoc } from '../../../../hooks/handleData/useEditDoc'

import LabelComponent from '../../../GlobalComponents/LabelComponent'
import MessageComponent from '../../../GlobalComponents/MessageComponent'
import PageLoading from '../../../GlobalComponents/PageLoading'
import Filter from '../../../GlobalComponents/Filter'

import { TiDelete } from 'react-icons/ti'

import { INetworkProduct, INetworks } from '../../../../interfaces'
interface NetworkProps {
  network: INetworks
}

const MainNetwork = ({ network }: NetworkProps) => {
  const [search, setSearch] = useState('')

  const { networkId } = useParams()
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
    const products = network?.products?.filter((product: INetworkProduct, i: number) => i !== index)
    const data = { ...network, products }

    updateProductNetwork(networkId || '', data)
  }

  if (!network) return <PageLoading />

  return (
    <div className='max-w-[1400px] w-full'>
      <div className='flex items-center justify-center w-full gap-2 p-2 bg-dark-100'>
        <Filter search={search} setSearch={setSearch} />
      </div>

      {!search && network.products?.length === 0 && (
        <MessageComponent text='Nenhum produto cadastrado.' />
      )}
      {search && codeFilter?.length === 0 && <MessageComponent text='Nenhum produto encontrado.' />}

      <div className='h-[calc(100vh-130px)] flex flex-col items-start w-full gap-2 p-2 overflow-auto'>
        {network.products && network.products.length > 0 && !search && labelComponent()}
        {search && codeFilter && codeFilter.length > 0 && labelComponent()}

        {!search &&
          network.products?.map((product: INetworkProduct, index: number) =>
            productComponent(product, index),
          )}

        {search &&
          codeFilter &&
          codeFilter.length > 0 &&
          codeFilter.map((product: INetworkProduct, index: number) =>
            productComponent(product, index),
          )}
      </div>
    </div>
  )
}

export default MainNetwork

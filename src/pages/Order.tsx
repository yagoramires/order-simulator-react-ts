import { useContext, useState } from 'react'

import Header from '../components/Order/Header'
import SelectedItems from '../components/Order/SelectedItems'

import { NewOrderContext } from '../context/NewOrderContext'
import Product from '../components/Order/Product'
import Label from '../components/GlobalComponents/Label'
import MessageComponent from '../components/GlobalComponents/MessageComponent'
import { IProduct } from '../interfaces'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { useFetchCollection } from '../hooks/fetchData/useFetchCollection'
import Search from '../components/GlobalComponents/SearchComponent'
import { useFetchDocument } from '../hooks/fetchData/useFetchDocument'
import { useParams } from 'react-router-dom'
import LoadMoreBtn from '../components/GlobalComponents/LoadMoreBtn'

const Order = () => {
  const [result, setResult] = useState([])

  const { industryId, clientId } = useParams()

  const { document: industry } = useFetchDocument('industries', industryId)
  const { document: client } = useFetchDocument('clients', clientId)

  const { productsFetch, fetchMore } = useFetchCollection(`industries/${industryId}/products`)

  return (
    <div className='max-h-[100vh] flex flex-col justify-center items-center'>
      <Header />
      <div className='flex flex-col w-[100vw] max-w-[1400px] bg-dark-100 overflow-auto gap-1 md:gap-2 p-1 md:p-2'>
        {client && industry && <SelectedItems client={client} industry={industry} />}
      </div>
      <div className='flex flex-col w-[100vw] max-w-[1400px] bg-dark-100 overflow-auto gap-1 md:gap-2 p-1 md:p-2'>
        <Search
          type='products'
          collection={`industries/${industryId}/products`}
          setResult={setResult}
        />
        <div className='hidden lg:block'>
          <Label />
        </div>
      </div>
      {/* 
        {industry && productsFetch.length === 0 && (
          <MessageComponent text='Nenhum produto cadastrado.' />
        )} */}

      {/* {result.length === 0 && <MessageComponent text='Nenhum produto encontrado.' />} */}

      {productsFetch && productsFetch?.length > 0 && (
        <>
          <div className='mt-1 md:mt-2 flex flex-col w-[100vw] max-w-[1400px] max-h-[calc(100vh-165px)] md:max-h-[calc(100vh-200px)] lg:max-h-[calc(100vh-250px)] bg-dark-100 overflow-auto p-1 gap-1 md:p-2 md:gap-2 '>
            <div className='lg:hidden'>
              <Label />
            </div>

            {result.length === 0 &&
              client &&
              productsFetch?.map((product: IProduct, index: number) => (
                <Product product={product} key={product.id} client={client} type='select' />
              ))}

            {result.length > 0 &&
              client &&
              result?.map((product: IProduct, index: number) => (
                <Product product={product} key={product.id} client={client} type='select' />
              ))}
          </div>
        </>
      )}
      {productsFetch && productsFetch.length > 0 && result.length === 0 && (
        <LoadMoreBtn fetchMore={fetchMore} />
      )}
    </div>
  )
}

export default Order

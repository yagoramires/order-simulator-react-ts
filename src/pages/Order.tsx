import { useContext, useState } from 'react'

import Header from '../components/Order/Header'
import Select from '../components/Order/Select'

import { NewOrderContext } from '../context/NewOrderContext'
import Product from '../components/Order/Product'
import Label from '../components/GlobalComponents/Label'
import MessageComponent from '../components/GlobalComponents/MessageComponent'
import { IProduct } from '../interfaces'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { useFetchCollection } from '../hooks/fetchData/useFetchCollection'
import Search from '../components/GlobalComponents/Search'

const Order = () => {
  const [result, setResult] = useState([])
  const { selectedIndustry } = useContext(NewOrderContext)

  const { productsFetch, fetchMore } = useFetchCollection(
    `industries/${selectedIndustry?.id}/products`,
  )

  return (
    <div className='max-h-[100vh]'>
      <Header />
      <div className='overflow-hidden max-h-[calc(100vh - 72px)] w-full flex flex-col items-center justify-center'>
        <div className='flex flex-col w-[100vw] max-w-[1400px] bg-dark-100 overflow-auto p-1 gap-1 md:p-2 md:gap-2'>
          <Select />
        </div>

        <Search collection={`industries/${selectedIndustry?.id}/products`} setResult={setResult} />

        {!selectedIndustry.id && (
          <MessageComponent text='Selecione uma indústria para carregar os produtos.' />
        )}

        {selectedIndustry.id && productsFetch.length === 0 && (
          <MessageComponent text='Nenhum produto cadastrado.' />
        )}

        {/* {result.length === 0 && <MessageComponent text='Nenhum produto encontrado.' />} */}

        {productsFetch && productsFetch?.length > 0 && (
          <>
            <div className='flex justify-center w-full p-1 md:p-2  max-w-[1400px]'></div>
            <div className='mt-1 md:mt-2 flex flex-col w-[100vw] max-w-[1400px] max-h-[calc(100vh-368px)] md:max-h-[calc(100vh-400px)] bg-dark-100 overflow-auto p-1 gap-1 md:p-2 md:gap-2 '>
              <Label />

              {result.length === 0 &&
                productsFetch?.map((product: IProduct, index: number) => (
                  <Product product={product} key={index} />
                ))}

              {result.length > 0 &&
                result?.map((product: IProduct, index: number) => (
                  <Product product={product} key={index} />
                ))}
            </div>
          </>
        )}
        {productsFetch && productsFetch.length > 0 && (
          <div className='flex justify-center w-full gap-20 mt-2 text-gray-50'>
            <button onClick={fetchMore}>
              <MdKeyboardArrowRight size={25} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Order

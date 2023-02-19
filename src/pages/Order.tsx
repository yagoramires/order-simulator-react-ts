import { useContext, useEffect, useState } from 'react'

import Header from '../components/Order/Header'
import Select from '../components/Order/Select'

import { NewOrderContext } from '../context/NewOrderContext'
import Product from '../components/Order/Product'
import Label from '../components/GlobalComponents/Label'
import MessageComponent from '../components/GlobalComponents/MessageComponent'
import Filter from '../components/GlobalComponents/Filter'
import { IProduct } from '../interfaces'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

const Order = () => {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState<any>([])
  const [pageNumber, setPageNumber] = useState(1)

  const { selectedIndustry } = useContext(NewOrderContext)

  const codeFilter =
    search.length > 0
      ? selectedIndustry?.products?.filter((product) =>
          String(product.code).toLowerCase().includes(search.toLowerCase()),
        )
      : []

  const nameFilter =
    search.length > 0
      ? selectedIndustry?.products?.filter((product) =>
          product.name?.toLowerCase().includes(search.toLowerCase()),
        )
      : []

  useEffect(() => {
    if (selectedIndustry.products && selectedIndustry.products.length > 0) {
      setPage(selectedIndustry.products?.slice((pageNumber - 1) * 100, pageNumber * 100))
    }
  }, [selectedIndustry])

  useEffect(() => {
    setPage(selectedIndustry.products?.slice((pageNumber - 1) * 100, pageNumber * 100))
  }, [pageNumber])

  const nextPage = () => {
    setPageNumber(pageNumber + 1)
    setPage(selectedIndustry.products?.slice((pageNumber - 1) * 100, pageNumber * 100))
  }

  const prevPage = () => {
    setPageNumber(pageNumber - 1)
    setPage(selectedIndustry.products?.slice((pageNumber - 1) * 100, pageNumber * 100))
  }

  console.log(page)
  return (
    <div className='max-h-[100vh]'>
      <Header />
      <div className='overflow-hidden max-h-[calc(100vh - 72px)] w-full flex flex-col items-center justify-center'>
        <div className='flex flex-col w-[100vw] max-w-[1400px] bg-dark-100 overflow-auto p-1 gap-1 md:p-2 md:gap-2'>
          <Select />
        </div>

        {!selectedIndustry.id && (
          <MessageComponent text='Selecione uma indústria para carregar os produtos.' />
        )}
        {selectedIndustry.id && page.length === 0 && (
          <MessageComponent text='Nenhum produto cadastrado.' />
        )}

        {search &&
          nameFilter &&
          nameFilter.length === 0 &&
          codeFilter &&
          codeFilter.length === 0 && <MessageComponent text='Nenhum produto encontrado.' />}
        {selectedIndustry.products && selectedIndustry.products?.length > 0 && (
          <>
            <div className='flex justify-center w-full p-1 md:p-2  max-w-[1400px]'>
              <Filter search={search} setSearch={setSearch} />
            </div>
            <div className='mt-1 md:mt-2 flex flex-col w-[100vw] max-w-[1400px] max-h-[calc(100vh-368px)] md:max-h-[calc(100vh-400px)] bg-dark-100 overflow-auto p-1 gap-1 md:p-2 md:gap-2 '>
              <Label />

              {!search &&
                page.map((product: IProduct, index: number) => (
                  <Product product={product} key={index} />
                ))}

              {search &&
                codeFilter &&
                codeFilter.length > 0 &&
                codeFilter?.map((product, index) => <Product product={product} key={index} />)}

              {search &&
                nameFilter &&
                nameFilter.length > 0 &&
                nameFilter?.map((product, index) => <Product product={product} key={index} />)}
            </div>
          </>
        )}
        {selectedIndustry.products && selectedIndustry?.products?.length > 0 && (
          <div className='flex justify-center w-full gap-20 mt-2 text-gray-50'>
            {pageNumber > 1 && (
              <button onClick={prevPage}>
                <MdKeyboardArrowLeft size={25} />
              </button>
            )}
            {page.length === 100 && (
              <button onClick={nextPage}>
                <MdKeyboardArrowRight size={25} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Order

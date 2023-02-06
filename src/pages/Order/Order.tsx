import { useEffect, useState } from 'react'
import { useFetchCollection } from '../../hooks/fetchData/useFetchCollection'

import Header from '../../components/Order/Header'
import Product from '../../components/Order/Product'
import SelectData from '../../components/Order/Select'
import Loading from '../../components/Loading'

import { IIndustries, IProduct } from '../../interfaces/index'

const Order = () => {
  const [industry, setIndustry] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState<IIndustries>()
  const [productsArray, setProductsArray] = useState<IProduct[]>([])
  const [total, setTotal] = useState<number>(0)

  const { industries } = useFetchCollection('industries')
  const { deadlines } = useFetchCollection('deadlines')
  const { clients } = useFetchCollection('clients')
  const { products } = useFetchCollection(`industries/${selectedIndustry?.id}/products`)

  useEffect(() => {
    setProductsArray([])
  }, [industry])

  useEffect(() => {
    const initialValue = 0
    const total = productsArray.reduce((acc, cur) => {
      return cur.total ? acc + cur.total : acc
    }, initialValue)
    setTotal(total)
  }, [productsArray])

  useEffect(() => {
    const filterIndustry = industries?.filter((item) => item.id == industry)
    if (filterIndustry) setSelectedIndustry(filterIndustry[0])
  })

  if (!industries || !deadlines || !clients)
    return (
      <div className='min-h-[100vh] bg-gradient-to-r from-blue-800 to-blue-600 justify-center items-center flex'>
        <Loading size={'60px'} />
      </div>
    )

  return (
    <div className='min-h-[100vh] bg-gradient-to-r from-blue-800 to-blue-600'>
      <Header industry={industry} setIndustry={setIndustry} />

      <main>
        <form className='flex flex-col items-center justify-center'>
          <SelectData clients={clients} deadlines={deadlines} total={total} />

          {industry ? (
            <div className='p-4 bg-white w-[90%] max-w-[1200px] rounded-md flex flex-col gap-4'>
              <div className='flex items-center w-full text-center'>
                <span className='text-xs text-zinc-500 w-[100px] md:hidden'></span>
                <span className='text-xs text-zinc-500 w-[10%]'>Código</span>
                <span className='text-xs text-zinc-500 w-[60%]'>Nome</span>
                <div className='flex w-[30%] items-center gap-4  '>
                  <span className='text-xs text-zinc-500 md:hidden'>Valor Un.</span>
                  <span className='text-xs text-zinc-500 w-[80px] '>Quantidade</span>
                  <span className='text-xs text-zinc-500 w-[50px] md:hidden'>Total</span>
                </div>
              </div>
              {products?.map((product) => (
                <Product
                  product={product}
                  key={product.id}
                  productsArray={productsArray}
                  setProductsArray={setProductsArray}
                />
              ))}
              {products?.length === 0 && (
                <p className='w-full py-20 text-center '>Nenhum produto cadastrado.</p>
              )}
            </div>
          ) : (
            <div className='p-4 bg-white w-[90%] max-w-[1200px] rounded-md flex flex-col gap-4'>
              <p className='w-full py-20 text-center '>Selecione uma fábrica.</p>
            </div>
          )}

          <input
            type='submit'
            className='fixed right-[5%] bottom-0 bg-gradient-to-l text-white border-t-[1px] border-x-[1px] border-blue-900 from-blue-800 to-blue-600 py-2 px-4 rounded-t-md cursor-pointer font-bold shadow-md'
            value={'Finalizar Pedido'}
          />
        </form>
      </main>
    </div>
  )
}

export default Order

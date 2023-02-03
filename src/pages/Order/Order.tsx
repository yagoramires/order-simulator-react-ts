// Hooks
import { useEffect, useState } from 'react'
import { useFetchCollection } from '../../hooks/useFetchCollection'

// Components
import Header from '../../components/Order/Header'
import Product from '../../components/Order/Product'

interface IndustryProps {
  id: string
  socialName: string
  fantasyName: string
  cnpj: string
  products?: Array<{
    id: string
    code: string
    name: string
    industry: string
    price: number
  }>
}

const Order = () => {
  const total = 0

  const [industry, setIndustry] = useState('')

  const { industries } = useFetchCollection('industries')
  const { deadlines } = useFetchCollection('deadlines')
  const { clients } = useFetchCollection('clients')

  const [selectedIndustry, setSelectedIndustry] = useState<IndustryProps>()
  console.log(industry)

  useEffect(() => {
    const filterIndustry = industries?.filter((item) => item.id == industry)
    if (filterIndustry) setSelectedIndustry(filterIndustry[0])
  })

  return (
    <div className='min-h-[100vh] bg-gradient-to-r from-blue-800 to-blue-600'>
      <Header industry={industry} setIndustry={setIndustry} />

      <main>
        <form className='flex flex-col items-center justify-center'>
          <div className='flex md:flex-col items-end justify-center gap-4 p-4 bg-white w-[90%] rounded-md my-4'>
            <div className='flex flex-col w-full gap-1 text-start'>
              <span className='text-xs text-zinc-500'>Cliente</span>

              <select
                name='clients'
                defaultValue={'selecione'}
                className='shadow-sm p-2 bg-zinc-300 rounded-md w-full border-[1px] border-zinc-400'
              >
                <option value='selecione' disabled>
                  Selecione
                </option>
                {clients?.map((client) => (
                  <option value={client.socialName} key={client.id}>
                    {client.socialName}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex flex-col w-full gap-1 text-start'>
              <span className='text-xs text-zinc-500'>Cliente</span>
              <select
                name='prazo'
                defaultValue={'selecione'}
                className='shadow-sm p-2 bg-zinc-300 rounded-md w-full border-[1px] border-zinc-400'
              >
                <option value='selecione' disabled>
                  Selecione
                </option>
                {deadlines?.map((deadline) => (
                  <option value={deadline.value} key={deadline.id}>
                    {deadline.value}
                  </option>
                ))}
              </select>
            </div>

            <div className='flex w-full gap-2 font-bold md:flex-col md:gap-0 text-start'>
              <h2>Total do pedido:</h2>
              <span>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
          </div>

          {industry ? (
            <div className='p-4 bg-white w-[90%] rounded-md flex flex-col gap-4'>
              {selectedIndustry?.products?.map((product) => (
                <Product product={product} key={product.id} />
              ))}
              {!selectedIndustry?.products && (
                <p className='w-full py-20 text-center '>Nenhum produto cadastrado.</p>
              )}
            </div>
          ) : (
            <div className='p-4 bg-white w-[90%] rounded-md flex flex-col gap-4'>
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

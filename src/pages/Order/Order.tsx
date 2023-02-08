import { useEffect, useState } from 'react'
import { useFetchCollection } from '../../hooks/fetchData/useFetchCollection'

import Header from '../../components/Order/Header'
import Product from '../../components/Order/Product'
import SelectData from '../../components/Order/Select'
import Loading from '../../components/Loading'

import { IIndustries, IProduct } from '../../interfaces/index'
import { toast } from 'react-toastify'
import { useCreateOrder } from '../../hooks/handleData/useAddOrder'
import { useNavigate } from 'react-router-dom'

interface UserProps {
  uid: string
  displayName: string
}

const Order = ({ uid, displayName }: UserProps) => {
  const [industry, setIndustry] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState<IIndustries>()
  const [selectedClient, setSelectedClient] = useState<{
    id: string
    socialName: string
    cnpj: string
  }>({
    id: '',
    socialName: 'Selecione um cliente',
    cnpj: '',
  })
  const [selectedDeadline, setSelectedDeadline] = useState('Selecione um prazo de pagamento')
  const [productsArray, setProductsArray] = useState<IProduct[]>([])
  const [total, setTotal] = useState<number>(0)

  const { industries } = useFetchCollection('industries')
  const { products } = useFetchCollection(`industries/${selectedIndustry?.id}/products`)
  const { orders } = useFetchCollection('orders')
  const { addOrder, loading } = useCreateOrder()

  const [search, setSearch] = useState('')

  const filteredProductsCode =
    search.length > 0
      ? products.filter((product) => product.code?.toLowerCase().includes(search.toLowerCase()))
      : []
  const filteredProductsName =
    search.length > 0
      ? products.filter((product) => product.name?.toLowerCase().includes(search.toLowerCase()))
      : []

  const navigate = useNavigate()

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

  if (!industries)
    return (
      <div className='min-h-[100vh] bg-gradient-to-r from-blue-800 to-blue-600 justify-center items-center flex'>
        <Loading size={'60px'} />
      </div>
    )

  const handleCreateNewOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!selectedIndustry?.socialName) return toast.error('Selecione uma indústria!')
    if (selectedClient.id === '') return toast.error('Selecione um cliente!')
    if (selectedDeadline === 'Selecione um prazo de pagamento')
      return toast.error('Selecione um prazo de pagamento!')
    if (productsArray.length === 0) return toast.error('Selecione pelo menos um produto!')
    if (!total || total === 0) return toast.error('Ocorreu um erro, tente novamente!')

    addOrder({
      clientId: selectedClient.id,
      clientName: selectedClient.socialName,
      clientCnpj: selectedClient.cnpj,
      industryId: selectedIndustry.id,
      industryName: selectedIndustry.fantasyName,
      sellerId: uid,
      sellerName: displayName,
      products: productsArray,
      deadline: selectedDeadline,
      total,
      orderId: orders.length + 1,
    })

    navigate('/orders')
  }

  return (
    <div className='min-h-[100vh] bg-gradient-to-r from-blue-800 to-blue-600'>
      <Header industry={industry} setIndustry={setIndustry} />

      <main>
        {loading ? (
          <Loading size={'50px'} />
        ) : (
          <form
            className='flex flex-col items-center justify-center'
            onSubmit={handleCreateNewOrder}
          >
            <SelectData
              total={total}
              selectedClient={selectedClient}
              setSelectedClient={setSelectedClient}
              selectedDeadline={selectedDeadline}
              setSelectedDeadline={setSelectedDeadline}
            />

            {industry ? (
              <div className='p-4 bg-white w-[90%] max-w-[1200px] rounded-md flex flex-col gap-4'>
                <div className='flex justify-center w-full'>
                  <input
                    type='text'
                    className='p-2 rounded-md shadow-sm bg-zinc-300 w-[300px]'
                    placeholder='Pesquisar'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

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
                {search && filteredProductsCode.length > 0
                  ? filteredProductsCode?.map((product) => (
                      <Product
                        product={product}
                        key={product.id}
                        productsArray={productsArray}
                        setProductsArray={setProductsArray}
                      />
                    ))
                  : search && filteredProductsName.length > 0
                  ? filteredProductsName?.map((product) => (
                      <Product
                        product={product}
                        key={product.id}
                        productsArray={productsArray}
                        setProductsArray={setProductsArray}
                      />
                    ))
                  : !search &&
                    products?.map((product) => (
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
        )}
      </main>
    </div>
  )
}

export default Order

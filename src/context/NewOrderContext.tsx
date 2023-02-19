import { createContext, useState, SetStateAction, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useFetchCollection } from '../hooks/fetchData/useFetchCollection'
import { useCreateOrder } from '../hooks/handleData/useAddOrder'

import { IClients, IDeadlines, IIndustries, IProduct } from '../interfaces'
import { AuthContext } from './AuthContext'

type NewOrderProps = {
  children: React.ReactNode
}

type OrderContextType = {
  selectedIndustry: IIndustries
  selectedClient: IClients
  selectedDeadline: IDeadlines
  total: number
  // products: IProduct[]
  productsArray: IProduct[]
  setSelectedIndustry: React.Dispatch<SetStateAction<IIndustries>>
  setSelectedClient: React.Dispatch<SetStateAction<IClients>>
  setSelectedDeadline: React.Dispatch<SetStateAction<IDeadlines>>
  setTotal: React.Dispatch<SetStateAction<number>>
  createNewOrder: () => void
  setProductsArray: React.Dispatch<SetStateAction<IProduct[]>>
}

const initialValue = {
  selectedIndustry: {
    id: '',
    fantasyName: 'Indústria',
    cnpj: '',
  },
  selectedClient: {
    id: '',
    socialName: 'Cliente',
    cnpj: '',
  },
  selectedDeadline: {
    id: '',
    value: 'Prazo',
  },
  total: 0,
  // products: [],
  productsArray: [],
  setSelectedIndustry: () => {
    ;('')
  },
  setSelectedClient: () => {
    ;('')
  },
  setSelectedDeadline: () => {
    ;('')
  },
  setTotal: () => {
    ;('')
  },
  createNewOrder: () => {
    ;('')
  },
  setProductsArray: () => {
    ;('')
  },
}

export const NewOrderContext = createContext<OrderContextType>(initialValue)

export const NewOrderProvider = ({ children }: NewOrderProps) => {
  const [selectedIndustry, setSelectedIndustry] = useState<IIndustries>(
    initialValue.selectedIndustry,
  )
  const [selectedClient, setSelectedClient] = useState<IClients>(initialValue.selectedClient)
  const [selectedDeadline, setSelectedDeadline] = useState<IDeadlines>(
    initialValue.selectedDeadline,
  )
  const [total, setTotal] = useState<number>(initialValue.total)
  const [productsArray, setProductsArray] = useState<IProduct[]>(initialValue.productsArray)

  const navigate = useNavigate()

  const { userData } = useContext(AuthContext)
  const { addOrder } = useCreateOrder()
  // const { orders } = useFetchCollection('orders')
  // const { products } = useFetchCollection(
  //   selectedIndustry.id ? `industries/${selectedIndustry.id}/products` : '',
  // )

  useEffect(() => {
    setProductsArray([])
    setTotal(0)
  }, [selectedIndustry])

  useEffect(() => {
    setTotal(0)
  }, [selectedClient])

  useEffect(() => {
    const initialValue = 0
    const total = productsArray.reduce((acc, cur) => {
      return cur.total ? acc + cur.total : acc
    }, initialValue)
    setTotal(total)
  }, [productsArray])

  const createNewOrder = () => {
    if (!selectedIndustry?.fantasyName) return toast.error('Selecione uma indústria!')
    if (selectedClient.id === '') return toast.error('Selecione um cliente!')
    if (selectedDeadline.value === 'Selecione um prazo de pagamento')
      return toast.error('Selecione um prazo de pagamento!')
    if (productsArray.length === 0) return toast.error('Selecione pelo menos um produto!')
    if (!total || total === 0) return toast.error('Ocorreu um erro, tente novamente!')

    let orderId
    // if (orders.length > 0) {
    //   const lastOrder = orders[orders.length - 1]
    //   orderId = lastOrder.orderId ? +lastOrder.orderId + 1 : 1
    // } else {
    //   orderId = 1
    // }

    const data = {
      clientId: selectedClient.id,
      clientName: selectedClient.socialName,
      clientCnpj: selectedClient.cnpj,
      industryId: selectedIndustry.id,
      industryName: selectedIndustry.fantasyName,
      sellerId: userData.uid,
      sellerName: userData.displayName,
      products: productsArray,
      deadline: selectedDeadline.value,
      total,
      orderId: `${orderId}`,
    }

    addOrder(data)

    setProductsArray([])
    setSelectedIndustry(initialValue.selectedIndustry)
    setSelectedClient(initialValue.selectedClient)
    setSelectedDeadline(initialValue.selectedDeadline)
    setTotal(initialValue.total)

    navigate('/orders')
  }

  return (
    <NewOrderContext.Provider
      value={{
        createNewOrder,
        selectedIndustry,
        selectedClient,
        selectedDeadline,
        total,
        setSelectedIndustry,
        setSelectedClient,
        setSelectedDeadline,
        setTotal,
        // products,
        productsArray,
        setProductsArray,
      }}
    >
      {children}
    </NewOrderContext.Provider>
  )
}

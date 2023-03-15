import { createContext, useState, SetStateAction, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useFetchCollection } from '../hooks/fetchData/useFetchCollection'
import { useCreateOrder } from '../hooks/handleData/useAddOrder'

import { IClients, IIndustries, IProduct } from '../interfaces'
import { AuthContext } from './AuthContext'

type NewOrderProps = {
  children: React.ReactNode
}

type OrderContextType = {
  selectedIndustry: IIndustries
  selectedClient: IClients
  total: number
  productsArray: IProduct[]
  setSelectedIndustry: React.Dispatch<SetStateAction<IIndustries>>
  setSelectedClient: React.Dispatch<SetStateAction<IClients>>
  setTotal: React.Dispatch<SetStateAction<number>>
  createNewOrder: (client: IClients, industry: IIndustries) => void
  setProductsArray: React.Dispatch<SetStateAction<IProduct[]>>
}

const initialValue = {
  selectedIndustry: {
    id: '',
    fantasyName: 'Indústria',
    cnpj: '',
    products: [],
  },
  selectedClient: {
    id: '',
    socialName: 'Cliente',
    cnpj: '',
  },
  total: 0,
  productsArray: [],
  setSelectedIndustry: () => {
    ;('')
  },
  setSelectedClient: () => {
    ;('')
  },

  setTotal: () => {
    ;('')
  },
  createNewOrder: (client: IClients, industry: IIndustries) => {
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
  const [total, setTotal] = useState<number>(initialValue.total)
  const [productsArray, setProductsArray] = useState<IProduct[]>(initialValue.productsArray)

  const navigate = useNavigate()

  const { userData } = useContext(AuthContext)
  const { addOrder } = useCreateOrder()
  const { ordersFetch } = useFetchCollection('orders')

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

  const createNewOrder = (client: IClients, industry: IIndustries) => {
    if (!industry) return toast.error('Selecione uma indústria!')
    if (!client) return toast.error('Selecione um cliente!')
    if (productsArray.length === 0) return toast.error('Selecione pelo menos um produto!')
    if (!total || total === 0) return toast.error('Ocorreu um erro, tente novamente!')

    let orderId
    if (ordersFetch.length > 0) {
      const lastOrder = ordersFetch[0]
      orderId = Number(lastOrder?.orderId) + 1
    } else {
      orderId = 1
    }

    const data = {
      clientId: client.id,
      clientName: client.socialName,
      clientCnpj: client.cnpj,
      industryId: industry.id,
      industryName: industry.fantasyName,
      products: productsArray,
      deadline: client.deadline,
      total,
      orderId: `${orderId}`,
    }

    addOrder(data, client)

    setProductsArray([])
    setSelectedIndustry(initialValue.selectedIndustry)
    setSelectedClient(initialValue.selectedClient)
    setTotal(initialValue.total)
  }

  return (
    <NewOrderContext.Provider
      value={{
        createNewOrder,
        selectedIndustry,
        selectedClient,
        total,
        setSelectedIndustry,
        setSelectedClient,
        setTotal,
        productsArray,
        setProductsArray,
      }}
    >
      {children}
    </NewOrderContext.Provider>
  )
}

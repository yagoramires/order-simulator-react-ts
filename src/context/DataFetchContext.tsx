import { createContext, useEffect, useState } from 'react'
import { useFetchCollection } from '../hooks/fetchData/useFetchCollection'

import * as interfaces from '../interfaces/index'

type DataContextProps = {
  children: React.ReactNode
}

type DataContextType = {
  orders: interfaces.IOrder[] | []
  industries: interfaces.IIndustries[] | []
  clients: interfaces.IClients[] | []
  deadlines: interfaces.IDeadlines[] | []
  // products: interfaces.IProduct[] | []
  networks: interfaces.INetworks[] | []
  // setOrders: React.Dispatch<React.SetStateAction<interfaces.IOrder[] | []>>
  // setClientOrders: React.Dispatch<React.SetStateAction<interfaces.IOrder[] | []>>
  // setIndustries: React.Dispatch<React.SetStateAction<interfaces.IIndustries[] | []>>
  // setClients: React.Dispatch<React.SetStateAction<interfaces.IClients[] | []>>
  // setDeadlines: React.Dispatch<React.SetStateAction<interfaces.IDeadlines[] | []>>
  // setProducts: React.Dispatch<React.SetStateAction<interfaces.IProduct[] | []>>
  // setNetworks: React.Dispatch<React.SetStateAction<interfaces.INetworks[] | []>>
}

const initialValue = {
  orders: [],
  clientOrders: [],
  industries: [],
  clients: [],
  deadlines: [],
  // products: [],
  networks: [],
  // setOrders: () => [],
  // setClientOrders: () => [],
  // setIndustries: () => [],
  // setClients: () => [],
  // setDeadlines: () => [],
  // setProducts: () => [],
  // setNetworks: () => [],
}

export const DataFetchContext = createContext<DataContextType>(initialValue)

export const DataFetchContextProvider = ({ children }: DataContextProps) => {
  const [orders, setOrders] = useState<interfaces.IOrder[] | []>(initialValue.orders)

  const [industries, setIndustries] = useState<interfaces.IIndustries[] | []>(
    initialValue.industries,
  )
  const [clients, setClients] = useState<interfaces.IClients[] | []>(initialValue.clients)
  const [deadlines, setDeadlines] = useState<interfaces.IDeadlines[] | []>(initialValue.deadlines)
  const [networks, setNetworks] = useState<interfaces.INetworks[] | []>(initialValue.networks)

  const { industriesFetch } = useFetchCollection('industries')
  const { clientsFetch } = useFetchCollection('clients')
  const { deadlinesFetch } = useFetchCollection('deadlines')
  const { ordersFetch } = useFetchCollection('orders')
  const { networksFetch } = useFetchCollection('networks')

  // useEffect(() => {
  //   setIndustries(industriesFetch)
  //   setClients(clientsFetch)
  //   setDeadlines(deadlinesFetch)
  //   setOrders(ordersFetch)
  //   setNetworks(networksFetch)
  // }, [])

  return (
    <DataFetchContext.Provider
      value={{
        orders,
        industries,
        clients,
        deadlines,
        networks,
      }}
    >
      {children}
    </DataFetchContext.Provider>
  )
}

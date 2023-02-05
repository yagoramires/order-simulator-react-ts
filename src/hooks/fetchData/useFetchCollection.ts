import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { database } from '../../firebase/config'

interface OrderProps {
  id: string
  createdAt: {
    nanoseconds: number
    seconds: number
  }
  clientId: string
  clientName: string
  industryId: string
  industryName: string
  sellerId: string
  sellerName: string
  products: Array<ProductProps>
}
interface IndustryProps {
  id: string
  socialName: string
  fantasyName: string
  cnpj: string
  products?: Array<ProductProps>
}

interface ClientProps {
  id: string
  socialName: string
  fantasyName: string
  cnpj: string
  discount: number
  network?: string
  orders?: Array<OrderProps>
}

interface DeadlineProps {
  id: string
  value: string
}

interface ProductProps {
  id?: string
  imagePath?: string
  code: string
  name: string
  industry?: string
  price: number
  quantity?: number
  family?: string
  createdAt?: Date
}

export const useFetchCollection = (docCollection: string) => {
  const [orders, setOrders] = useState<OrderProps[]>()
  const [clientOrders, setClientOrders] = useState<OrderProps[]>()
  const [industries, setIndustries] = useState<IndustryProps[]>()
  const [clients, setClients] = useState<ClientProps[]>()
  const [deadlines, setDeadlines] = useState<DeadlineProps[]>()
  const [products, setProducts] = useState<ProductProps[]>()

  useEffect(() => {
    const fetchData = () => {
      const collectionRef = collection(database, docCollection)
      try {
        const q = query(collectionRef, orderBy('createdAt', 'asc'))

        onSnapshot(q, (querySnapshot: any) => {
          const snapshot = querySnapshot.docs.map((doc: any) => ({
            id: doc.id,
            ...doc.data(),
          }))
          if (docCollection === 'industries') {
            setIndustries(snapshot)
          } else if (docCollection === 'orders') {
            setOrders(snapshot)
          } else if (docCollection === 'clients') {
            setClients(snapshot)
          } else if (docCollection === 'deadlines') {
            setDeadlines(snapshot)
          } else if (docCollection.includes('products')) {
            setProducts(snapshot)
          } else if (docCollection.includes('clients') && docCollection.includes('orders')) {
            setClientOrders(snapshot)
          }
        })
      } catch (e: any) {
        console.log(e.message)
      }
    }
    fetchData()
  }, [docCollection])

  return { industries, clients, deadlines, orders, products, clientOrders }
}

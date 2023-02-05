import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { database } from '../../firebase/config'

import * as interfaces from '../../interfaces/index'

export const useFetchCollection = (docCollection: string) => {
  const [orders, setOrders] = useState<interfaces.IOrder[]>()
  const [clientOrders, setClientOrders] = useState<interfaces.IOrder[]>()
  const [industries, setIndustries] = useState<interfaces.IIndustries[]>()
  const [clients, setClients] = useState<interfaces.IClients[]>()
  const [deadlines, setDeadlines] = useState<interfaces.IDeadlines[]>()
  const [products, setProducts] = useState<interfaces.IProduct[]>()

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

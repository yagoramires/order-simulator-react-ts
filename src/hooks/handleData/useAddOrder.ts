import { useState } from 'react'

import { addDoc, collection, doc, setDoc, Timestamp, updateDoc } from 'firebase/firestore'
import { database } from '../../firebase/config'

import { toast } from 'react-toastify'

import { IClients, IOrder } from '../../interfaces/index'

export const useCreateOrder = () => {
  const [loading, setLoading] = useState(false)

  const addOrder = async (orderData: IOrder, clientData: IClients) => {
    setLoading(true)
    try {
      const ordersRef = collection(database, 'orders')
      const data = { ...orderData, createdAt: Timestamp.now() }
      const { id } = await addDoc(ordersRef, data)

      const ref = doc(database, 'clients', clientData.id || '')

      if (clientData.orders) {
        const ordersArray = clientData.orders
        const data = { ...orderData, createdAt: Timestamp.now(), id }
        ordersArray.push(data)
        await updateDoc(ref, { ...clientData, orders: ordersArray })
      } else {
        const ordersArray = []
        const data = { ...orderData, createdAt: Timestamp.now(), id }
        ordersArray.push(data)
        await updateDoc(ref, { ...clientData, orders: ordersArray })
      }

      toast.success('Pedido adicionado com sucesso!')
      setLoading(false)
    } catch (e: any) {
      toast.error(e.message)
      setLoading(false)
    }
  }
  return { addOrder, loading }
}

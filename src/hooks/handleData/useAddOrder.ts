import { useState } from 'react'

import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { database } from '../../firebase/config'

import { toast } from 'react-toastify'

import { IOrder } from '../../interfaces/index'

export const useCreateOrder = () => {
  const [loading, setLoading] = useState(false)

  const addOrder = async (orderData: IOrder) => {
    setLoading(true)
    try {
      const ordersRef = collection(database, 'orders')
      const clientRef = collection(database, `clients/${orderData.clientId}/orders`)
      const data = { ...orderData, createdAt: Timestamp.now() }
      await addDoc(ordersRef, data)
      await addDoc(clientRef, data)

      toast.success('Pedido adicionado com sucesso!')
      setLoading(false)
    } catch (e: any) {
      toast.error(e.message)
      setLoading(false)
    }
  }
  return { addOrder, loading }
}

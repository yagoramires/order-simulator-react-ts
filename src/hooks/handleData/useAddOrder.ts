import { useState } from 'react'

import { addDoc, collection, doc, setDoc, Timestamp } from 'firebase/firestore'
import { database } from '../../firebase/config'

import { toast } from 'react-toastify'

import { IOrder } from '../../interfaces/index'

export const useCreateOrder = () => {
  const [loading, setLoading] = useState(false)

  const addOrder = async (orderData: IOrder) => {
    setLoading(true)
    try {
      const ordersRef = collection(database, 'orders')
      const data = { ...orderData, createdAt: Timestamp.now() }
      const { id } = await addDoc(ordersRef, data)

      await setDoc(doc(database, `clients/${orderData.clientId}/orders`, id), data)

      toast.success('Pedido adicionado com sucesso!')
      setLoading(false)
    } catch (e: any) {
      toast.error(e.message)
      setLoading(false)
    }
  }
  return { addOrder, loading }
}

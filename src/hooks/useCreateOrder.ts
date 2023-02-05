import { useState } from 'react'

import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { database } from '../firebase/config'

import { toast } from 'react-toastify'

import { IOrder } from '../interfaces/index'

export const useCreateOrder = () => {
  const [loading, setLoading] = useState(false)

  const addOrder = async (orderData: IOrder) => {
    setLoading(true)
    try {
      const ref = collection(database, 'orders')
      const data = { ...orderData, createdAt: Timestamp.now() }
      await addDoc(ref, data)

      toast.success('Pedido adicionadao com sucesso!')
      setLoading(false)
    } catch (e: any) {
      toast.error(e.message)
      setLoading(false)
    }
  }
  return { addOrder, loading }
}

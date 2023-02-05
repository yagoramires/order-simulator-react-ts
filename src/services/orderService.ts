import { useState } from 'react'

import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { database } from '../firebase/config'

import { toast } from 'react-toastify'

interface ProductProps {
  id: string
  code: string
  name: string
  industry: string
  price: number
  quantity: number
  imagePath?: string
  family?: string
  createdAt?: Date
}
interface OrderProps {
  clientId: string
  clientName: string
  industryId: string
  industryName: string
  sellerId: string
  sellerName: string
  products: Array<ProductProps>
}

const [loading, setLoading] = useState(false)

const addOrder = async (orderData: OrderProps) => {
  setLoading(true)
  try {
    const ref = collection(database, 'orders')
    const data = { ...orderData, createdAt: Timestamp.now() }
    await addDoc(ref, data)

    toast.success('Pedido adicionado com sucesso!')
    setLoading(false)
  } catch (e: any) {
    toast.error(e.message)
    setLoading(false)
  }
}

const orderService = { addOrder, loading }

export default orderService

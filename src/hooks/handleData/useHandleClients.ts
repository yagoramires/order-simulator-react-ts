import { useState } from 'react'

import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { database } from '../../firebase/config'

import { toast } from 'react-toastify'

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
interface OrderProps {
  id: string
  createdAt: Date
  clientId: string
  clientName: string
  industryId: string
  industryName: string
  sellerId: string
  sellerName: string
  products: Array<ProductProps>
}
interface ClientProps {
  id?: string
  socialName: string
  fantasyName: string
  cnpj: string
  discount: number
  network?: string
  orders?: Array<OrderProps>
}

export const useHandleClients = () => {
  const [loading, setLoading] = useState(false)

  const addClient = async (clientData: ClientProps) => {
    setLoading(true)
    try {
      const ref = collection(database, 'clients')
      const data = { ...clientData, createdAt: Timestamp.now() }
      await addDoc(ref, data)

      toast.success('Cliente adicionadao com sucesso!')
      setLoading(false)
    } catch (e: any) {
      toast.error(e.message)
      setLoading(false)
    }
  }

  const updateClient = () => {
    console.log('teste')
  }

  return { addClient, updateClient, loading }
}

import { useState } from 'react'

import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { database } from '../../firebase/config'

import { toast } from 'react-toastify'

interface ProductProps {
  id?: string
  code: string
  name: string
  industry?: string
  price: number
  family?: string
  createdAt?: Date
}

export const useHandleProducts = () => {
  const [loading, setLoading] = useState(false)

  const addProduct = async (productData: ProductProps) => {
    setLoading(true)
    try {
      const ref = collection(database, `industries/${productData.industry}/products`)
      const data = { ...productData, createdAt: Timestamp.now() }
      await addDoc(ref, data)

      toast.success('Produto adicionado com sucesso!')
      setLoading(false)
    } catch (e: any) {
      toast.error(e.message)
      setLoading(false)
    }
  }

  const updateProduct = () => {
    console.log('teste')
  }

  return { addProduct, updateProduct, loading }
}

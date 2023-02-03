import { useState } from 'react'

import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { database } from '../firebase/config'

import { toast } from 'react-toastify'

interface ClientProps {
  id?: string
  fantasyName: string
  socialName: string
  cnpj: string
  network?: string
  disccount?: number
  orders?: any
  createdAt?: Date
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

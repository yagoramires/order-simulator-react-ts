import { useState } from 'react'

import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { database } from '../../firebase/config'

import { toast } from 'react-toastify'

import { IAddClient } from '../../interfaces/index'

export const useHandleClients = () => {
  const [loading, setLoading] = useState(false)

  const addClient = async (clientData: IAddClient) => {
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

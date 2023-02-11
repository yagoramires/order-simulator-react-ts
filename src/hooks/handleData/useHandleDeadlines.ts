import { useState } from 'react'

import { addDoc, collection, deleteDoc, doc, Timestamp } from 'firebase/firestore'
import { database } from '../../firebase/config'

import { toast } from 'react-toastify'

import { IAddDeadline } from '../../interfaces/index'

export const useHandleDeadlines = () => {
  const [loading, setLoading] = useState(false)

  const addDeadline = async (deadlineData: IAddDeadline) => {
    setLoading(true)
    try {
      const ref = collection(database, 'deadlines')
      const data = { ...deadlineData, createdAt: Timestamp.now() }
      await addDoc(ref, data)

      toast.success('Prazo de pagamento adicionado com sucesso!')
      setLoading(false)
    } catch (e: any) {
      toast.error(e.message)
      setLoading(false)
    }
  }

  const deleteDeadline = async (collection: string, id: string) => {
    setLoading(true)
    try {
      const ref = doc(database, collection, id)
      await deleteDoc(ref)

      toast.success('Prazo de pagamento removido com sucesso!')
      setLoading(false)
    } catch (e: any) {
      toast.error(e.message)
      setLoading(false)
    }
  }

  return { addDeadline, deleteDeadline, loading }
}

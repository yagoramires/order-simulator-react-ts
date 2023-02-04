import { useState } from 'react'

import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { database } from '../../firebase/config'

import { toast } from 'react-toastify'

interface DeadlineProps {
  id?: string
  value: string
}

export const useHandleDeadlines = () => {
  const [loading, setLoading] = useState(false)

  const addDeadline = async (deadlineData: DeadlineProps) => {
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

  const updateDeadline = () => {
    console.log('teste')
  }

  return { addDeadline, updateDeadline, loading }
}

import { useState } from 'react'

import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { database } from '../../firebase/config'

import { toast } from 'react-toastify'

interface industryProps {
  id?: string
  fantasyName: string
  socialName: string
  cnpj: string
  products?: any
  createdAt?: Date
}

export const useHandleIndustries = () => {
  const [loading, setLoading] = useState(false)

  const addIndustry = async (industryData: industryProps) => {
    setLoading(true)
    try {
      const ref = collection(database, 'industries')
      const data = { ...industryData, createdAt: Timestamp.now() }
      await addDoc(ref, data)

      toast.success('Indústria adicionada com sucesso!')
      setLoading(false)
    } catch (e: any) {
      toast.error(e.message)
      setLoading(false)
    }
  }

  const updateIndustry = () => {
    console.log('teste')
  }

  return { addIndustry, updateIndustry, loading }
}

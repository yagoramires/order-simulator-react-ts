import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { database } from '../firebase/config'

interface dataProps {
  id?: number
  name?: string
  socialName?: string
  cnpj?: string
  products?: Array<{
    id: number
    name: string
    code: string
    value: number
  }>
  discount?: number
  deadline?: string
  client?: string
  industry?: string
  total?: string
}

export const useFetchCollection = (docCollection: string) => {
  const [documents, setDocuments] = useState<dataProps[]>()

  useEffect(() => {
    const fetchData = () => {
      const collectionRef = collection(database, docCollection)
      try {
        const q = query(collectionRef, orderBy('createdAt', 'asc'))

        onSnapshot(q, (querySnapshot: any) => {
          setDocuments(
            querySnapshot.docs.map((doc: any) => ({
              id: doc.id,
              ...doc.data(),
            })),
          )
        })
      } catch (e: any) {
        console.log(e.message)
      }
    }
    fetchData()
  }, [docCollection])

  return { documents }
}

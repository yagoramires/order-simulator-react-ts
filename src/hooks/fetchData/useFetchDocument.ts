import { useState, useEffect } from 'react'
import { database } from '../../firebase/config'
import { doc, getDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'

export const useFetchDocument = (docCollection: string, id: string | undefined) => {
  const [document, setDocument] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!id) return
    const loadDocument = async () => {
      setLoading(true)

      try {
        const docRef = doc(database, docCollection, id)
        const docSnap = await getDoc(docRef)

        setDocument(docSnap.data())
        setLoading(false)
      } catch (error: any) {
        console.log(error)
        toast.error(error.message)
        setLoading(false)
      }
    }

    loadDocument()
  }, [docCollection, id])

  return { document, loading }
}

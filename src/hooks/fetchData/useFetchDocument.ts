import { useState, useEffect } from 'react'
import { database } from '../../firebase/config'
import { doc, DocumentData, getDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'

export const useFetchDocument = (docCollection: string, id: string | undefined) => {
  const [document, setDocument] = useState<DocumentData>()
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
      } catch (e: any) {
        toast.error(e.message)
        setLoading(false)
      }
    }

    loadDocument()
  }, [docCollection, id])

  return { document, loading }
}

import { useState } from 'react'

import { deleteDoc, doc } from 'firebase/firestore'
import { database } from '../../firebase/config'

import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const useDeleteDoc = () => {
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const deleteDocument = async (collection: string, id: string) => {
    setLoading(true)
    try {
      const ref = doc(database, collection, id)
      await deleteDoc(ref)

      console.log(collection)

      if (collection.includes('orders')) {
        toast.success('Pedido removido com sucesso!')
        navigate(-1)
      } else if (collection.includes('products')) {
        toast.success('Produto removido com sucesso!')
        navigate(-1)
      } else if (collection.includes('clients')) {
        toast.success('Cliente removido  com sucesso!')
        navigate(-1)
      } else if (collection.includes('industries')) {
        toast.success('Indústria removida com sucesso!')
        navigate(-1)
      } else if (collection.includes('deadline')) {
        toast.success('Prazo de pagamento removido com sucesso!')
      }
      setLoading(false)
    } catch (e: any) {
      toast.error(e.message)
      setLoading(false)
    }
  }

  return { deleteDocument, loading }
}

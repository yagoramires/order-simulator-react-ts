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

      if (collection.includes('order/')) {
        toast.success('Pedido removido com sucesso!')
      } else if (collection.includes('products')) {
        toast.success('Produto removido com sucesso!')
      } else if (collection.includes('client')) {
        toast.success('Cliente removido  com sucesso!')
      } else if (collection.includes('industries')) {
        toast.success('Indústria removida com sucesso!')
      } else if (collection.includes('deadline')) {
        toast.success('Prazo de pagamento removido com sucesso!')
      }
      navigate(-1)
      setLoading(false)
    } catch (e: any) {
      toast.error(e.message)
      setLoading(false)
    }
  }

  return { deleteDocument, loading }
}

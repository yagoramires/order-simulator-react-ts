import { useState } from 'react'

import { database, storage } from '../../firebase/config'

import { updateDoc, doc } from 'firebase/firestore'
import { toast } from 'react-toastify'

// import { IIndustries, IClients, IDeadlines, IProduct } from '../../interfaces/index'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

export const useEditDoc = () => {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const editIndustry = async (id: string, data: any) => {
    setLoading(true)
    try {
      const ref = doc(database, 'industries', id)
      await updateDoc(ref, data)
      setLoading(false)
      toast.success('Indústria alterada com sucesso!')
      window.location.reload()
    } catch (e: any) {
      toast.error('Erro ao editar a indústria, tente novamente!')
      setLoading(false)
    }
  }

  const editClient = async (id: string, data: any) => {
    setLoading(true)
    try {
      const ref = doc(database, 'clients', id)
      await updateDoc(ref, data)
      toast.success('Cliente alterado com sucesso!')
      setLoading(false)
    } catch (e: any) {
      toast.error('Erro ao editar o cliente, tente novamente!')
      setLoading(false)
    }
  }

  const editDeadline = async (id: string, data: any) => {
    setLoading(true)
    try {
      const ref = doc(database, 'deadlines', id)
      await updateDoc(ref, data)
      toast.success('Cliente alterado com sucesso!')
      setLoading(false)
    } catch (e: any) {
      toast.error('Erro ao editar o cliente, tente novamente!')
      setLoading(false)
    }
  }

  const editProduct = async (industryId: string, productId: string, data: any, img?: File) => {
    setLoading(true)

    if (img) {
      try {
        const generateName = `industries/${data.industry}/${Date.now()}`
        const storageRef = ref(storage, generateName)
        const uploadTask = uploadBytesResumable(storageRef, img)
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setProgress(uploadProgress)
          },
          (error) => {
            alert(error.message)
          },
          async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref)
            const ref = doc(database, `industries/${industryId}/products`, productId)

            const docData = {
              imagePath: url,
              ...data,
            }

            await updateDoc(ref, docData)
            setLoading(false)
            toast.success('Produto alterado com sucesso!')
          },
        )
      } catch (e: any) {
        console.log(e.message)
        toast.error('Erro ao editar o produto, tente novamente!')
        setLoading(false)
      }
    } else {
      try {
        const ref = doc(database, `industries/${industryId}/products`, productId)
        await updateDoc(ref, data)
        toast.success('Produto alterado com sucesso!')
        setLoading(false)
      } catch (e: any) {
        toast.error('Erro ao editar o produto, tente novamente!')
        setLoading(false)
      }
    }
  }

  return { editIndustry, editClient, editDeadline, editProduct, progress, loading }
}

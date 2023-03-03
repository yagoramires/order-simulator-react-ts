import { useState } from 'react'

import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { database, storage } from '../../firebase/config'

import { toast } from 'react-toastify'

import { IAddClient, IAddIndustry, IAddProduct, IAddNetwork } from '../../interfaces/index'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

export const useAddDoc = () => {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const addIndustry = async (industryData: IAddIndustry) => {
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

  const addProduct = async (productData: IAddProduct, img?: File) => {
    setLoading(true)

    try {
      if (img) {
        const generateName = `industries/${productData.industryId}/${Date.now()}`
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
            const docRef = collection(database, `industries/${productData.industryId}/products`)

            const docData = {
              imagePath: url,
              createdAt: Timestamp.now(),
              ...productData,
            }

            await addDoc(docRef, docData)
            setLoading(false)
            toast.success('Produto adicionado com sucesso!')
          },
        )
      } else {
        const docRef = collection(database, `industries/${productData.industryId}/products`)

        const docData = {
          createdAt: Timestamp.now(),
          ...productData,
        }

        await addDoc(docRef, docData)
        setLoading(false)
        toast.success('Produto adicionado com sucesso!')
      }
    } catch (e: any) {
      toast.error(e.message)
      setLoading(false)
    }
  }

  const addNetwork = async (networkData: IAddNetwork) => {
    setLoading(true)
    try {
      const ref = collection(database, 'networks')
      const data = { ...networkData, createdAt: Timestamp.now() }
      await addDoc(ref, data)

      toast.success('Rede adicionada com sucesso!')
      setLoading(false)
    } catch (e: any) {
      toast.error(e.message)
      setLoading(false)
    }
  }

  return {
    addClient,
    addIndustry,
    addProduct,
    addNetwork,
    progress,
    loading,
  }
}
